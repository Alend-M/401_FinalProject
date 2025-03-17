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
			<BaseText>Specifications</BaseText>
			<div>
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
			<BaseText className="mt-3">Pre-owned Hardware</BaseText>
			{preOwnedHardware.map((hardware, index) => {
				return (
					<p key={index} className="text-gray-500">
						{hardware.type}: {hardware.name}
					</p>
				);
			})}
		</div>
	);
}

interface GamesProps {
	gamesList: string[];
}

function Games({ gamesList }: GamesProps) {
	return (
		<div>
			<BaseText>Games</BaseText>
			{gamesList.map((game) => {
				return (
					<Card key={game} className="p-minor w-full">
						{game}
					</Card>
				);
			})}
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
			saveBuildResult().then(() => {
				router.push("/history");
			});
		}
	}

	return (
		<div className="flex flex-col w-bigCard p-major space-y-medium bg-white border rounded-md border-veryNiceGray">
			<div className="flex flex-row justify-between">
				<Specifications
					specifications={specifications}
					preOwnedHardware={preOwnedHardware}
				/>
				<Games gamesList={gamesList} />
			</div>
			<Separator />
			<div className="flex flex-row justify-between">
				<BaseText>Total Price: </BaseText>
				<div>{`$${totalPrice}`}</div>
				<Button
					variant={"outline"}
					className="text-danger hover:border-danger"
					onClick={handleDiscardBuild}
				>
					Discard Build
				</Button>
				<Button variant={"default"} onClick={handleSaveBuild}>
					Save Build
				</Button>
			</div>
		</div>
	);
}

export default BuildSummary;
