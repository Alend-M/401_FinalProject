"use client";

import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import { Textarea } from "./ui/textarea";
import toast, { Toaster } from "react-hot-toast";
import React from "react";
import { Spinner } from "@heroui/spinner";

const DEBUG = 1; // Debug flag

// Defining the Form field rules
const formSchema = z.object({
	name: z
		.string()
		.min(1, "Please enter your name")
		.max(255, "Name must be less than 255 characters")
		.trim(),
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address")
		.max(255, "Email must be less than 255 characters")
		.toLowerCase()
		.trim(),
	surname: z
		.string()
		.min(1, "Please enter your name")
		.max(255, "Name must be less than 255 characters")
		.trim(),
	message: z
		.string()
		.min(1, "Please enter your name")
		.max(10000, "Name must be less than 10000 characters")
		.trim(),
});

const ContactUsForm: React.FC = () => {
	// Defining the Login Form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			surname: "",
			email: "",
			message: "",
		},
	});

	const [loading, setLoading] = React.useState(false);

	// Defining Form Submit Handler
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			const result = await response.json();
			toast.success(result.success || result.error);
		} catch (error) {
			console.error("Error submitting form:", error);
			toast.error("Failed to submit form");
		}
		setLoading(false);
	}

	return (
		<div className="flex flex-col items-center mt-2">
			<div className="flex flex-col bg-white rounded-md p-major space-y-medium w-smallCard">
				{/* Contact Us Form */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-medium"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input type="text" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="surname"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Surname</FormLabel>
										<FormControl>
											<Input type="text" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type="email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Message</FormLabel>
										<FormControl>
											<Textarea className="h-[100px] resize-none" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						{loading ? (
							<div className="flex justify-center">
								<Spinner />
							</div>
						) : (
							<Button fullWidth type="submit">
								Submit
							</Button>
						)}
					</form>
				</Form>
			</div>
			<Toaster />
		</div>
	);
};

export default ContactUsForm;
