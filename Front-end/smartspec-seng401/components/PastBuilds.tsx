"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkSession } from "@/utils/supabaseClient";
import axios from "axios";
import BuildCard from "@/components/PastBuildCard";
import { Subtitle } from "@/components/ui/subtitle";
import { Spinner } from "@heroui/spinner";

interface Build {
	build_id: number;
	name: string;
	cpu: string;
	gpu: string;
	ram: string;
	date: string;
	games: string[];
}

const PastBuilds = () => {
	const router = useRouter();
	const [builds, setBuilds] = useState<Build[]>([]);
	const [loading, setLoading] = useState(true);
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		async function checkSessionAndFetchBuilds() {
			setLoading(true);
			const session: { user: { id: string } } | null = await checkSession();

			if (session) {
				const userId = session.user.id; // Use local variable instead of state since state updates are async
				setUserId(userId); // Still update state for other parts of component to use to update UI

				try {
					const postURL = `https://smartspec-backend.vy7t9a9crqmrp.us-west-2.cs.amazonlightsail.com/past_builds/${userId}`;
					const response = await axios.get(postURL);

					const formattedBuilds = response.data.map(
						(item: any, index: number) => {
							const build = item.buildjson;

							return {
								build_id: index + 1,
								name: `Build ${index + 1}`,
								cpu: build.CPUs?.name || "Unknown CPU",
								gpu: build.GPUs?.name || "Unknown GPU",
								ram: build.RAM?.name || "Unknown RAM",
								date: new Date().toISOString().split("T")[0],
								games: build.games || [],
							};
						}
					);

					setBuilds(formattedBuilds);
				} catch (error) {
					console.error("Error fetching builds:", error);
					setBuilds([]);
				}
			}
			setLoading(false);
		}

		checkSessionAndFetchBuilds();
	}, []);

	if (loading) {
		return (
			<Spinner className="flex justify-center items-center mt-10" size="lg" />
		);
	}

	if (!userId) {
		return (
			<Subtitle className="flex justify-center items-center mt-10">
				Please Login before viewing past builds.
			</Subtitle>
		);
	}

	return (
		<div className="flex flex-col gap-y-5 mt-10 mb-10">
			{builds.length === 0 ? (
				<Subtitle>No build history found.</Subtitle>
			) : (
				builds.map((build: Build) => (
					<BuildCard
						build={build}
						key={build.build_id}
						onViewBuild={(id) => router.push(`/builds/${id}`)}
					/>
				))
			)}
		</div>
	);
};

export default PastBuilds;
