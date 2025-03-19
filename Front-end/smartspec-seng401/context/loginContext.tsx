"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/utils/supabaseClient";
import { AuthError, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface LoginContextInterface {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
  signup: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
}

const LoginContextDefaultValues: LoginContextInterface = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  loginWithGoogle: async () => {},
  loginWithGithub: async () => {},
  logout: async () => {},
  signup: async () => ({ success: false }),
};

const LoginContext = createContext<LoginContextInterface>(
  LoginContextDefaultValues
);

export function useLoginContext() {
  return useContext(LoginContext);
}

interface Props {
  children: ReactNode;
}

export function LoginProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // DEBUG: Check how many times LoginProvider is mounted?
    console.log("LoginProvider Mounted");

    // Set up auth state listener first to avoid missing events
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);

        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          setUser(session?.user || null);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }

        setIsLoading(false);
      }
    );

    // Then check the initial session
    const checkSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;

        // Use session.user instead of just user
        setUser(session?.user || null);
        console.log("Initial session check:", session?.user?.id || "No user");
      } catch (error) {
        console.error("Error checking session:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Clean up listener
    return () => {
      console.log("Cleaning up auth listener");
      authListener?.subscription.unsubscribe();
    };
  }, []);

  async function login(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.log("Login error: ", error);
      if (error instanceof AuthError) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  async function loginWithGoogle() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error;
    } catch (error) {
      console.log("Google login error: ", error);
    }
  }

  async function loginWithGithub() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });

      if (error) throw error;
    } catch (error) {
      console.error("GitHub login error: ", error);
    }
  }

  async function logout() {
    try {
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout error: ", error);
    }
  }

  async function signup(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      return { success: true };
    } catch (error: unknown) {
      console.error("Signup error: ", error);
      if (error instanceof AuthError)
        return { success: false, error: error.message };
      return { success: false, error: "An unexpected error occured" };
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginWithGoogle,
    loginWithGithub,
    logout,
    signup,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}
