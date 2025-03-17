import { Title } from "@/components/ui/title";
import React from "react";
import BuildDetailsComponent from "@/components/BuildDetailsComponent";

interface ViewBuildPageProps {
	params: { id: string };
}

const ViewBuildPage: React.FC<ViewBuildPageProps> = async ({ params }) => {
	const { id } = await params;

	return (
		<div className="flex flex-col items-center space-y-major">
			<div className="flex flex-col items-center">
				<Title className="text-secondaryColor">{`Build ${id}`}</Title>
			</div>
			<BuildDetailsComponent buildId={id} />
		</div>
	);
};

export default ViewBuildPage;
