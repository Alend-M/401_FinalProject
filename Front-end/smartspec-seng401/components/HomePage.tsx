"use client";

import Hero from "@/components/Hero";
import React from "react";
import BuildForm from "./BuildForm";
import { Subtitle } from "./ui/subtitle";
import { Title } from "./ui/title";
import NavigationBar from "./NavigationBar";

function HomePage() {
  const buildFormRef = React.useRef<HTMLDivElement>(null);

  // Scroll to the build form section
  const scrollToBuildForm = () => {
    if (buildFormRef.current) {
      buildFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="w-screen h-screen">
        <NavigationBar override />
        <Hero onButtonClick={scrollToBuildForm} />
      </div>

      {/* Build Form Section */}
      <div
        ref={buildFormRef}
        className="flex flex-col items-center justify-center pt-10 mb-10"
      >
        <div className="flex flex-col items-center justify-center">
          <Title className="text-secondaryColor">SmartSpec Builder</Title>
          <Subtitle className="mb-1">Tune it to your requirements</Subtitle>
        </div>
        <BuildForm />
      </div>
    </div>
  );
}

export default HomePage;
