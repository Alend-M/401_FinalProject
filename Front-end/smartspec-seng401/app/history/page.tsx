"use client";

import React, { useEffect, useState } from "react";
import PastBuilds from "@/components/PastBuilds";
import { Subtitle } from "@/components/ui/subtitle";
import { Title } from "@/components/ui/title";
import { ArrowUp } from "lucide-react";

const BuildHistory = () => {
	const [showScrollTop, setShowScrollTop] = useState(false);

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
			const threshold = window.innerHeight / 5;
			setShowScrollTop(window.scrollY > threshold);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="sm:py-massive py-major space-y-major">
			<div className="flex flex-col items-center">
				<Title className="text-secondaryColor">Build History</Title>
				<Subtitle className="mb-1">
					A list of all your previous builds!
				</Subtitle>
			</div>
			<PastBuilds />

			{showScrollTop && (
				<button
					onClick={scrollToTop}
					className="fixed bottom-6 right-6 w-12 h-12 bg-primaryColor text-white rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all z-50"
					aria-label="Scroll to top"
				>
					<ArrowUp size={24} />
				</button>
			)}
		</div>
	);
};

export default BuildHistory;
