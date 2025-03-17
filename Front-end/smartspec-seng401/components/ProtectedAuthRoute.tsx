// components/ProtectedAuthRoute.tsx
"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { checkSession } from "@/utils/supabaseClient"; // Adjust path to your actual file
import { Spinner } from "@heroui/spinner";

interface ProtectedAuthRouteProps {
	children: ReactNode;
	redirectTo?: string;
}

export default function ProtectedAuthRoute({
	children,
	redirectTo = "/",
}: ProtectedAuthRouteProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const verifyAuth = async () => {
			try {
				// Check if user is logged in
				const session = await checkSession();

				if (session) {
					// If logged in, redirect away from login/signup
					console.log("User is logged in, redirecting to", redirectTo);
					router.replace(redirectTo);
					// We don't set isLoading to false here because we're redirecting
				} else {
					// Not logged in, allow access to login/signup
					console.log("User is not logged in, showing login/signup");
					setIsLoading(false);
				}
			} catch (error) {
				console.error("Auth verification error:", error);
				// On error, default to showing the page
				setIsLoading(false);
			}
		};

		verifyAuth();
	}, [router, redirectTo]);

	// Show loading state while checking auth
	if (isLoading) {
		return <Spinner className="mt-10" />;
	}

	// Return children (login/signup page) only if not authenticated
	return <>{children}</>;
}
