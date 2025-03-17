"use client";

import { BuildResult, FormData } from "@/types";
import { useRouter } from "next/navigation";
import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

interface BuildResultContextInterface {
  buildResult: BuildResult;
  gamesList: string[];
  specifications: string[];
  totalPrice: number;
  loadBuildResult: (buildResult: BuildResult) => void;
  saveBuildResult: () => void;
  discardBuildResult: () => void;
  loadSummary: (summary: FormData) => void;
}

const BuildResultContextDefaultValues: BuildResultContextInterface = {
  buildResult: {
    CPUs: {
      name: "",
      price_CAD: "",
      Justification: "",
    },

    GPUs: {
      name: "",
      price_CAD: "",
      Justification: "",
    },
    RAM: {
      name: "",
      price_CAD: "",
      Justification: "",
    },
    Motherboards: {
      name: "",
      price_CAD: "",
      Justification: "",
    },
    Storage: {
      name: "",
      price_CAD: "",
      Justification: "",
    },
    Power_Supply: {
      name: "",
      price_CAD: "",
      Justification: "",
    },
    Case: {
      name: "",
      price_CAD: "",
      Justification: "",
    },
    Cooling: {
      name: "",
      price_CAD: "",
      Justification: "",
    },
  },

  gamesList: [],
  specifications: [],
  totalPrice: 0,
  loadBuildResult: () => {},
  saveBuildResult: () => {},
  discardBuildResult: () => {},
  loadSummary: () => {},
};

const BuildResultContext = createContext<BuildResultContextInterface>(
  BuildResultContextDefaultValues
);

export function useBuildResultContext() {
  return useContext(BuildResultContext);
}

interface Props {
  children: ReactNode;
}

export function BuildResultsProvider({ children }: Props) {
  const [buildResult, setBuildResult] = useState<BuildResult>(
    BuildResultContextDefaultValues.buildResult
  );
  const [gamesList, setGamesList] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const router = useRouter();

  function parsePrice(priceString: string): number {
    // Remove the '$' character and any commas, then convert to number
    return parseFloat(priceString.replace(/[$,]/g, ""));
  }

  function loadBuildResult(buildResult: BuildResult) {
    setBuildResult(buildResult);

    // Calculate price
    let totalPrice = 0;
    for (const component in buildResult) {
      totalPrice += parsePrice(
        buildResult[component as keyof BuildResult].price_CAD
      );
    }

    setTotalPrice(totalPrice);
  }

  function saveBuildResult() {
    // TODO: Saves build
  }

  function discardBuildResult() {
    // TODO:Should reset everything in this context

    setBuildResult(BuildResultContextDefaultValues.buildResult);
    setGamesList([]);
    setSpecifications([]);
    setTotalPrice(0);

    // Push user to home page with router
    router.push("/");
  }

  function loadSummary(summary: FormData) {
    // Assigning the necessary values
    // gamesList, specifications
    const {
      budget,
      minFps,
      gamesList,
      displayResolution,
      graphicalQuality,
    } = summary;
    setGamesList(gamesList);

    // For specifications, we'd like small texts/phrases that'll represent the
    // stuff the user chose
    // e.g. 1080p, Low quality, $1500 budget, 90 FPS Min, etc.

    const budgetString = `${budget} Budget`;
    const qualityString = `${graphicalQuality} Quality`;
    const resolutionString = `${displayResolution}`;
    const minFpsString = `${minFps} FPS Min`;

    setSpecifications([
      budgetString,
      qualityString,
      resolutionString,
      minFpsString,
    ]);
  }

  const value = {
    buildResult,
    gamesList,
    specifications,
    totalPrice,
    loadBuildResult,
    saveBuildResult,
    discardBuildResult,
    loadSummary,
  };

  function debugPrint() {
    console.log("Build Result: ", buildResult);
  }

  useEffect(() => {
    debugPrint();
  }, [buildResult]);

  return (
    <BuildResultContext.Provider value={value}>
      {children}
    </BuildResultContext.Provider>
  );
}
