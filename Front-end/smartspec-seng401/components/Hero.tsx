"use client";

import { Button } from "./ui/button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";
import { checkSession, supabase } from "@/utils/supabaseClient";
import { User } from "@supabase/supabase-js";
import React, { useEffect } from "react";

function Hero({ onButtonClick }: { onButtonClick: () => void }) {
	const Router = useRouter();
	const [user, setUser] = React.useState<User | null>(null);

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

	return (
		<div
			className="absolute inset-0 bg-cover bg-center h-screen flex justify-center items-center text-white"
			style={{ backgroundImage: "url('/landingpage.jpg')" }}
		>
			<div className="absolute inset-0 h-screen bg-black/50 flex flex-col justify-center items-center gap-y-2 mb-20 ">
				<div className="text-9xl font-bold">SmartSpec</div>
				<div className="text-4xl">Your PC Building Pal</div>
				<div className="flex gap-x-5 mt-7">
					<Button
						variant="default"
						className="flex items-center gap-x-3 px-2 py-5 rounded-full text-white text-lg"
						onClick={onButtonClick}
					>
						<span className="ml-1">Build a PC</span>
						<div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center">
							<ArrowForwardIcon fontSize="small" className="text-white" />
						</div>
					</Button>
					{!user && (
						<Button
							variant={"secondary"}
							className="text-lg py-5"
							onClick={() => {
								Router.push("/login");
							}}
						>
							Log in
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Hero;
