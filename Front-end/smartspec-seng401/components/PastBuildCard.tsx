"use client";

import React from "react";
import { Button } from "./ui/button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BuildString } from "@/types";

interface BuildCardProps {
  build: BuildString;
  onViewBuild?: (buildId: number) => void;
}

const BuildCard: React.FC<BuildCardProps> = ({ build, onViewBuild }) => {
  // Helper function to get game icons
  const getGameIcons = (games: string[]) => {
    // Color mapping for common games
    const gameColors: Record<string, string> = {
      valorant: "bg-yellow-500 border-yellow-600",
      fortnite: "bg-blue-400 border-blue-500",
      apex: "bg-red-500 border-red-600",
      cod: "bg-gray-800 border-gray-900",
      minecraft: "bg-green-500 border-green-600",
      roblox: "bg-red-400 border-red-500",
      csgo: "bg-orange-500 border-orange-600",
      overwatch: "bg-orange-400 border-orange-500",
      lol: "bg-purple-500 border-purple-600",
      dota: "bg-red-600 border-red-700",
    };

    // Array of color classes for random assignment
    const randomColors = [
      "bg-blue-500 border-blue-600",
      "bg-green-500 border-green-600",
      "bg-purple-500 border-purple-600",
      "bg-pink-500 border-pink-600",
      "bg-indigo-500 border-indigo-600",
      "bg-orange-500 border-orange-600",
      "bg-teal-500 border-teal-600",
      "bg-cyan-500 border-cyan-600",
    ];

    return (
      <TooltipProvider>
        <div className="flex space-x-2">
          {games.slice(0, 4).map((game, index) => {
            const gameLower = game.toLowerCase();
            const firstLetter = game.charAt(0).toUpperCase();

            // Use predefined color or pick a random one based on game name
            let colorClass;
            if (gameColors[gameLower]) {
              colorClass = gameColors[gameLower];
            } else {
              // Use game name as seed for consistent color selection
              const randomIndex = gameLower.charCodeAt(0) % randomColors.length;
              colorClass = randomColors[randomIndex];
            }

            // Format game name for display (capitalize first letter of each word)
            const formattedGameName = game
              .split(/[\s-_]+/)
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ");

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className={`w-8 h-8 ${colorClass} rounded-md border flex items-center justify-center text-xs font-bold text-white shadow-sm cursor-pointer`}
                  >
                    {firstLetter}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{formattedGameName}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
          {games.length > 4 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-8 h-8 bg-gray-200 border border-gray-300 rounded-md flex items-center justify-center text-xs font-medium text-gray-600 cursor-pointer">
                  +{games.length - 4}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{games.length - 4} more games</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TooltipProvider>
    );
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

        <div className="text-gray-500"></div>
      </div>

      <div className="flex justify-between items-center mt-8">
        {getGameIcons(build.games)}
        <Button
          variant="default"
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
