"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import BuildAccordion from "@/components/BuildAccordion";
import BuildSummary from "@/components/BuildSummary";
import axios from "axios";
import { BuildData } from "@/types";
import { NEXT_PUBLIC_API_GATEWAY_URL } from "@/constants";
import { useLoginContext } from "@/context/loginContext";

interface BuildDetailsComponentProps {
  buildId: string;
}

interface Build {
  buildjson: BuildData;
}

const BuildDetailsComponent: React.FC<BuildDetailsComponentProps> = ({
  buildId,
}) => {
  const router = useRouter();
  const [buildData, setBuildData] = useState<BuildData | null>(null);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, user } = useLoginContext();

  // Hmmm...
  useEffect(() => {
    async function loadBuildData() {
      setLoading(true);

      // Try to get the build from localStorage
      const storedBuild = localStorage.getItem("selectedBuild");

      if (storedBuild) {
        try {
          const parsedBuild: Build = JSON.parse(storedBuild);
          setBuildData(parsedBuild.buildjson);
          setLoading(false);
          return;
        } catch (error) {
          console.error("Error parsing stored build:", error);
          // Continue to fetch from API if parsing fails
        }
      }

      // If not in localStorage or parsing failed, fetch from API
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      try {
        const apiUrl = `${NEXT_PUBLIC_API_GATEWAY_URL}/past_builds/${user?.id}`;
        const response = await axios.get(apiUrl);

        const buildIndex = parseInt(buildId) - 1;
        if (response.data && response.data[buildIndex]) {
          const fetchedBuild = response.data[buildIndex];
          setBuildData(fetchedBuild.buildjson);

          // Store this build in localStorage
          localStorage.setItem("currentBuild", JSON.stringify(fetchedBuild));
        } else {
          console.error("Build not found");
          router.push("/history");
        }
      } catch (error) {
        console.error("Error fetching build:", error);
        router.push("/history");
      }

      setLoading(false);
    }

    loadBuildData();
  }, [buildId, isAuthenticated, router, user?.id]);

  if (loading) {
    return (
      <Spinner className="flex justify-center items-center mt-10" size="lg" />
    );
  }

  if (!buildData) {
    return <div className="text-center mt-8">Build not found</div>;
  }

  // Extract components and input data for our reusable components
  const components = {
    CPUs: buildData.CPUs,
    GPUs: buildData.GPUs,
    RAM: buildData.RAM,
    Motherboards: buildData.Motherboards,
    Storage: buildData.Storage,
    Power_Supply: buildData.Power_Supply,
    Case: buildData.Case,
    Cooling: buildData.Cooling,
  };

  let calculatedTotalPrice = 0; // Calculate total price
  Object.values(components).forEach((components) => {
    if (components) {
      calculatedTotalPrice += parseFloat(
        components.price_CAD.replace("$", "").replace(",", "")
      );
    }
  });

  const budgetString = `${buildData.input.budget.toString()}$ Budget`;
  const qualityString = `${buildData.input.graphicalQuality} Quality`;
  const resolutionString = `${buildData.input.displayResolution}`;
  const minFpsString = `${buildData.input.minFps.toString()} FPS Min`;

  const buildSpecificaitons = [
    budgetString,
    minFpsString,
    resolutionString,
    qualityString,
  ];

  const gamesList = buildData.input.gamesList;
  const preOwnedHardWare = buildData.input.preOwnedHardware;

  return (
    <div className="w-full max-w-4xl space-y-8">
      <BuildAccordion components={components} />
      <BuildSummary
        specifications={buildSpecificaitons}
        totalPrice={calculatedTotalPrice}
        gamesList={gamesList}
        preOwnedHardware={preOwnedHardWare}
      />
    </div>
  );
};

export default BuildDetailsComponent;
