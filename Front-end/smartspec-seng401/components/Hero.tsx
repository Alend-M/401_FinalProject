"use client";

import React from "react";
import { Button } from "./ui/button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";

function Hero() {
	const Router = useRouter();
	return (
		<div
			className="absolute inset-0 bg-cover bg-center h-screen w-screen flex justify-center items-center text-white"
			style={{ backgroundImage: "url('/landingpage.jpg')" }}
		>
			<div className="absolute inset-0 h-screen bg-black/50 flex flex-col justify-center items-center gap-y-2 mb-20 ">
				<div className="text-9xl font-bold">SmartSpec</div>
				<div className="text-4xl">Your PC Building Pal</div>
				<div className="flex gap-x-5 mt-7">
					<Button
						variant="default"
						className="flex items-center gap-x-3 px-2 py-5 rounded-full text-white font-medium text-lg"
						// onClick={} scroll to the build pc form lower down
					>
						<span className="ml-1">Build a PC</span>
						<div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center">
							<ArrowForwardIcon fontSize="small" className="text-white" />
						</div>
					</Button>
					<Button
						variant={"secondary"}
						className="text-lg py-5"
						onClick={() => {
							Router.push("/login");
						}}
					>
						Log in
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Hero;
