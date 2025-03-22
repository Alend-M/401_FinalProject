"use client";

import BuildAccordion from "@/components/BuildAccordion";
import BuildSummary from "@/components/BuildSummary";
import { Subtitle } from "@/components/ui/subtitle";
import { Title } from "@/components/ui/title";
import { useBuildResultContext } from "@/context/buildResultContext";
import { Spinner } from "@heroui/spinner";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

// Create a client component that uses the useSearchParams hook
function ResultsContent() {
	const {
		buildResult,
		gamesList,
		specifications,
		totalPrice,
		summary,
		saveBuildResult,
		loadBuildResult,
		loadSummary,
		discardBuildResult,
	} = useBuildResultContext();

	const preOwnedHardware = summary.preOwnedHardware;

	// Import useSearchParams hook inside the component that's wrapped in Suspense
	const searchParams = useSearchParams();

	React.useEffect(() => {
		console.log("Results Page Mounted Now!");
		const restore = searchParams.get("restore");

		console.log("Restor string:", restore);

		if (restore?.includes("true")) {
			console.log("Yes Block Entered:");

			const buildResultsString = localStorage.getItem("buildResult");
			const summaryString = localStorage.getItem("summary");

			console.log("BuildResultString, ", buildResultsString);
			console.log("SummaryString, ", summaryString);

			console.log("Crucial Step Next!");
			loadBuildResult(JSON.parse(buildResultsString || "{}"));
			loadSummary(JSON.parse(summaryString || "{}"));
		}
	}, [searchParams]);

	return (
		<div className="flex flex-col items-center space-y-major mb-20 mt-5">
			<div className="flex flex-col items-center text-center">
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

// Main component that wraps the content in Suspense
function ResultsPage() {
	return (
		<Suspense fallback={<Spinner />}>
			<ResultsContent />
		</Suspense>
	);
}

export default ResultsPage;
