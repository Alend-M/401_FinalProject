"use client";

import React, { useEffect, useState } from "react";
import PastBuilds from "@/components/PastBuilds";
import { Subtitle } from "@/components/ui/subtitle";
import { Title } from "@/components/ui/title";
import { ArrowUp } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

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

	useEffect(() => {
		const buildDeleteStatus = localStorage.getItem("buildDeleteStatus");

		if (buildDeleteStatus === "success") {
			setTimeout(() => {
				toast.success("Build deleted successfully");
			}, 300);
			localStorage.removeItem("buildDeleteStatus");
		} else if (buildDeleteStatus === "error") {
			const errorMessage =
				localStorage.getItem("buildDeleteErrorMessage") ||
				"Error deleting build";
			toast.error(errorMessage);
			localStorage.removeItem("buildDeleteStatus");
			localStorage.removeItem("buildDeleteErrorMessage");
		}
	}, []);

	return (
		<div className="mb-20">
			<div className="flex flex-col items-center justify-center text-center">
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
			<Toaster position={"top-center"} reverseOrder={false} />
		</div>
	);
};

export default BuildHistory;
