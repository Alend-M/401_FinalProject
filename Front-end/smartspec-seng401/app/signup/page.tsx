import ProtectedAuthRoute from "@/components/ProtectedAuthRoute";
import SignUpForm from "@/components/signUpForm";
import React from 'react';

const SignupPage = () => {
	return (
		<ProtectedAuthRoute>
			<div className="flex items-center justify-center m-14 mb-20 bg-offWhite">
				<SignUpForm />
			</div>
		</ProtectedAuthRoute>
	);
};

export default SignupPage;
