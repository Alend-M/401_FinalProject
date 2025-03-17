"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "./ui/card";
import { BaseText } from "./ui/baseText";
import { useBuildResultContext } from "@/context/buildResultContext";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { redirect, useRouter } from "next/navigation";
import { checkSession } from "@/utils/supabaseClient";

interface SpecificationsProps {
	specifications: string[];
}

function Specifications({ specifications }: SpecificationsProps) {
	return (
		<div>
			<BaseText>Specifications</BaseText>
			{specifications.map((spec) => {
				return (
					<Badge key={spec} variant={"outline"} className="text-secondaryColor">
						{spec}
					</Badge>
				);
			})}
		</div>
	);
}

interface GamesProps {
	gamesList: string[];
}

function Games({ gamesList }: GamesProps) {
	return (
		<div>
			<BaseText>Games</BaseText>
			{gamesList.map((game) => {
				return (
					<Card key={game} className="p-minor w-full">
						{game}
					</Card>
				);
			})}
		</div>
	);
}

function BuildSummary() {
	const {
		gamesList,
		specifications,
		totalPrice,
		discardBuildResult,
		saveBuildResult,
	} = useBuildResultContext();

	const router = useRouter();
	const [loggedIn, setLoggedIn] = React.useState(false);

	function handleDiscardBuild() {
		discardBuildResult();
		// Push user to home page with router
		router.push("/");
	}

	function handleSaveBuild() {
		saveBuildResult().then(() => {
			router.push("/history");
		});
	}

	React.useEffect(() => {
		const fetchSession = async () => {
			const session: { user: { id: string } } | null = await checkSession();
			if (session) {
				setLoggedIn(true);
			}
		};
		fetchSession();
	}, []);

	return (
		<div className="flex flex-col w-bigCard p-major space-y-medium bg-white border rounded-md border-veryNiceGray">
			<div className="flex flex-row justify-between">
				<Specifications specifications={specifications} />
				<Games gamesList={gamesList} />
			</div>
			<Separator />
			<div className="flex flex-row justify-between">
				<BaseText>Total Price: </BaseText>
				<div>{`$${totalPrice}`}</div>
				<Button
					variant={"outline"}
					className="text-danger hover:border-danger"
					onClick={loggedIn ? handleDiscardBuild : () => router.push("/login")}
				>
					Discard Build
				</Button>
				<Button
					variant={"default"}
					onClick={loggedIn ? handleSaveBuild : () => router.push("/login")}
				>
					Save Build
				</Button>
			</div>
		</div>
	);
}

export default BuildSummary;
