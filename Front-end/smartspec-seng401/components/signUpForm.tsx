"use client";

import React, { useState } from "react";
import {
	supabase,
	signInWithGitHub,
	signInWithGoogle,
} from "@/utils/supabaseClient";
import Link from "next/link";

const SignUpForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const signInWithEmail = async (event: React.FormEvent) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		} else {
			const { user, error } = await supabase.auth.signUp({
				email: email,
				password: password,
			});
			if (error) {
				alert(error.message);
			} else {
				alert("Sign up successful");
			}
		}
	};
	return (
		<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
			<h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
			<form onSubmit={signInWithEmail} className="mb-4">
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="email"
					>
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="password"
					>
						Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="password"
						placeholder="******************"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="confirmPassword"
					>
						Confirm Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="confirmPassword"
						type="password"
						placeholder="******************"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<p className="text-center text-gray-600 text-sm">
						Already have an account?{" "}
						<Link href="/login" className="text-blue-500">
							Login
						</Link>
					</p>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Sign Up
					</button>
				</div>
			</form>
			<h1 className="mb-4 font-extrabold">OR</h1>
			<div>
				<button
					onClick={signInWithGoogle}
					className="p-2 bg-blue-500 text-white rounded mr-4"
				>
					Sign in with Google
				</button>
				<button
					onClick={signInWithGitHub}
					className="p-2 bg-gray-800 text-white rounded"
				>
					Sign in with GitHub
				</button>
			</div>
		</div>
	);
};

export default SignUpForm;
