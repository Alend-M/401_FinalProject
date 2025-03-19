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
import { error } from "console";

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

    // Check for existing session on mount
    const checkSession = () => {
      return supabase.auth
        .getUser()
        .then(({ data: { user }, error }) => {
          if (error) throw error;
          setUser(user);
        })
        .catch((error) => {
          console.error("Error loggin user in", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setIsLoading(false);
      }
    );

    checkSession();

    // Clean up listener
    return () => {
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
    } catch {
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
