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
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import { Suspense, useState } from "react";
import { useLoginContext } from "@/context/loginContext";

const DEBUG = 1; // Debug flag

// Defining the Form field rules
const formSchema = z.object({
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
});

const LoginForm: React.FC = () => {
  // Defining the Login Form
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { login, loginWithGithub, loginWithGoogle, changeLoginToastUp } =
    useLoginContext();

  const searchParams = useSearchParams();
  const redirectRoute = searchParams.get("redirect"); // returns 'bar' when ?foo=bar
  const signUpPath = redirectRoute ? "/signup?redirect=results" : "/signup";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Defining Login Handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (DEBUG) console.log("Values: ", values);

    setLoading(true);
    changeLoginToastUp(true);
    const { email, password } = values;
    const { success, error } = await login(email, password);

    if (!success && error) {
      toast.error(error, {
        style: {
          padding: "16px",
          width: "100%",
        },
      });
      setLoading(false);
      return;
    } else {
      // Show success toast
      toast.success("Login Successful!", {
        style: {
          padding: "16px",
        },
      });

      // Disable immediate automatic redirects
      // by using a local navigation flag
      const destination = redirectRoute
        ? `${redirectRoute}/?restore=true`
        : "/";

      setTimeout(() => {
        router.push(destination);
        setLoading(false);
        changeLoginToastUp(false);
      }, 1000);
    }
  }

  return (
    <Suspense>
      <div className="flex flex-col items-center">
        <Title className="text-secondaryColor">Login</Title>
        <div className="flex flex-col bg-white rounded-md p-major space-y-medium">
          {/* Alternate Login Strategies */}
          <div className="flex flex-row space-x-medium">
            <Button variant={"secondary"} onClick={loginWithGithub}>
              <GitHub />
              Log in with GitHub
            </Button>
            <Button variant={"outlineBlack"} onClick={loginWithGoogle}>
              <Google />
              Log in with Google
            </Button>
          </div>

          {/* Separator */}
          <div className="flex flex-row items-center space-x-tiny">
            <div className="flex-grow">
              <Separator />
            </div>
            <p className="text-sm text-gray-400">Or continue with</p>
            <div className="flex-grow">
              <Separator />
            </div>
          </div>

          {/* Email & Password Login Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              // className={`space-y-${kMediumSpacing}`}
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
              <p className="text-sm">
                Don&apos;t have an account?{" "}
                <Link href={signUpPath} className="text-primaryColor">
                  Sign Up
                </Link>
              </p>
              <div className="flex justify-center">
                {loading ? (
                  <Spinner color="primary" />
                ) : (
                  <Button fullWidth type="submit">
                    Log in
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </Suspense>
  );
};

export default LoginForm;
