import ProtectedAuthRoute from "@/components/ProtectedAuthRoute";
import SignUpForm from "@/components/signUpForm";
import React, { Suspense } from "react";

const SignupPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedAuthRoute>
        <div className="flex items-center justify-center m-14 mb-20 bg-offWhite">
          <SignUpForm />
        </div>
      </ProtectedAuthRoute>
    </Suspense>
  );
};

export default SignupPage;
