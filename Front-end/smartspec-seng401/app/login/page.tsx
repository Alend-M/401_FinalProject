import React, { Suspense } from "react";
import LoginForm from "@/components/LoginForm";
import ProtectedAuthRoute from "@/components/ProtectedAuthRoute";
import { Spinner } from "@heroui/spinner";

const LoginPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ProtectedAuthRoute>
        <div className="flex items-center justify-center m-14 mb-40 w-full bg-offWhite">
          <LoginForm />
        </div>
      </ProtectedAuthRoute>
    </Suspense>
  );
};

export default LoginPage;
