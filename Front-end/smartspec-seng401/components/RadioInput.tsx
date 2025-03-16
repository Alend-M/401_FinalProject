"use client";

import React, { useEffect } from "react";
import { BaseText } from "./ui/baseText";
import { SmallText } from "./ui/smallText";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface RadioInputProps {
  name: string;
  formComponent: string;
  setFormComponent: (option: string) => void;
  description: string;
  options: string[];
  defaultOption: string;
}

function RadioInput({
  name,
  formComponent,
  setFormComponent,
  description,
  options,
  defaultOption,
}: RadioInputProps) {
  useEffect(() => {
    // On Component Mount, set the formComponent to the default option
    setFormComponent(defaultOption);
  }, []);

  function handleOptionChange(option: string) {
    setFormComponent(option);
  }

  return (
    <div className="flex flex-col space-y-tiny">
      <BaseText>{name}</BaseText>
      <SmallText className="text-subheadingGray">{description}</SmallText>
      <RadioGroup
        value={formComponent}
        defaultValue={defaultOption}
        onValueChange={handleOptionChange}
        className="flex flex-row justify-between"
      >
        {options.map((option) => {
          return (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label
                htmlFor={option}
                className="text-base text-secondaryColor font-normal"
              >
                {option}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}

export default RadioInput;
