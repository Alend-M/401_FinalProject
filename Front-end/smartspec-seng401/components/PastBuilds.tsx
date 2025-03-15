"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import axios from "axios";
import BuildCard from "@/components/PastBuildCard";
import { Subtitle } from "@/components/ui/subtitle";

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
	const [loading, setLoading] = useState(false);
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		async function checkSessionAndFetchBuilds() {
			// Check if user is logged in
			const { data } = await supabase.auth.getSession();

			if (!data.session) {
				// Redirect to login if no session

				return;
			}

			// Set user ID from session
			setUserId(data.session.user.id);

			try {
				// Fetch builds for the authenticated user
				// NOTE: You should use your actual API endpoint here
				setLoading(true);
				const response = await axios.get("http://localhost:3001/builds", {
					params: { userId: data.session.user.id },
				});

				setBuilds(response.data);
			} catch (error) {
				console.error("Error fetching builds:", error);
				// If API isn't ready, use sample data
				setBuilds([
					{
						build_id: 1,
						name: "Competitive Build",
						cpu: "Intel Core i7-9700K",
						gpu: "GeForce RTX 3060",
						ram: "Corsair Vengence 16GB DDR5 RAM",
						date: "2025-03-08",
						games: ["valorant", "fortnite", "apex", "cod"],
					},
					{
						build_id: 2,
						name: "Casual Build",
						cpu: "Intel Core i7-9700K",
						gpu: "GeForce RTX 3060",
						ram: "Corsair Vengence 16GB DDR5 RAM",
						date: "2025-03-08",
						games: ["valorant", "fortnite", "apex", "cod"],
					},
					{
						build_id: 3,
						name: "Competitive Build",
						cpu: "Intel Core i7-9700K",
						gpu: "GeForce RTX 3060",
						ram: "Corsair Vengence 16GB DDR5 RAM",
						date: "2025-03-08",
						games: ["valorant", "fortnite", "apex", "cod"],
					},
					{
						build_id: 1,
						name: "Competitive Build",
						cpu: "Intel Core i7-9700K",
						gpu: "GeForce RTX 3060",
						ram: "Corsair Vengence 16GB DDR5 RAM",
						date: "2025-03-08",
						games: ["valorant", "fortnite", "apex", "cod"],
					},
					{
						build_id: 4,
						name: "Competitive Build",
						cpu: "Intel Core i7-9700K",
						gpu: "GeForce RTX 3060",
						ram: "Corsair Vengence 16GB DDR5 RAM",
						date: "2025-03-08",
						games: ["valorant", "fortnite", "apex", "cod"],
					},
				]);
			} finally {
				setLoading(false);
			}
		}

		checkSessionAndFetchBuilds();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center mt-10">
				Loading your builds...
			</div>
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
