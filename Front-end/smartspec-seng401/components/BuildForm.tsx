import React from "react";
import SliderInput from "./SliderInput";
import { Separator } from "@/components/ui/separator";
import GamesInput from "./GamesInput";
import RadioInput from "@/components/RadioInput";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ComponentInput from "./ComponentInput";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";

function BuildForm() {
	return (
		<div className="flex flex-col w-bigCard p-major space-y-medium bg-white border rounded-md border-veryNiceGray">
			<SliderInput
				name="Budget"
				description="Choose how much you want to spend on this build"
				lowerBound={500}
				upperBound={5000}
				defaultValue={1500}
				step={50}
				unit="$"
				prefix
			/>
			<Separator />
			<GamesInput />
			<Separator />
			<RadioInput
				name="Display Resolution"
				description="Choose the resolution that you'd like to play at"
				options={["1080p", "1440p", "4K", "Ultra-wide"]}
				defaultOption="1080p"
			/>
			<Separator />
			<SliderInput
				name="Average FPS"
				description="Choose how much FPS you want in your games"
				lowerBound={30}
				upperBound={500}
				defaultValue={60}
				step={5}
				unit="FPS"
			/>
			<Separator />
			<RadioInput
				name="Graphical Quality"
				description="Choose graphical fidelity you like"
				options={["Low", "Medium", "High", "Ultra", "Ray Tracing"]}
				defaultOption="High"
			/>
			<Separator />
			<div className="flex items-center space-x-2">
				<Switch id="optional-settings" />
				<Label
					htmlFor="optional-settings"
					className="text-base text-secondaryColor font-normal"
				>
					Optional Settings
				</Label>
			</div>
			<Separator />
			<SliderInput
				name="Minimum FPS"
				description="Choose the minimum amount of FPS you can bare"
				lowerBound={30}
				upperBound={500}
				unit="FPS"
				defaultValue={30}
				step={5}
			/>
			<Separator />
			<SliderInput
				name="Maximum FPS"
				description="Choose the maximum amount of FPS you want"
				lowerBound={30}
				upperBound={500}
				unit="FPS"
				defaultValue={145}
				step={5}
			/>
			<Separator />
			<ComponentInput />
			<Separator />
			<Button fullWidth>
				<Zap />
				Get Build
				<Zap />
			</Button>
		</div>
	);
}

export default BuildForm;
