import React, { useState } from "react";
import SliderInput from "./SliderInput";
import { Separator } from "@/components/ui/separator";
import GamesInput from "./GamesInput";
import RadioInput from "@/components/RadioInput";
import ComponentInput from "./ComponentInput";
import { Button } from "./ui/button";
import { Save, Zap } from "lucide-react";
import { useFormBuilderContext } from "@/context/formBuilderContext";
import { useRouter } from "next/navigation";
import { useLoginContext } from "@/context/loginContext";
import { Spinner } from "@heroui/spinner";

function BuildForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    budget,
    minFps,
    displayResolution,
    graphicalQuality,
    changeBudget,
    changeMinFps,
    changeDisplayResolution,
    changeGraphicalQuality,
    submitForm,
    submitFormAndSave,
  } = useFormBuilderContext();

  const { isAuthenticated } = useLoginContext();

  function handleSubmitForm() {
    setLoading(true);
    submitForm().finally(() => {
      router.push("/results");
      setLoading(false);
    });
  }

  function handleSubmitFormAndSave() {
    setLoading(true);
    submitFormAndSave().finally(() => {
      router.push("/history");
      setLoading(false);
    });
  }

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
        formComponent={displayResolution}
        setFormComponent={changeDisplayResolution}
        description="Choose the resolution that you'd like to play at"
        options={["1080p", "1440p", "4K", "Ultra-wide"]}
        defaultOption={displayResolution}
      />
      <Separator />
      <SliderInput
        name="Minimum FPS"
        formComponent={minFps}
        setFormComponent={changeMinFps}
        description="Choose the minimum amount of FPS you can bare"
        lowerBound={30}
        upperBound={240}
        unit="FPS"
        defaultValue={minFps}
        step={5}
      />
      <Separator />
      <RadioInput
        name="Graphical Quality"
        formComponent={graphicalQuality}
        setFormComponent={changeGraphicalQuality}
        description="Choose graphical fidelity you like"
        options={["Low", "Medium", "High", "Ultra", "Ray Tracing"]}
        defaultOption="High"
      />
      <Separator />
      <ComponentInput />
      <Separator />
      {!loading ? (
        <Button onClick={handleSubmitForm} fullWidth>
          <Zap />
          Get Build
          <Zap />
        </Button>
      ) : (
        <Spinner />
      )}
      
      {isAuthenticated && (
        <Button
          onClick={handleSubmitFormAndSave}
          variant="outline"
          className="flex-1"
        >
          <Save />
          Build & Save
        </Button>
      )}
    </div>
  );
}

export default BuildForm;
