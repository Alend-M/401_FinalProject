import NavigationBar from "@/components/NavigationBar";
import { Subtitle } from "@/components/ui/subtitle";
import { Title } from "@/components/ui/title";
import React from "react";

function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-offWhite">
      <NavigationBar />
      <div className="flex flex-col items-center">
        <Title className="text-secondaryColor">Meet the Team</Title>
        <Subtitle>Subheading</Subtitle>
      </div>

      <div>Card wrapping</div>
    </div>
  );
}

export default AboutPage;
