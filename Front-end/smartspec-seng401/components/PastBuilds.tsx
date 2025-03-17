"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkSession } from "@/utils/supabaseClient";
import axios from "axios";
import BuildCard from "@/components/PastBuildCard";
import { Subtitle } from "@/components/ui/subtitle";
import { Spinner } from "@heroui/spinner";
import { BuildData } from "@/types";

interface fetchedBuild {
	id: string;
	buildjson: BuildData;
	created_at?: string;
}

const PastBuilds = () => {
	const router = useRouter();
	const [builds, setBuilds] = useState<fetchedBuild[]>([]);
	const [loading, setLoading] = useState(true);
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		async function checkSessionAndFetchBuilds() {
			setLoading(true);
			const session: { user: { id: string } } | null = await checkSession();

			if (session) {
				const requestUserId = session.user.id;
				setUserId(requestUserId);

				try {
					const apiUrl = `https://smartspec-backend.vy7t9a9crqmrp.us-west-2.cs.amazonlightsail.com/past_builds/${requestUserId}`;
					const response = await axios.get(apiUrl);
					setBuilds(response.data);
				} catch (error) {
					console.error("Error fetching builds:", error);
					setBuilds([]);
				}
			}
			setLoading(false);
		}

		checkSessionAndFetchBuilds();
	}, []);

	// Format build data for display - computed on demand
	const getFormattedBuild = (build: fetchedBuild, index: number) => {
		const buildData = build.buildjson;
		return {
			build_id: index + 1,
			name: `Build ${index + 1}`,
			cpu: buildData.CPUs?.name || "Unknown CPU",
			gpu: buildData.GPUs?.name || "Unknown GPU",
			ram: buildData.RAM?.name || "Unknown RAM",
			date:
				build.created_at?.split("T")[0] ||
				new Date().toISOString().split("T")[0],
			games: buildData.input.gamesList || [],
		};
	};

	const handleViewBuild = (buildId: number) => {
		localStorage.setItem("selectedBuild", JSON.stringify(builds[buildId]));

		// Navigate to the detail page with the build ID
		router.push(`/history/${buildId + 1}`);
	};

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
		<div className="flex flex-col gap-y-5 mt-5 mb-10 items-center">
			{builds.length === 0 ? (
				<Subtitle>❌ No build history found.</Subtitle>
			) : (
				builds.map((build, index) => (
					<BuildCard
						build={getFormattedBuild(build, index)}
						key={index + 1}
						onViewBuild={() => handleViewBuild(index)}
					/>
				))
			)}
		</div>
	);
};

export default PastBuilds;
