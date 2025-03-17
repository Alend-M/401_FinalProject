import BuildAccordion from "@/components/BuildAccordion";
import BuildSummary from "@/components/BuildSummary";
import { Subtitle } from "@/components/ui/subtitle";
import { Title } from "@/components/ui/title";
import React from "react";

function ResultsPage() {
  return (
    <div className="flex flex-col items-center space-y-major">
      <div className="flex flex-col items-center">
        <Title className="text-secondaryColor">Build Results</Title>
        <Subtitle className="text-subheadingGray">
          Here are you build recommendations
        </Subtitle>
      </div>

      <BuildAccordion />
      <BuildSummary />
    </div>
  );
}

export default ResultsPage;
