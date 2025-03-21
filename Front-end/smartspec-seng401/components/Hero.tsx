"use client";

import { useLoginContext } from "@/context/loginContext";
import { Button } from "./ui/button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";
import React from "react";
import { Title } from "./ui/title";
import { Subtitle } from "./ui/subtitle";

function Hero({ onButtonClick }: { onButtonClick: () => void }) {
  const Router = useRouter();

  const { isAuthenticated } = useLoginContext();

  return (
    <div
      className="absolute inset-0 bg-cover bg-center h-screen flex justify-center items-center text-white"
      style={{ backgroundImage: "url('/landingpage.jpg')" }}
    >
      <div className="absolute inset-0 h-screen bg-black/50 flex flex-col justify-center items-center gap-y-2 px-4 md:px-0 mb-10 md:mb-20">
        <Title className="text-5xl sm:text-7xl md:text-9xl font-bold text-center">
          SmartSpec
        </Title>
        <Subtitle className="text-xl sm:text-2xl md:text-4xl font-normal text-white text-center">
          Your PC Building Pal
        </Subtitle>

        <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-y-0 sm:gap-x-5 mt-4 md:mt-7 w-full justify-center items-center">
          <Button
            variant="default"
            className="flex items-center gap-x-3 px-2 py-4 md:py-5 rounded-full text-white text-base md:text-lg w-full sm:w-auto"
            onClick={onButtonClick}
          >
            <span className="ml-1">Build a PC</span>
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/30 flex items-center justify-center">
              <ArrowForwardIcon fontSize="small" className="text-white" />
            </div>
          </Button>
          {!isAuthenticated && (
            <Button
              variant={"secondary"}
              className="text-base md:text-lg py-4 md:py-5 w-full sm:w-auto"
              onClick={() => {
                Router.push("/login");
              }}
            >
              Log in
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
