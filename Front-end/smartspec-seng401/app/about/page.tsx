import AboutCard from "@/components/AboutCard";
import NavigationBar from "@/components/NavigationBar";
import { Subtitle } from "@/components/ui/subtitle";
import { Title } from "@/components/ui/title";
import React from "react";

function AboutPage() {
  const devs = [
    { name: "Alex", about: "I am a developer" },
    { name: "Robert", about: "I am a developer" },
    { name: "Caleb", about: "I am a developer" },
    { name: "Lami", about: "I am a developer" },
    { name: "Alend", about: "I am a developer" },
    { name: "Agustin", about: "I am a developer" },
  ];

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-offWhite">
      <div className="flex flex-col items-center">
        <Title className="text-secondaryColor">Meet the Team</Title>
        <Subtitle>Subheading</Subtitle>
      </div>
      <div className="grid grid-cols-3 gap-major">
        {devs.map((dev) => {
          return (
            <AboutCard key={dev.name} devName={dev.name} devAbout={dev.about} />
          );
        })}
      </div>
    </div>
  );
}

export default AboutPage;
