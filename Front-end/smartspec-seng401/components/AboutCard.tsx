"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

interface AboutCardProps {
	devName?: string;
	devAbout?: string;
	devPicture?: string;
}

function AboutCard({ devName, devAbout, devPicture }: AboutCardProps) {
	return (
		<Card className="w-[326px]">
			<CardContent>
				<div className="flex flex-col space-y-medium">
					{/* <Image width={40} height={40} className="w-40 h-40" src={"https://placehold.co/160x160"} alt="test" /> */}
					<Image
						src={devPicture || "https://placehold.co/160x160"}
						alt={devName || "Name"}
						width={160}
						height={160}
						className="w-40 h-40 rounded-md"
					></Image>
					<div className="flex flex-col space-y-minor">
						<p className="text-2xl font-bold">{devName || "Name"}</p>
						<p className="text-primaryColor">
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
