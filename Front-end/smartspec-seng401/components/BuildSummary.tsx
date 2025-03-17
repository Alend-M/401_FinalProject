"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "./ui/card";
import { BaseText } from "./ui/baseText";
import { useBuildResultContext } from "@/context/buildResultContext";

interface SpecificationsProps {
  specifications: string[];
}

function Specifications({ specifications }: SpecificationsProps) {
  return (
    <div>
      <BaseText>Specifications</BaseText>
      {specifications.map((spec) => {
        return <Badge key={spec}>{spec}</Badge>;
      })}
    </div>
  );
}

interface GamesProps {
  gamesList: string[];
}

function Games({ gamesList }: GamesProps) {
  return (
    <div>
      <BaseText>Games</BaseText>
      {gamesList.map((game) => {
        return <Card key={game}>{game}</Card>;
      })}
    </div>
  );
}

function BuildSummary() {
  const { gamesList, specifications } = useBuildResultContext();

  return (
    <div className="flex flex-col w-bigCard p-major space-y-medium bg-white border rounded-md border-veryNiceGray">
      <div className="flex flex-row justify-between">
        <Specifications specifications={specifications} />
        <Games gamesList={gamesList} />
      </div>
    </div>
  );
}

export default BuildSummary;
