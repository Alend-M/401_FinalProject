export interface FormData {
	budget: number;
	minFps: number;
	gamesList: string[];
	displayResolution: string;
	graphicalQuality: string;
	preOwnedHardware: Component[];
}

export interface Component {
	type: string;
	name: string;
}

export interface ComponentResponse {
	name: string;
	price_CAD: string;
	Justification: string;
}

export interface BuildResult {
	CPUs: ComponentResponse;
	GPUs: ComponentResponse;
	RAM: ComponentResponse;
	Motherboards: ComponentResponse;
	Storage: ComponentResponse;
	Power_Supply: ComponentResponse;
	Case: ComponentResponse;
	Cooling: ComponentResponse;
}

export interface BuildData {
	CPUs: ComponentResponse;
	GPUs: ComponentResponse;
	RAM: ComponentResponse;
	Motherboards: ComponentResponse;
	Storage: ComponentResponse;
	Power_Supply: ComponentResponse;
	Case: ComponentResponse;
	Cooling: ComponentResponse;
	input: FormData;
}

export interface Build {
	buildjson: BuildData;
	buildid: string;
}

export interface BuildString {
  build_id: number;
  name: string;
  cpu: string;
  gpu: string;
  ram: string;
  date: string;
  games: string[];
}