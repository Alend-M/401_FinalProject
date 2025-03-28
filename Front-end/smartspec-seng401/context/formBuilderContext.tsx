"use client";

import { Component, FormData } from "@/types";
import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { useBuildResultContext } from "./buildResultContext";
import { NEXT_PUBLIC_API_GATEWAY_URL } from "@/constants";
import { useLoginContext } from "./loginContext";

const API_URL = NEXT_PUBLIC_API_GATEWAY_URL;

interface FormBuilderContextInterface {
  /*ATTRIBUTES*/
  budget: number;
  minFps: number;
  gamesList: string[];
  displayResolution: string;
  graphicalQuality: string;
  preOwnedHardware: Component[];

  /*METHODS*/
  changeBudget: (value: number) => void;
  changeMinFps: (value: number) => void;
  addToGamesList: (game: string) => void;
  removeFromGamesList: (index: number) => void;
  updateGameFromList: (index: number, newGame: string) => void;
  changeDisplayResolution: (resolution: string) => void;
  changeGraphicalQuality: (quality: string) => void;
  addToPreOwnedHardware: (component: Component) => void;
  removeFromPreOwnedHardware: (index: number) => void;
  updatePreOwnedHardware: (index: number, newComponent: Component) => void;
  submitForm: () => Promise<void>;
  submitFormAndSave: () => Promise<void>;
}

const FormBuilderContextDefaultValues: FormBuilderContextInterface = {
  budget: 1500,
  minFps: 60,
  gamesList: ["Cyberpunk 2077"],
  displayResolution: "1440p",
  graphicalQuality: "High",
  preOwnedHardware: [],
  changeBudget: () => {},
  changeMinFps: () => {},
  addToGamesList: () => {},
  removeFromGamesList: () => {},
  updateGameFromList: () => {},
  changeDisplayResolution: () => {},
  changeGraphicalQuality: () => {},
  addToPreOwnedHardware: () => {},
  removeFromPreOwnedHardware: () => {},
  updatePreOwnedHardware: () => {},
  submitForm: async () => {},
  submitFormAndSave: async () => {},
};

const FormBuilderContext = createContext<FormBuilderContextInterface>(
  FormBuilderContextDefaultValues
);

export function useFormBuilderContext() {
  return useContext(FormBuilderContext);
}

interface Props {
  children: ReactNode;
}

export function FormBuilderProvider({ children }: Props) {
  const [budget, setBudget] = useState<number>(
    FormBuilderContextDefaultValues.budget
  );
  const [minFps, setMinFps] = useState<number>(
    FormBuilderContextDefaultValues.minFps
  );
  const [gamesList, setGamesList] = useState<string[]>(
    FormBuilderContextDefaultValues.gamesList
  );
  const [displayResolution, setDisplayResolution] = useState<string>(
    FormBuilderContextDefaultValues.displayResolution
  );
  const [graphicalQuality, setGraphicalQuality] = useState<string>(
    FormBuilderContextDefaultValues.graphicalQuality
  );
  const [preOwnedHardware, setPreOwnedHardware] = useState<Component[]>(
    FormBuilderContextDefaultValues.preOwnedHardware
  );

  const { loadBuildResult, loadSummary } = useBuildResultContext(); // Inter-context communication
  const { user } = useLoginContext();

  function changeBudget(value: number) {
    setBudget(value);
  }

  function changeMinFps(value: number) {
    setMinFps(value);
  }

  function addToGamesList(game: string) {
    setGamesList([...gamesList, game]);
  }

  function removeFromGamesList(index: number) {
    setGamesList((prev) => {
      return prev.filter((_, i) => {
        return i != index;
      });
    });
  }

  function updateGameFromList(index: number, newGame: string) {
    setGamesList((prev) => {
      const newArray = [...prev];
      newArray[index] = newGame;
      return newArray;
    });
  }

  function changeDisplayResolution(resolution: string) {
    setDisplayResolution(resolution);
  }

  function changeGraphicalQuality(quality: string) {
    setGraphicalQuality(quality);
  }

  function addToPreOwnedHardware(component: Component) {
    setPreOwnedHardware([...preOwnedHardware, component]);
  }

  function removeFromPreOwnedHardware(index: number) {
    setPreOwnedHardware((prev) => {
      return prev.filter((_, i) => {
        return i != index;
      });
    });
  }

  function updatePreOwnedHardware(index: number, newComponent: Component) {
    setPreOwnedHardware((prev) => {
      const newArray = [...prev];
      newArray[index] = newComponent;
      return newArray;
    });
  }

  async function submitFormAndSave() {
    // Build the JSON from all the state files

    const summaryData: FormData = {
      budget,
      minFps,
      gamesList: gamesList.filter((game) => game.trim() !== ""), // Filtering out empty games
      displayResolution,
      graphicalQuality,
      preOwnedHardware: preOwnedHardware.filter(
        (component) => component.name.trim() !== ""
      ),
    };

    return axios
      .post(`${API_URL}/build/${user?.id}`, summaryData)
      .then(
        ({
          data: {
            CPUs,
            GPUs,
            RAM,
            Motherboards,
            Storage,
            Power_Supply,
            Case,
            Cooling,
            input,
          },
        }) => {
          loadBuildResult({
            CPUs,
            GPUs,
            RAM,
            Motherboards,
            Storage,
            Power_Supply,
            Case,
            Cooling,
          });

          loadSummary(input);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }

  async function submitForm() {
    // Build the JSON from all the state files

    const summaryData: FormData = {
      budget,
      minFps,
      gamesList: gamesList.filter((game) => game.trim() !== ""), // Filtering out empty games
      displayResolution,
      graphicalQuality,
      preOwnedHardware: preOwnedHardware.filter(
        (component) => component.name.trim() !== ""
      ),
    };

    return axios
      .post(`${API_URL}/build`, summaryData)
      .then(
        ({
          data: {
            CPUs,
            GPUs,
            RAM,
            Motherboards,
            Storage,
            Power_Supply,
            Case,
            Cooling,
            input,
          },
        }) => {
          loadBuildResult({
            CPUs,
            GPUs,
            RAM,
            Motherboards,
            Storage,
            Power_Supply,
            Case,
            Cooling,
          });

          loadSummary(input);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }

  // useEffect(() => {
  //   function debugPrint() {
  //     console.log(
  //       "Budget: ",
  //       budget,
  //       "\nMinFps: ",
  //       minFps,
  //       "\nGames: ",
  //       gamesList,
  //       "\nDisplay Resolution: ",
  //       displayResolution,
  //       "\nGraphical Quality: ",
  //       graphicalQuality,
  //       "\nPre-owned Hardware: ",
  //       preOwnedHardware
  //     );
  //   }
  //   debugPrint();
  // }, [
  //   budget,
  //   minFps,
  //   gamesList,
  //   displayResolution,
  //   graphicalQuality,
  //   preOwnedHardware,
  // ]);

  const value = {
    budget,
    minFps,
    gamesList,
    displayResolution,
    graphicalQuality,
    preOwnedHardware,
    changeBudget,
    changeMinFps,
    addToGamesList,
    removeFromGamesList,
    updateGameFromList,
    changeDisplayResolution,
    changeGraphicalQuality,
    addToPreOwnedHardware,
    removeFromPreOwnedHardware,
    updatePreOwnedHardware,
    submitForm,
    submitFormAndSave,
  };

  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  );
}
