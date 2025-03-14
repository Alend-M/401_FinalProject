"use client";

import { Slider } from "@/components/ui/slider";
import React, { useState } from "react";
import { BaseText } from "./ui/baseText";
import { SmallText } from "./ui/smallText";

interface SliderInputProps {
  name: string;
  description: string;
  lowerBound: number;
  upperBound: number;
  defaultValue?: number;
  step?: number;
  unit: string;
  prefix: boolean;
}

function SliderInput({
  name,
  description,
  lowerBound,
  upperBound,
  defaultValue,
  step,
  unit,
  prefix,
}: SliderInputProps) {
  const [sliderValue, setSliderValue] = useState(defaultValue || lowerBound);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
  };

  return (
    <div className="flex flex-col space-y-tiny">
      <BaseText>{name}</BaseText>
      <div className="flex flex-row justify-between">
        <SmallText className="text-subheadingGray">{description}</SmallText>
        <SmallText>
          {prefix ? unit + sliderValue : sliderValue + unit}
        </SmallText>
      </div>
      <Slider
        value={[sliderValue]}
        defaultValue={[defaultValue || lowerBound]}
        min={lowerBound}
        max={upperBound}
        step={step || 10}
        onValueChange={handleSliderChange}
      />
      <SmallText className="text-subheadingGray">
        {prefix
          ? "Range: " + unit + lowerBound + " - " + unit + upperBound
          : "Range: " + lowerBound + unit + " - " + upperBound + unit}
      </SmallText>
    </div>
  );
}

export default SliderInput;
