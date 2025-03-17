import HomePage from "@/components/HomePage";
import { FormBuilderProvider } from "@/context/formBuilderContext";
import React from "react";

function Home() {
  return (
    <FormBuilderProvider>
      <HomePage />
    </FormBuilderProvider>
  );
}

export default Home;
