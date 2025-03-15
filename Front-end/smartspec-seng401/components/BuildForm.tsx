import React from "react";
import SliderInput from "./SliderInput";
import { Separator } from "@/components/ui/separator";
import GamesInput from "./GamesInput";
import RadioInput from "@/components/RadioInput";
import ComponentInput from "./ComponentInput";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useFormBuilderContext } from "@/context/formBuilderContext";

function BuildForm() {
  const { budget, minFps, changeBudget, changeMinFps } =
    useFormBuilderContext();
  return (
    <div className="flex flex-col w-bigCard p-major space-y-medium bg-white border rounded-md border-veryNiceGray">
      <SliderInput
        name="Budget"
        formComponent={budget}
        setFormComponent={changeBudget}
        description="Choose how much you want to spend on this build"
        lowerBound={500}
        upperBound={5000}
        defaultValue={1500}
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
        name="Minimum FPS"
        formComponent={minFps}
        setFormComponent={changeMinFps}
        description="Choose the minimum amount of FPS you can bare"
        lowerBound={30}
        upperBound={500}
        unit="FPS"
        defaultValue={30}
        step={5}
      />
      <Separator />
      <RadioInput
        name="Graphical Quality"
        description="Choose graphical fidelity you like"
        options={["Low", "Medium", "High", "Ultra", "Ray Tracing"]}
        defaultOption="High"
      />
      <Separator />
      <ComponentInput />
      <Separator />
      <Button fullWidth>
        <Zap />
        Get Build
        <Zap />
      </Button>
    </div>
  );
}

export default BuildForm;
