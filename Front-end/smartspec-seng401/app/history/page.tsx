import React from "react";
import PastBuilds from "@/components/PastBuilds";
import { Subtitle } from "@/components/ui/subtitle";
import { Title } from "@/components/ui/title";

const BuildHistory = () => {
	return (
		<div>
			<div className="flex flex-col items-center">
				<Title className="text-secondaryColor">Contact Us</Title>
				<Subtitle className="mb-1">
					Do you have a suggestion? Feel free to write us
				</Subtitle>
			</div>
			<PastBuilds />
		</div>
	);
};

export default BuildHistory;
