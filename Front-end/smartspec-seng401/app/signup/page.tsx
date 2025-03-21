import ProtectedAuthRoute from "@/components/ProtectedAuthRoute";
import SignUpForm from "@/components/signUpForm";
import { Spinner } from "@heroui/spinner";
import React, { Suspense } from "react";

const SignupPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ProtectedAuthRoute>
        <div className="flex items-center justify-center sm:py-massive py-major w-full bg-offWhite">
          <SignUpForm />
        </div>
      </ProtectedAuthRoute>
    </Suspense>
  );
};

export default SignupPage;
