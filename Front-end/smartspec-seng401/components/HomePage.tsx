"use client";

import BuildPCForm from "@/components/BuildPCForm";
import Hero from "@/components/Hero";
import React from "react";

function HomePage() {
	const buildPCFormRef = React.useRef<HTMLDivElement>(null);

	const scrollToBuildPCForm = () => {
		if (buildPCFormRef.current) {
			buildPCFormRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	};

	return (
		<div>
			<Hero onButtonClick={scrollToBuildPCForm} />
			<div ref={buildPCFormRef}>
				<BuildPCForm />
			</div>
		</div>
	);
}

export default HomePage;
