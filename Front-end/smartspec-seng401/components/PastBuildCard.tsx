"use client";

import React from "react";
import { Button } from "./ui/button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Define TypeScript interface for the build object
interface Build {
	build_id: number;
	name: string; // Added name property
	cpu: string;
	gpu: string;
	ram: string;
	date: string;
	games: string[];
}

interface BuildCardProps {
	build: Build;
	onViewBuild?: (buildId: number) => void;
}

const BuildCard: React.FC<BuildCardProps> = ({ build, onViewBuild }) => {
	// Helper function to get game icons
	const getGameIcons = (games: string[]) => {
		// This would be replaced with actual game icons based on your data
		// For now, using placeholder colored squares
		const gameColors: Record<string, string> = {
			valorant: "bg-yellow-500 border-blue-900",
			fortnite: "bg-blue-400",
			apex: "bg-red-500",
			cod: "bg-gray-800",
		};

		return (
			<div className="flex space-x-2">
				{games.slice(0, 4).map((game, index) => (
					<div
						key={index}
						className={`w-8 h-8 ${
							gameColors[game] || "bg-gray-400"
						} flex items-center justify-center text-xs text-white`}
						title={game}
					>
						{game.charAt(0).toUpperCase()}
					</div>
				))}
				{games.length > 4 && <div className="text-gray-500">...</div>}
			</div>
		);
	};

	// Format date
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return `${date.getDate()}th ${date.toLocaleString("default", {
			month: "long",
		})}, ${date.getFullYear()}`;
	};

	const handleViewBuild = () => {
		if (onViewBuild) {
			onViewBuild(build.build_id);
		}
	};

	return (
		<div className="bg-white rounded-lg p-6 shadow-md w-full">
			<div className="flex justify-between items-start">
				<div className="space-y-4">
					<h2 className="text-3xl font-bold text-gray-900">{build.name}</h2>

					<p className="text-gray-600">
						{build.cpu}, {build.gpu}, {build.ram}...
					</p>
				</div>

				<div className="text-gray-500">{formatDate(build.date)}</div>
			</div>

			<div className="flex justify-between items-center mt-8">
				{getGameIcons(build.games)}
				<Button
					variant="secondary"
					className="flex items-center gap-x-3 px-6 py-5 rounded-full text-white"
					onClick={handleViewBuild}
				>
					<span>View Build</span>
					<ArrowForwardIcon fontSize="small" className="text-white" />{" "}
				</Button>
			</div>
		</div>
	);
};

export default BuildCard;
