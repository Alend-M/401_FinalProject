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
  gamesList: string[];
  specifications: string[];
  totalPrice: number;
  loadBuildResult: (buildResult: BuildResult) => void;
  saveBuildResult: () => void;
  discardBuildResult: () => void;
  loadGamesList: (gameList: string[]) => void;
  loadSpecifications: () => void;
  loadTotalPrice: () => void;
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
  gamesList: [],
  specifications: [],
  totalPrice: 0,
  loadBuildResult: () => {},
  saveBuildResult: () => {},
  discardBuildResult: () => {},
  loadGamesList: () => {},
  loadSpecifications: () => {},
  loadTotalPrice: () => {},
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

  function loadBuildResult(buildResult: BuildResult) {
    setBuildResult(buildResult);
  }

  function saveBuildResult() {
    // TODO:
  }

  function discardBuildResult() {
    // TODO:
  }

  function loadGamesList(gamesList: string[]) {
    // TODO:
  }

  function loadSpecifications() {
    // TODO:
  }

  function loadTotalPrice() {
    // TODO:
  }

  const value = {
    buildResult,
    gamesList,
    specifications,
    totalPrice,
    loadBuildResult,
    saveBuildResult,
    discardBuildResult,
    loadGamesList,
    loadSpecifications,
    loadTotalPrice,
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
