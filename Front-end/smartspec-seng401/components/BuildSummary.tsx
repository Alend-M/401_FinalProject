import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "./ui/card";

function Specifications() {
  return <div>Specs</div>;
}

function Games() {
  return <div>Games</div>;
}

function BuildSummary() {
  return (
    <div className="flex flex-col w-bigCard p-major space-y-medium bg-white border rounded-md border-veryNiceGray">
      <div className="flex flex-row justify-between">
        <Specifications />
        <Games />
      </div>
    </div>
  );
}

export default BuildSummary;
