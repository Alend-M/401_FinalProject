"use client";

import React from "react";
import { BaseText } from "./ui/baseText";
import { SmallText } from "./ui/smallText";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, X } from "lucide-react";
import { useFormBuilderContext } from "@/context/formBuilderContext";

function GamesInput() {
  // const [gamesList, setGamesList] = useState(defaultGames);
  const { gamesList, addToGamesList, removeFromGamesList, updateGameFromList } =
    useFormBuilderContext();

  function handleAddGame() {
    addToGamesList("");
  }

  function handleDeleteGame(index: number) {
    removeFromGamesList(index);
  }

  function handleInputChange(index: number, newGame: string) {
    // We want to change the string at the certain index to the typed value
    updateGameFromList(index, newGame);
  }

  return (
    <div className="flex flex-col space-y-tiny">
      <BaseText>Games</BaseText>
      <SmallText className="text-subheadingGray">
        Add the games you want to play on this build
      </SmallText>
      {gamesList.map((game, i) => {
        return (
          <div
            key={i}
            className="flex flex-row justify-between items-center space-x-minor"
          >
            <Input
              defaultValue={game}
              onChange={(e) => {
                handleInputChange(i, e.target.value);
              }}
            />
            <div
              className="flex h-9 w-9 justify-center items-center cursor-pointer border border-veryNiceGray text-danger rounded-md"
              onClick={() => handleDeleteGame(i)}
            >
              <X size={16} />
            </div>
          </div>
        );
      })}

      <Button variant={"outline"} onClick={handleAddGame}>
        <Plus />
        Add Game
      </Button>
    </div>
  );
}

export default GamesInput;
