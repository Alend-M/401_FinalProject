"use client"

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
      <BaseText className="font-bold flex-3 text-nowrap">{type}</BaseText>
      <BaseText className="flex-2 text-nowrap">{name}</BaseText>
      <BaseText className="flex-4 text-nowrap">{price}</BaseText>
      <Link
        href={`https://www.amazon.ca/s?k=${parseComponentName(name)}`}
        target="_blank"
        className="flex-2 text-nowrap"
      >
        <BaseText className="text-primaryColor underline">
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
  const { CPUs } = buildResult;
  return (
    <Accordion type="multiple" className="w-bigCard">
      <AccordionItem value="item-1">
        <AccordionTrigger className="space-x-minor">
          <BuildRow type="CPU" name={CPUs.name} price={CPUs.price_CAD} />
        </AccordionTrigger>
        <AccordionContent>
          <JustificationPayload justification="" />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default BuildAccordion;
