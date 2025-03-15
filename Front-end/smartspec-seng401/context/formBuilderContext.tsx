"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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

  budget: number;
  minFps: number;
  gamesList: string[];
  changeBudget: (value: number) => void;
  changeMinFps: (value: number) => void;
  addToGamesList: (game: string) => void;
  removeFromGamesList: (index: number) => void;
  updateGameFromList: (index: number, newGame: string) => void;
  // For Debugging Purposes
  debugPrint: () => void;
}

const FormBuilderContextDefaultValues: FormBuilderContextInterface = {
  budget: 0,
  minFps: 0,
  gamesList: [],
  changeBudget: () => {},
  changeMinFps: () => {},
  addToGamesList: () => {},
  removeFromGamesList: () => {},
  updateGameFromList: () => {},
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

  function debugPrint() {
    console.log(
      "Budget: ",
      budget,
      "\nMinFps: ",
      minFps,
      "\nGames: ",
      gamesList
    );
  }

  useEffect(() => {
    debugPrint();
  }, [budget, minFps, gamesList]);

  const value = {
    budget,
    minFps,
    gamesList,
    changeBudget,
    changeMinFps,
    addToGamesList,
    removeFromGamesList,
    updateGameFromList,
    debugPrint,
  };

  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  );
}
