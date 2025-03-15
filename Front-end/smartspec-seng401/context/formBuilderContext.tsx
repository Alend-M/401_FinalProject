"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface FormBuilderContextInterface {
  /* We need the following attributes:
    - User's Budget: number
    - List of Users Games: string[]
    - Display resolution: string
    - Minimum fps: number
    - Graphical Quality: string
    - Pre-owned Hardware: list[{ComponentType: string, name: string}]

    Then of course, we'd like the following actions:
    - Submit form: () => {},
    */

  budget: number;
}

const FormBuilderContextDefaultValues: FormBuilderContextInterface = {
  budget: 0,
};

const FormBuilderContext = createContext<FormBuilderContextInterface>(
  FormBuilderContextDefaultValues
);

export function useFormBuilderContext() {
  return useContext(FormBuilderContext);
}

interface Props {
  children: ReactNode;
}

export function FormBuilderProvider({ children }: Props) {
  const [budget, setBudget] = useState<number>(0);
  const value = {
    budget,
  };

  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  );
}
