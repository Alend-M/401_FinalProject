"use client";

import React from "react";
import { BaseText } from "./ui/baseText";
import { SmallText } from "./ui/smallText";
import { Input } from "./ui/input";
import { X, Plus, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useFormBuilderContext } from "@/context/formBuilderContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define an enum for Component Types - make sure this matches your Component type in the context
export enum ComponentType {
  CPU = "CPU",
  GPU = "GPU",
  RAM = "RAM",
  Storage = "Storage",
  Case = "Case",
  Motherboard = "Motherboard",
  PowerSupply = "Power Supply",
  Cooling = "Cooling",
}

function ComponentInput() {
  // Use context instead of local state
  const {
    preOwnedHardware,
    addToPreOwnedHardware,
    removeFromPreOwnedHardware,
    updatePreOwnedHardware,
  } = useFormBuilderContext();

  function handleAddComponent() {
    addToPreOwnedHardware({ type: ComponentType.CPU, name: "" });
  }

  function handleDeleteComponent(index: number) {
    removeFromPreOwnedHardware(index);
  }

  function handleComponentNameChange(index: number, newName: string) {
    const component = preOwnedHardware[index];
    updatePreOwnedHardware(index, { ...component, name: newName });
  }

  function handleComponentTypeChange(index: number, newType: ComponentType) {
    const component = preOwnedHardware[index];
    updatePreOwnedHardware(index, { ...component, type: newType });
  }

  return (
    <div className="flex flex-col space-y-tiny">
      <BaseText>Pre-owned Hardware</BaseText>
      <SmallText className="text-subheadingGray">
        Add the pc components you already own
      </SmallText>
      <div className="md:space-y-0  space-y-major">
        {preOwnedHardware.map((part, i) => {
          return (
            <div
              key={i}
              className="flex flex-row justify-between md:items-center items-start space-x-minor"
            >
              <div className="flex md:flex-row flex-col w-full justify-between items-center md:space-x-minor">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className="flex flex-row justify-start md:w-56 w-full"
                  >
                    {/* hardcoded widths to match */}
                    <Button
                      variant="outline"
                      className="flex flex-row justify-between font-normal text-secondaryColor rounded-md hover:border-black"
                    >
                      {part.type} <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="md:w-44">
                    {/* hardcoded widths to match */}
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={part.type}
                      onValueChange={(value) => {
                        handleComponentTypeChange(i, value as ComponentType);
                      }}
                    >
                      {Object.values(ComponentType).map((type) => (
                        <DropdownMenuRadioItem key={type} value={type}>
                          {type}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Input
                  className="m-1 w-full"
                  defaultValue={part.name}
                  onChange={(e) => handleComponentNameChange(i, e.target.value)}
                />
              </div>

              <div
                className="flex h-9 w-9 justify-center items-center cursor-pointer border border-veryNiceGray text-danger rounded-md"
                onClick={() => handleDeleteComponent(i)}
              >
                <X size={16} />
              </div>
            </div>
          );
        })}
      </div>

      <Button variant={"outline"} onClick={handleAddComponent}>
        <Plus />
        Add Component
      </Button>
    </div>
  );
}

export default ComponentInput;
