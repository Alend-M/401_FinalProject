import HomePage from "@/components/HomePage";
import { BuildResultsProvider } from "@/context/buildResultContext";
import { FormBuilderProvider } from "@/context/formBuilderContext";
import React from "react";

function Home() {
  return (
    <BuildResultsProvider>
      <FormBuilderProvider>
        <HomePage />
      </FormBuilderProvider>
    </BuildResultsProvider>
  );
}

export default Home;
