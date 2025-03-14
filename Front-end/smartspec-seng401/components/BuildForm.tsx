import React from "react";
import SliderInput from "./SliderInput";
import { Separator } from "@/components/ui/separator";
import GamesInput from "./GamesInput";
import RadioInput from "@/components/RadioInput";

function BuildForm() {
  return (
    <div className="flex flex-col w-bigCard p-major space-y-medium bg-white border rounded-md border-veryNiceGray">
      <SliderInput
        name="Budget"
        description="Choose how much you want to spend on this build"
        lowerBound={500}
        upperBound={10000}
        defaultValue={5000}
        step={50}
        unit="$"
        prefix
      />
      <Separator />
      <GamesInput />
      <Separator />
      <RadioInput
        name="Display Resolution"
        description="Choose the resolution that you'd like to play at"
        options={["1080p", "1440p", "4K", "Ultra-wide"]}
        defaultOption="1080p"
      />
      <Separator />
      <SliderInput
        name="Average FPS"
        description="Choose how much FPS you want in your games"
        lowerBound={30}
        upperBound={500}
        defaultValue={60}
        step={5}
        unit="FPS"
      />
    </div>
  );
}

export default BuildForm;
