import { Title } from "@/components/ui/title";
import BuildDetailsComponent from "@/components/BuildDetailsComponent";
import { JSX } from "react";

export default async function ViewBuildPage({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<JSX.Element> {
	const { id } = await params;

	if (!id) {
		return <div>Error: Missing build ID</div>;
	}

	return (
		<div className="flex flex-col items-center space-y-major">
			<Title className="text-secondaryColor">{`Build ${id}`}</Title>
			<BuildDetailsComponent buildId={id} />
		</div>
	);
}
