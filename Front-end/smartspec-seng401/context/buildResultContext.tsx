"use client";

import { BuildResult, FormData } from "@/types";
import axios from "axios";
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
  summary: FormData;
  loadBuildResult: (buildResult: BuildResult) => void;
  saveBuildResult: () => Promise<void>;
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
  summary: {
    budget: 0,
    minFps: 0,
    gamesList: [],
    displayResolution: "",
    graphicalQuality: "",
    preOwnedHardware: [],
  },
  loadBuildResult: () => {},
  saveBuildResult: () => Promise.resolve(),
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
  const [summary, setSummary] = useState<FormData>(
    BuildResultContextDefaultValues.summary
  );

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
    /*
    @app.post("/save_build/{user_id}")
async def saveBuildEndpoint(user_id: str, build: Request):
    buildJson = await build.json()
    save_response = await saveBuild(user_id, buildJson)
    print(save_response)
    return JSONResponse(content=save_response, headers=headers)
    */

    // TODO: Hardcoded user_id for now
    const user_id = "1";
    const payload = {
      ...buildResult,
      input: summary,
    };

    return axios
      .post(`${API_URL}/save_build/${user_id}`, payload)
      .then((response) => {
        console.log("Save Response: ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function discardBuildResult() {
    // TODO:Should reset everything in this context

    setBuildResult(BuildResultContextDefaultValues.buildResult);
    setGamesList([]);
    setSpecifications([]);
    setTotalPrice(0);
  }

  function loadSummary(summary: FormData) {
    setSummary(summary);
    // Assigning the necessary values
    // gamesList, specifications
    const { budget, minFps, gamesList, displayResolution, graphicalQuality } =
      summary;
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
    summary,
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
