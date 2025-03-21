"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "./ui/card";
import { BaseText } from "./ui/baseText";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Component } from "@/types";

interface SpecificationsProps {
	specifications: string[];
	preOwnedHardware: Component[];
}

function Specifications({
	specifications,
	preOwnedHardware,
}: SpecificationsProps) {
	return (
		<div>
			<BaseText className="text-lg">Specifications</BaseText>
			<div className="space-x-1">
				{specifications.map((spec) => {
					return (
						<Badge
							key={spec}
							variant={"outline"}
							className="text-secondaryColor"
						>
							{spec}
						</Badge>
					);
				})}
			</div>
			<BaseText className="mt-3 text-lg">Pre-owned Hardware</BaseText>
			{preOwnedHardware && preOwnedHardware.length > 0 ? (
				preOwnedHardware.map((hardware, index) => {
					return (
						<p key={index} className="text-gray-500">
							{hardware.type}: {hardware.name}
						</p>
					);
				})
			) : (
				<p className="text-sm">No pre-owned hardware</p>
			)}
		</div>
	);
}

interface GamesProps {
	gamesList: string[];
}

function Games({ gamesList }: GamesProps) {
	return (
		<div>
			<BaseText className="text-lg">Games</BaseText>
			{gamesList && gamesList.length > 0 ? (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
					{gamesList.map((game) => {
						return (
							<Card key={game} className="p-minor w-full">
								{game}
							</Card>
						);
					})}
				</div>
			) : (
				<p>No games available</p>
			)}
		</div>
	);
}

interface BuildSummaryProps {
	gamesList: string[];
	specifications: string[];
	totalPrice: number;
	preOwnedHardware: Component[];
	discardBuildResult?: () => void;
	saveBuildResult?: () => Promise<void>;
}

function BuildSummary({
	gamesList,
	specifications,
	totalPrice,
	preOwnedHardware,
	discardBuildResult,
	saveBuildResult,
}: BuildSummaryProps) {
	const [confirmDiscard, setConfirmDiscard] = React.useState(false);
	const router = useRouter();

	function handleDiscardBuild() {
		if (discardBuildResult) {
			discardBuildResult();
			// Push user to home page with router
			router.push("/");
		}
	}

	function handleSaveBuild() {
		if (saveBuildResult) {
			saveBuildResult();
		}
	}

	return (
		<div className="flex flex-col w-screen md:w-full lg:w-bigCard sm:p-major p-3 space-y-medium bg-white border rounded-md border-veryNiceGray">
			<div className="flex flex-col lg:flex-row justify-between">
				<Specifications
					specifications={specifications}
					preOwnedHardware={preOwnedHardware}
				/>
				<div className="mt-3 lg:mt-0">
					<Games gamesList={gamesList} />
				</div>
			</div>
			<Separator />
			<div className="flex flex-row justify-between items-center space-x-1/2">
				{saveBuildResult ? (
					<div className="flex flex-col sm:flex-row space-x-2">
						<BaseText className="sm:hidden">Total Price: </BaseText>
						<div className="ml-3 sm:ml-0">{`$${totalPrice}`}</div>
					</div>
				) : (
					<div className="flex flex-row space-x-2">
						<BaseText>Total Price: </BaseText>
						<div
							className={`ml-3 ${saveBuildResult ? "sm:hidden" : ""}`}
						>{`$${totalPrice}`}</div>
					</div>
				)}
				<Button
					variant={"outline"}
					className="text-danger hover:border-danger w-full sm:w-auto"
					onClick={() => {
						if (confirmDiscard) {
							handleDiscardBuild();
						} else {
							setConfirmDiscard(true);
						}
					}}
				>
					{confirmDiscard ? "Confirm" : "Discard Build"}
				</Button>
				{saveBuildResult && (
					<Button variant={"default"} onClick={handleSaveBuild}>
						Save Build
					</Button>
				)}
			</div>
		</div>
	);
}

export default BuildSummary;
