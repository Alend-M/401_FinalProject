import React from "react";

function Hero() {
	return (
		<div
			className="absolute inset-0 bg-cover bg-center h-screen w-screen flex text-center justify-center items-center text-white"
			style={{ backgroundImage: "url('/landingpage.jpg')" }}
		>
			<div className="absolute inset-0 bg-cover bg-center h-screen w-screen flex flex-col justify-center items-center bg-black/50 gap-y-5 mb-20">
				<div className="text-9xl">SmartSpec</div>
				<div className="text-4xl">Your PC Building Pal</div>
			</div>
		</div>
	);
}

export default Hero;
