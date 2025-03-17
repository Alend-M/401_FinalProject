import BuildAccordion from "@/components/BuildAccordion";
import BuildSummary from "@/components/BuildSummary";
import { Title } from "@/components/ui/title";
import React from "react";

interface ViewBuildPageProps {
	params: { id: number };
}

const viewBuildPage: React.FC<ViewBuildPageProps> = async ({ params }) => {
	const { id } = await params;
	return (
		<div className="flex flex-col items-center space-y-major">
			<div className="flex flex-col items-center">
				<Title className="text-secondaryColor">{`Build ${id}`}</Title>
			</div>

			<BuildAccordion />
			<BuildSummary />
		</div>
	);
};

export default viewBuildPage;
