"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { checkSession, supabase } from "@/utils/supabaseClient";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { User } from "@supabase/supabase-js";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

// Navigation Components:
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavigationBarProps {
	override?: boolean;
}

function NavigationBar({ override = false }: NavigationBarProps) {
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();
	const pathname = usePathname();
	const hideNavbar =
		pathname === "/login" || pathname === "/signup" || pathname === "/";

	useEffect(() => {
		// Function to check the current session
		checkSession()
			.then((session) => {
				if (session) {
					setUser(session.user);
				}
			})
			.catch((error) => {
				console.error("Error checking session:", error);
			});

		// Subscribe to authentication state changes
		const { data: authListener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user || null); // Update the state on auth change
			}
		);

		// Clean up the listener when the component is unmounted
		return () => {
			authListener?.subscription.unsubscribe();
		};
	}, []);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		setUser(null);
		router.push("/");
	};
	if (!hideNavbar || override)
		return (
			<NavigationMenu className="space-x-medium">
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link href="/" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Home
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="/about" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								About Us
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="/contact" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Contact Us
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="/history" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Build History
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
				<div className="flex flex-row justify-center align-center space-x-minor">
					{user ? (
						<Popover>
							<PopoverTrigger asChild>
								<div className="cursor-pointer">
									{user.user_metadata?.avatar_url ? (
										<Image
											src={user.user_metadata.avatar_url}
											alt="User Avatar"
											width={32}
											height={32}
											className="rounded-full object-cover"
										/>
									) : (
										<AccountCircleIcon
											className="text-white"
											style={{ fontSize: 40 }}
										/>
									)}
								</div>
							</PopoverTrigger>
							<PopoverContent className="w-40 p-2">
								<p className="truncate text-sm mb-2 w-36">{user.email}</p>
								<Button
									variant="outline"
									onClick={handleLogout}
									className="w-full"
								>
									Logout
								</Button>
							</PopoverContent>
						</Popover>
					) : (
						<>
							<Button variant="secondary" onClick={() => router.push("/login")}>
								Login
							</Button>
							<Button variant="default" onClick={() => router.push("/signup")}>
								Sign up
							</Button>
						</>
					)}
				</div>
			</NavigationMenu>
		);
}

export default NavigationBar;
