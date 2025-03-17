import LoginForm from "@/components/LoginForm";
import ProtectedAuthRoute from "@/components/ProtectedAuthRoute";

const LoginPage = () => {
	return (
		<ProtectedAuthRoute>
			<div className="flex items-center justify-center m-14 mb-40 bg-offWhite">
				<LoginForm />
			</div>
		</ProtectedAuthRoute>
	);
};

export default LoginPage;
