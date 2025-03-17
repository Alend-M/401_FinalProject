"use client";

import BuildAccordion from "@/components/BuildAccordion";
import BuildSummary from "@/components/BuildSummary";
import { Subtitle } from "@/components/ui/subtitle";
import { Title } from "@/components/ui/title";
import { useBuildResultContext } from "@/context/buildResultContext";
import React from "react";

function ResultsPage() {
	const {
		buildResult,
		gamesList,
		specifications,
		totalPrice,
		summary,
		saveBuildResult,
		discardBuildResult,
	} = useBuildResultContext();

	const preOwnedHardware = summary.preOwnedHardware;

	return (
		<div className="flex flex-col items-center space-y-major">
			<div className="flex flex-col items-center">
				<Title className="text-secondaryColor">Build Results</Title>
				<Subtitle className="text-subheadingGray">
					Here are your build recommendations
				</Subtitle>
			</div>

			<BuildAccordion components={buildResult} />
			<BuildSummary
				gamesList={gamesList}
				specifications={specifications}
				totalPrice={totalPrice}
				saveBuildResult={saveBuildResult}
				discardBuildResult={discardBuildResult}
				preOwnedHardware={preOwnedHardware}
			/>
		</div>
	);
}

export default ResultsPage;
