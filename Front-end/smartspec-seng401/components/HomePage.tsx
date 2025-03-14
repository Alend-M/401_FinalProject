"use client";

import Hero from "@/components/Hero";
import React from "react";
import BuildForm from "./BuildForm";
import { Subtitle } from "./ui/subtitle";
import { Title } from "./ui/title";

function HomePage() {
	const buildFormRef = React.useRef<HTMLDivElement>(null);

	// Scroll to the build form section
	const scrollToBuildForm = () => {
		if (buildFormRef.current) {
			buildFormRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	return (
		<div>
			{/* Hero Section */}
			<div className="h-screen">
				<Hero onButtonClick={scrollToBuildForm} />
			</div>
			<Hero onButtonClick={scrollToBuildForm} />

			{/* Build Form Section */}
			<div ref={buildFormRef} className="mb-10">
				<div className="flex flex-col items-center">
					<Title className="text-secondaryColor">SmartSpec Builder</Title>
					<Subtitle className="mb-1">Tune it to your requirements</Subtitle>
				</div>
				<div>
					<BuildForm />
				</div>
			</div>
		</div>
	);
}

export default HomePage;
