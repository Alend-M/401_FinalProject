// components/ProtectedAuthRoute.tsx
"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import { useLoginContext } from "@/context/loginContext";

interface ProtectedAuthRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function ProtectedAuthRoute({
  children,
  redirectTo = "/",
}: ProtectedAuthRouteProps) {
  const router = useRouter();
  const {
    isAuthenticated,
    isLoading: authLoading,
    loginToastUp,
  } = useLoginContext();

  useEffect(() => {
    const verifyAuth = () => {
      // Check if user is logged in
      if (!authLoading && isAuthenticated && !loginToastUp) {
        // If logged in, redirect away from login/signup
        console.log("User is logged in, redirecting to", redirectTo);
        router.replace(redirectTo);
        // We don't set isLoading to false here because we're redirecting
      } else {
        // Not logged in, allow access to login/signup
        console.log("User is not logged in, showing login/signup");
      }
    };

    verifyAuth();
  }, []);

  // Return children (login/signup page) only if not authenticated
  if (loginToastUp || !isAuthenticated) return <>{children}</>;

  // Show loading state while checking auth
  return <Spinner className="mt-10" />;
}
