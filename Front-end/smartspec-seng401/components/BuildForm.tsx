import React from "react";
import SliderInput from "./SliderInput";

function BuildForm() {
  return (
    <div className="flex flex-col w-bigCard p-major space-y-minor bg-white border rounded-md border-veryNiceGray">
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
    </div>
  );
}

export default BuildForm;
