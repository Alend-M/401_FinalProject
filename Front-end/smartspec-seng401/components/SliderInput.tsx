"use client";

import { Slider } from "@/components/ui/slider";
import React, { useEffect } from "react";
import { BaseText } from "./ui/baseText";
import { SmallText } from "./ui/smallText";

interface SliderInputProps {
  name: string;
  formComponent: number;
  setFormComponent: (value: number) => void;
  description: string;
  lowerBound: number;
  upperBound: number;
  defaultValue?: number;
  step?: number;
  unit: string;
  prefix?: boolean;
}

function SliderInput({
  name,
  formComponent,
  setFormComponent,
  description,
  lowerBound,
  upperBound,
  defaultValue,
  step,
  unit,
  prefix = false,
}: SliderInputProps) {
  // const [sliderValue, setSliderValue] = useState(defaultValue || lowerBound);

  useEffect(() => {
    // On component mount, set numerical formComponent to default Value (if available) else lower bound
    setFormComponent(defaultValue || lowerBound);
  }, []);

  const handleSliderChange = (value: number[]) => {
    setFormComponent(value[0]);
  };

  return (
    <div className="flex flex-col space-y-tiny">
      <BaseText>{name}</BaseText>
      <div className="flex flex-row justify-between items-end">
        <SmallText className="text-subheadingGray">{description}</SmallText>
        <BaseText>
          {prefix ? unit + formComponent : formComponent + " " + unit}
        </BaseText>
      </div>
      <Slider
        value={[formComponent]}
        defaultValue={[defaultValue || lowerBound]}
        min={lowerBound}
        max={upperBound}
        step={step || 10}
        onValueChange={handleSliderChange}
      />
      <SmallText className="text-subheadingGray">
        {prefix
          ? "Range: " + unit + lowerBound + " - " + unit + upperBound
          : "Range: " +
            lowerBound +
            " " +
            unit +
            " - " +
            upperBound +
            " " +
            unit}
      </SmallText>
    </div>
  );
}

export default SliderInput;
