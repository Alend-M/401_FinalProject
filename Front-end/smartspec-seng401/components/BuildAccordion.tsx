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
import { ComponentResponse } from "@/types";

function parseComponentName(name: string) {
	// Parses component names replacing spaces with + for URL
	return name.replace(/ /g, "+");
}

interface BuildRowProps {
	type: string;
	name: string;
	price: string;
}

function BuildRow({ type, name, price }: BuildRowProps) {
	const freePart = price === "$0";
	const formattedType = type.replace(/_/g, " ");

	return (
		<div className="flex flex-row gap-x-10 md:gap-x-16 lg:justify-between w-full cursor-default">
			<div className="flex flex-col md:flex-row lg:gap-x-8">
				<BaseText className="font-semibold w-24 md:w-32 lg:w-[150px] text-clip md:text-nowrap">
					{formattedType}
				</BaseText>
				<BaseText className="w-28 md:w-60 lg:w-[250px] text-nowrap truncate">
					{name}
				</BaseText>
			</div>
			{freePart ? (
				<BaseText className="w-6 lg:w-[50px] text-nowrap text-primaryColor">
					FREE
				</BaseText>
			) : (
				<BaseText className="w-6 lg:w-[50px] text-nowrap">{price}</BaseText>
			)}

			<Link
				href={`https://www.amazon.ca/s?k=${parseComponentName(name)}`}
				target="_blank"
				className="flex-2 text-wrap lg:text-nowrap w-[100px] text-center lg:w-[150px] lg:text-end"
			>
				<BaseText className="text-primaryColor underline">
					{freePart ? "" : "View Buying Options"}
				</BaseText>
			</Link>
		</div>
	);
}

interface JustificationPayloadProps {
	justification: string;
}

function JustificationPayload({ justification }: JustificationPayloadProps) {
	return (
		<BaseText className="text-subheadingGray p-1">{justification}</BaseText>
	);
}

interface BuildAccordionProps {
	components?: {
		CPUs: ComponentResponse;
		GPUs: ComponentResponse;
		RAM: ComponentResponse;
		Motherboards: ComponentResponse;
		Storage: ComponentResponse;
		Power_Supply: ComponentResponse;
		Case: ComponentResponse;
		Cooling: ComponentResponse;
	};
}

function BuildAccordion({ components }: BuildAccordionProps) {
	const buildData = components;

	// Skip rendering if no data is available
	if (!buildData) {
		return <div>No build data available</div>;
	}

	return (
		<div className="flex flex-col w-screen md:w-full lg:w-bigCard p-2 sm:p-major bg-white border rounded-md border-veryNiceGray">
			<Accordion type="multiple" className="w-full">
				{Object.entries(buildData)
					.filter(
						([category]) =>
							category !== "games" && // Filter out the games array
							category !== "input" // Filter out input metadata
					)
					.map(([category, component]) => {
						// Handle different property structures between contexts
						const componentName = component?.name || "Unknown";
						const componentPrice = component?.price_CAD || "$0";
						const justification =
							component?.Justification || "No information available";

						return (
							<AccordionItem value={category} key={category}>
								<AccordionTrigger className="space-x-minor">
									<BuildRow
										type={category}
										name={componentName}
										price={componentPrice}
									/>
								</AccordionTrigger>
								<AccordionContent>
									<JustificationPayload justification={justification} />
								</AccordionContent>
							</AccordionItem>
						);
					})}
			</Accordion>
		</div>
	);
}

export default BuildAccordion;
