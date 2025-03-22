import AboutCard from "@/components/AboutCard";
import { Subtitle } from "@/components/ui/subtitle";
import { Title } from "@/components/ui/title";
import React from "react";

function AboutPage() {
	const devs = [
		{ name: "Alex", about: "Frontend Developer", picture: "/Alex.jpeg" },
		{
			name: "Robert",
			about: "Backend Developer",
			picture: "/Robert.jpeg",
		},
		{
			name: "Caleb",
			about: "Backend Developer",
			picture: "/Caleb.jpeg",
		},
		{ name: "Lami", about: "Frontend Developer", picture: "/Lami.jpeg" },
		{
			name: "Alend",
			about: "Backend Developer",
			picture: "/Alend.jpeg",
		},
		{
			name: "Agustin",
			about: "Backend Developer",
			picture: "/Agustin.jpeg",
		},
	];

	return (
		<div className="space-y-major mb-20 mt-5">
			<div className="flex flex-col items-center text-center">
				<Title className="text-secondaryColor">Meet the Team 👋</Title>
				<Subtitle>The Team That Brought You SmartSpec</Subtitle>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mt-3">
				{devs.map((dev) => {
					return (
						<AboutCard
							key={dev.name}
							devName={dev.name}
							devAbout={dev.about}
							devPicture={dev.picture}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default AboutPage;
