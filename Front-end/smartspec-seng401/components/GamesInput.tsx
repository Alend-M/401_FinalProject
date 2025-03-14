"use client";

import React, { useState } from "react";
import { BaseText } from "./ui/baseText";
import { SmallText } from "./ui/smallText";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, X } from "lucide-react";

function GamesInput() {
  const defaultGames = ["Marvel Rivals", "Fortnite"];
  const [gamesList, setGamesList] = useState(defaultGames);

  function handleAddGame() {
    setGamesList((prev) => {
        return prev.concat(['']);
    })
  }

  function handleDeleteGame(index) {
    // DEBUG
    // console.log(index);
    
    setGamesList((prev) => {
        return prev.filter((_, i) => i !== index);
    })
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
            <Input defaultValue={game} />
            <X size={16} onClick={() => handleDeleteGame(i)} />
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
