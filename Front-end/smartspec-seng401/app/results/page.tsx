"use client";

import BuildAccordion from "@/components/BuildAccordion";
import BuildSummary from "@/components/BuildSummary";
import { Subtitle } from "@/components/ui/subtitle";
import { Title } from "@/components/ui/title";
import { useBuildResultContext } from "@/context/buildResultContext";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";

function ResultsPage() {
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

  const searchParams = useSearchParams();

  useEffect(() => {
    const restore = searchParams.get("restore");
    if (restore === "true") {
      const buildResultsString = localStorage.getItem("buildResults");
      const summaryString = localStorage.getItem("summary");

      if (buildResultsString && summaryString) {
        loadBuildResult(JSON.parse(buildResultsString));
        loadSummary(JSON.parse(summaryString));
      }
    }
  }, [loadBuildResult, loadSummary, searchParams]);

  return (
    <Suspense>
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
    </Suspense>
  );
}

export default ResultsPage;
