import React from "react";
import { BaseText } from "./ui/baseText";
import { SmallText } from "./ui/smallText";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface RadioInputProps {
  name: string;
  description: string;
  options: string[];
  defaultOption: string;
}

function RadioInput({
  name,
  description,
  options,
  defaultOption,
}: RadioInputProps) {
  return (
    <div className="flex flex-col space-y-tiny">
      <BaseText>{name}</BaseText>
      <SmallText className="text-subheadingGray">{description}</SmallText>
      <RadioGroup
        defaultValue={defaultOption}
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
