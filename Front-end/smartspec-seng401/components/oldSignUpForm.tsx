"use client";

import React, { useState } from "react";
import {
  supabase,
  signInWithGitHub,
  signInWithGoogle,
} from "@/utils/supabaseClient";
import Link from "next/link";
import { Button } from "./ui/button"; // Assuming Button component exists and is reusable
import { GitHub, Google } from "@mui/icons-material";

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
      const { error } = await supabase.auth.signUp({
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
    <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h2 className="text-7xl mb-6 font-normal text-center">Sign Up</h2>
      <form onSubmit={signInWithEmail} className="mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
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
            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
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
            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
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
          <Button type="submit" variant={"default"} fullWidth>
            Sign Up
          </Button>
        </div>
      </form>
      <div className="flex justify-center mb-4">
        <h1 className="font-extrabold">OR</h1>
      </div>
      <div className="flex justify-center flex-col items-center">
        <button
          onClick={signInWithGoogle}
          className="flex items-center p-2 bg-blue-500 text-white rounded-xl w-3/4 mb-3 hover:bg-blue-600"
        >
          <Google className="mr-8" />
          Continue with Google
        </button>
        <button
          onClick={signInWithGitHub}
          className="flex items-center p-2 bg-gray-800 text-white rounded-xl w-3/4 hover:bg-black"
        >
          <GitHub className="mr-8" />
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
