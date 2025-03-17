"use client";

import { BuildResult } from "@/types";
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
  loadBuildResult: (buildResult: BuildResult) => void;
  saveBuildResult: () => void;
  discardBuildResult: () => void;
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
    games: [],
  },
  loadBuildResult: () => {},
  saveBuildResult: () => {},
  discardBuildResult: () => {},
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

  function loadBuildResult(buildResult: BuildResult) {
    console.log(" The build result to set is....: ", buildResult);

    setBuildResult(buildResult);
  }

  function saveBuildResult() {
    // TODO:
  }

  function discardBuildResult() {
    // TODO:
  }

  const value = {
    buildResult,
    loadBuildResult,
    saveBuildResult,
    discardBuildResult,
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
