"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Navigation Components:
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import { Button } from "./ui/button";

function NavigationBar() {
	const [activeTab, setActiveTab] = useState("");
	const router = useRouter();

	function handleClickNavMenu() {
		// If the user clicks on a nav menu, menu should stay highlighted
	}

	return (
		<NavigationMenu className="space-x-medium">
			<NavigationMenuList>
				<NavigationMenuItem>
					<Link href="/" legacyBehavior passHref>
						<NavigationMenuLink active className={navigationMenuTriggerStyle()}>
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
			</NavigationMenuList>
			<div className="flex flex-row justify-center align-center space-x-minor">
				<Button variant={"secondary"} onClick={() => router.push("/login")}>
					Login
				</Button>
				<Button variant={"default"} onClick={() => router.push("/signup")}>
					Sign up
				</Button>
			</div>
		</NavigationMenu>
	);
}

export default NavigationBar;
