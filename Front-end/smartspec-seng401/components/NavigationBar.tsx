"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
import { useLoginContext } from "@/context/loginContext";
import { cn } from "@/lib/utils";

interface NavigationBarProps {
	override?: boolean;
}

function NavigationBar({ override = false }: NavigationBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const hideNavbar = pathname === "/";
  const activeStyling = "bg-tertiaryColor text-black";
  
	const { logout, isAuthenticated, user } = useLoginContext();

	const handleLogout = () => {
		logout();
	};

  if (!hideNavbar || override)
    return (
      <NavigationMenu className="space-x-medium">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/" && activeStyling
                )}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/about" && activeStyling
                )}
              >
                About Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/contact" && activeStyling
                )}
              >
                Contact Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {isAuthenticated && (
            <NavigationMenuItem>
              <Link href="/history" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === "/history" && activeStyling
                  )}
                >
                  Build History
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
        <div className="flex flex-row justify-center align-center space-x-minor">
          {isAuthenticated ? (
            <Popover>
              <PopoverTrigger asChild>
                <div className="cursor-pointer">
                  {user?.user_metadata?.avatar_url ? (
                    <Image
                      src={user?.user_metadata.avatar_url}
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
                <p className="truncate text-sm mb-2 w-36">{user?.email}</p>
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
