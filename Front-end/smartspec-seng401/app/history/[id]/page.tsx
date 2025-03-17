import React from "react";

interface ViewBuildPageProps {
	params: { id: number };
}

const viewBuildPage: React.FC<ViewBuildPageProps> = ({ params }) => {
	const { id } = params;
	return <div>{`Build #${id}`}</div>;
};

export default viewBuildPage;
