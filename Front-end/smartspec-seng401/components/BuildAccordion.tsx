"use client";

import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BaseText } from "./ui/baseText";
import Link from "next/link";
import { useBuildResultContext } from "@/context/buildResultContext";

function parseComponentName(name: string) {
  // Parses component names replacing spaces with +
  return name.replace(" ", "+");
}

interface BuildRowProps {
  type: string;
  name: string;
  price: string;
}

function BuildRow({ type, name, price }: BuildRowProps) {
  return (
    <div className="flex flex-row justify-between w-full space-x-massive cursor-default">
      <BaseText className="font-bold w-[100px] text-nowrap">{type}</BaseText>
      <BaseText className="w-[250px] text-nowrap truncate">{name}</BaseText>
      <BaseText className="w-[50px] text-nowrap">{price}</BaseText>
      <Link
        href={`https://www.amazon.ca/s?k=${parseComponentName(name)}`}
        target="_blank"
        className="flex-2 text-nowrap"
      >
        <BaseText className=" text-primaryColor underline">
          View Buying Options
        </BaseText>
      </Link>
    </div>
  );
}

interface JustificationPayloadProps {
  justification: string;
}

function JustificationPayload({ justification }: JustificationPayloadProps) {
  return <BaseText className="text-subheadingGray">{justification}</BaseText>;
}

function BuildAccordion() {
  const { buildResult } = useBuildResultContext();

  return (
    <div className="flex flex-col w-bigCard p-major space-y-medium bg-white border rounded-md border-veryNiceGray">
      <Accordion type="multiple" className="w-full">
        {Object.entries(buildResult)
          .filter(([category]) => category !== "games") // Filter out the games array
          .map(([category, component]) => {
            return (
              <AccordionItem value={category} key={category}>
                <AccordionTrigger className="space-x-minor">
                  <BuildRow
                    type={category}
                    name={component.name}
                    price={component.price_CAD}
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <JustificationPayload
                    justification={component.Justification}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
}

export default BuildAccordion;
