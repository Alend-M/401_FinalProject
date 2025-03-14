"use client";

import React, { useState } from "react";
import { BaseText } from "./ui/baseText";
import { SmallText } from "./ui/smallText";
import { Input } from "./ui/input";
import { X, Plus, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define an enum for Component Types
enum ComponentType {
  Motherboard = "Motherboard",
  CPU = "CPU",
  GPU = "GPU",
  // Add other component types as needed
}

function ComponentInput() {
  const defaultPartsList = [
    { type: ComponentType.Motherboard, name: "Corsair Vengeance RGB Pro 32GB" },
    { type: ComponentType.CPU, name: "" },
  ];
  const [preOwnedParts, setPreOwnedParts] = useState(defaultPartsList);
  const [position, setPosition] = React.useState("bottom");

  function handleAddComponent() {
    setPreOwnedParts([...preOwnedParts, { type: ComponentType.CPU, name: "" }]);
  }

  function handleDeleteComponent(index: number) {
    setPreOwnedParts(preOwnedParts.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col space-y-tiny">
      <BaseText>Pre-owned Hardware</BaseText>
      <SmallText className="text-subheadingGray">
        Add the pc components you already own
      </SmallText>
      {preOwnedParts.map((part, i) => {
        return (
          <div
            key={i}
            className="flex flex-row justify-between items-center space-x-minor"
          >
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="flex flex-row justify-start w-full"
              >
                <Button
                  variant="outline"
                  className="flex flex-row justify-between font-normal text-secondaryColor rounded-md hover:border-black"
                >
                  {part.type} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-full"
                style={{ width: "var(--radix-dropdown-trigger-width)" }}
              >
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={part.type}
                  onValueChange={(value) => {
                    const updatedParts = [...preOwnedParts];
                    updatedParts[i].type = value as ComponentType;
                    setPreOwnedParts(updatedParts);
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
            <Input defaultValue={part.name} />
            <div className="w-fit">
              <X size={16} onClick={() => handleDeleteComponent(i)} />
            </div>
          </div>
        );
      })}

      <Button variant={"outline"} onClick={handleAddComponent}>
        <Plus />
        Add Component
      </Button>
    </div>
  );
}

export default ComponentInput;
