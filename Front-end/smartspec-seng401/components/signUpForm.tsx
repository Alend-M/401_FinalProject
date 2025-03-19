"use client";

import Link from "next/link";

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
import { GitHub, Google } from "@mui/icons-material";

import { Separator } from "./ui/separator";
import { Title } from "./ui/title";
import toast, { Toaster } from "react-hot-toast";
import { useLoginContext } from "@/context/loginContext";

const DEBUG = 1; // Debug flag

// Defining the Form field rules
const formSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .max(255, "Email must be less than 255 characters")
      .toLowerCase()
      .trim(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters"),
    // #TODO: Uncomment the below for production
    //   .regex(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    //     "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    //   ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

const SignUpForm: React.FC = () => {
  const { signup, loginWithGithub, loginWithGoogle } = useLoginContext();

  // Defining the Sign up Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Defining Sign up Handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.

    if (DEBUG) console.log("Values: ", values);

    const { email, password } = values;
    const { success, error } = await signup(email, password);

    if (!success && error) {
      toast.error(error, {
        style: {
          padding: "16px",
        },
      });
    } else {
      // #TODO: Add shadcn alert for success
      toast.success("Signup Succesful!", {
        style: {
          padding: "16px",
        },
      });
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Title className="text-secondaryColor">Sign up</Title>
      <div className="flex flex-col bg-white rounded-md p-major space-y-medium">
        {/* Alternate Signup Strategies */}
        <div className="flex flex-row space-x-medium">
          <Button variant={"secondary"} onClick={loginWithGithub}>
            <GitHub />
            Sign up with GitHub
          </Button>
          <Button variant={"outlineBlack"} onClick={loginWithGoogle}>
            <Google />
            Sign up with Google
          </Button>
        </div>

        {/* Separator */}
        <div className="flex flex-row items-center space-x-tiny">
          <div className="flex-grow">
            <Separator />
          </div>
          <p className="text-sm text-gray-400">Or sign up with</p>
          <div className="flex-grow">
            <Separator />
          </div>
        </div>

        {/* Email & Password Login Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-medium"
          >
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
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <p className="text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primaryColor">
                Log in
              </Link>
            </p>
            <Button fullWidth type="submit">
              Sign up
            </Button>
          </form>
        </Form>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default SignUpForm;
