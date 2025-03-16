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
			const session = await checkSession();

			if (session) {
				setUserId(session.user.id);
				try {
					const response = await axios.get(
						`https://smartspec-backend.vy7t9a9crqmrp.us-west-2.cs.amazonlightsail.com/past_builds/b51f0f76-e1ec-4a76-ba48-22cf8734739f`
					);

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
								games: [],
							};
						}
					);

					setBuilds(formattedBuilds);
				} catch (error) {
					console.error("Error fetching builds:", error);
					setBuilds([
						{
							build_id: 1,
							name: "Competitive Build",
							cpu: "Intel Core i7-9700K",
							gpu: "GeForce RTX 3060",
							ram: "Corsair Vengeance 16GB DDR5 RAM",
							date: "2025-03-08",
							games: ["valorant", "fortnite", "apex", "cod"],
						},
					]);
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
