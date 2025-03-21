"use client";

import Hero from "@/components/Hero";
import React, { useState, useEffect } from "react";
import BuildForm from "./BuildForm";
import { Subtitle } from "./ui/subtitle";
import { Title } from "./ui/title";
import { ArrowUp } from "lucide-react";
import NavigationBar from "./NavigationBar";

function HomePage() {
	const buildFormRef = React.useRef<HTMLDivElement>(null);
	const [showScrollTop, setShowScrollTop] = useState(false);

	// Scroll to the build form section
	const scrollToBuildForm = () => {
		if (buildFormRef.current) {
			buildFormRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	// Handle scroll events to show/hide the button
	useEffect(() => {
		const handleScroll = () => {
			// Show button when scrolled to form (adjust threshold as needed)
			const threshold = window.innerHeight / 2;
			setShowScrollTop(window.scrollY > threshold);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="w-full">
			{/* Hero Section */}
			<div className="w-full h-screen border border-black">
				<NavigationBar override />
				<Hero onButtonClick={scrollToBuildForm} />
			</div>

			{/* Build Form Section */}
			<div
				ref={buildFormRef}
				className="flex flex-col items-center justify-center pt-10 mb-10"
			>
				<div className="flex flex-col items-center justify-center">
					<Title className="text-secondaryColor">SmartSpec Builder</Title>
					<Subtitle className="mb-1">Tune it to your requirements</Subtitle>
				</div>
				<BuildForm />
			</div>

			{/* Scroll to top button */}
			{/* {showScrollTop && (
				<button
					onClick={scrollToTop}
					className="fixed bottom-6 right-6 w-12 h-12 bg-primaryColor text-white rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all z-50"
					aria-label="Scroll to top"
				>
					<ArrowUp size={24} />
				</button>
			)} */}
		</div>
	);
}

export default HomePage;
