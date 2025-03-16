"use client";

import { Component } from "@/types";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const API_URL = "http://localhost:8000";

// const API_URL =
//   "https://smartspec-backend.vy7t9a9crqmrp.us-west-2.cs.amazonlightsail.com";

interface FormBuilderContextInterface {
  /* We need the following attributes:
    - User's Budget: number
    - List of Users Games: string[]
    - Display resolution: string
    - Minimum fps: number
    - Graphical Quality: string
    - Pre-owned Hardware: list[{ComponentType: string, name: string}]

    Then of course, we'd like the following actions:
    - Change budget: () => number
    - Submit form: () => {},
    */

  /*ATTRIBUTES*/
  budget: number;
  minFps: number;
  gamesList: string[];
  displayResolution: string;
  graphicalQuality: string;
  preOwnedHardware: Component[];
  // Debugging

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
  submitForm: () => Promise<any>;

  // For Debugging Purposes
  debugPrint: () => void;
}

const FormBuilderContextDefaultValues: FormBuilderContextInterface = {
  budget: 0,
  minFps: 0,
  gamesList: [],
  displayResolution: "",
  graphicalQuality: "",
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
  submitForm: () => Promise.resolve({}),
  // For Debugging Purposes
  debugPrint: () => {},
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
  const [budget, setBudget] = useState<number>(0);
  const [minFps, setMinFps] = useState<number>(0);
  const [gamesList, setGamesList] = useState<string[]>([]);
  const [displayResolution, setDisplayResolution] = useState<string>("");
  const [graphicalQuality, setGraphicalQuality] = useState<string>("");
  const [preOwnedHardware, setPreOwnedHardware] = useState<Component[]>([]);

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

  function submitForm() {
    // Build the JSON from all the state files
    // Goal: send POST requestion to ${API_URL}/build/1

    const requestData = {
      budget,
      minFps,
      gamesList: gamesList.filter((game) => game.trim() !== ""), // Filtering out empty games
      displayResolution,
      graphicalQuality,
      preOwnedHardware: preOwnedHardware.filter(
        (component) => component.name.trim() !== ""
      ),
    };

    const requestDataJSON = requestData;

    // Logging the data being sent
    console.log("Submitting form data: ", requestDataJSON);

    // Send the POST requestion
    return axios
      .post(`${API_URL}/build/1`, requestDataJSON, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        return response;
      });
  }

  function debugPrint() {
    console.log(
      "Budget: ",
      budget,
      "\nMinFps: ",
      minFps,
      "\nGames: ",
      gamesList,
      "\nDisplay Resolution: ",
      displayResolution,
      "\nGraphical Quality: ",
      graphicalQuality,
      "\nPre-owned Hardware: ",
      preOwnedHardware
    );
  }

  useEffect(() => {
    debugPrint();
  }, [
    budget,
    minFps,
    gamesList,
    displayResolution,
    graphicalQuality,
    preOwnedHardware,
  ]);

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
    debugPrint,
  };

  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  );
}
