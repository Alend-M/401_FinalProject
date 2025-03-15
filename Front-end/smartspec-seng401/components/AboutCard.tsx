"use client";

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

interface AboutCardProps {
	devName?: string;
	devAbout?: string;
}

function AboutCard({ devName, devAbout }: AboutCardProps) {
	return (
		<Card className="w-[326px]">
			<CardContent>
				<div className="flex flex-col space-y-medium">
					{/* <Image width={40} height={40} className="w-40 h-40" src={"https://placehold.co/160x160"} alt="test" /> */}
					<img
						className="w-40 h-40 min-w-40"
						src="https://placehold.co/160x160"
					/>
					<div className="flex flex-col space-y-minor">
						<p className="text-2xl font-bold">{devName || "Name"}</p>
						<p>
							{devAbout ||
								"Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very short story."}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default AboutCard;
