"use client";

// import {
//   supabase,
//   signInWithGitHub,
//   signInWithGoogle,
// } from "@/utils/supabaseClient";
// import Link from "next/link";

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
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { GitHub, Google } from "@mui/icons-material";
import { kMajorPadding, kMajorSpacing, kMediumSpacing } from "@/lib/constants";
import { Separator } from "./ui/separator";

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

const TestForm: React.FC = () => {
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");

  // Defining the Login Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Defining Login Handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // #TODO: Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Values: ", values);
  }

  //   const handleSubmit = async (event: React.FormEvent) => {
  //     event.preventDefault();
  //     const response = await supabase.auth.signInWithPassword({
  //       email: username,
  //       password,
  //     });

  //     // DEBUG
  //     // console.log("Response: ", response);

  //     const { error } = response;
  //     if (error) {
  //       alert(error.message);
  //     } else {
  //       alert("Sign in successful");
  //     }
  //   };

  return (
    <div
      className={`flex flex-col bg-white rounded-md p-${kMajorSpacing} space-y-${kMediumSpacing} p-`}
    >
      {/* Alternate Login Strategies */}
      <div className={`flex flex-row space-x-${kMediumSpacing}`}>
        <Button variant={"secondary"}>
          <GitHub />
          Log in with GitHub
        </Button>
        <Button variant={"outline"}>
          <Google />
          Log in with Google
        </Button>
      </div>

      {/* Separator */}
      <div className="flex flex-row items-center">
        <div className="flex-grow">
          <Separator />
        </div>
        <p className="text-sm text-gray-400">Or continue with</p>
        <div className="flex-grow">
          <Separator />
        </div>
      </div>

      {/* Email & Password Login */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`space-y-${kMediumSpacing}`}
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
            <Link href="/signup" className="text-primaryColor">
              Sign Up
            </Link>
          </p>
          <Button fullWidth type="submit">
            Log in
          </Button>
        </form>
      </Form>
    </div>

    // <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
    //   {" "}
    //   {/*space-y-6*/}
    //   <h2 className="text-7xl mb-6 font-normal text-center">Log In</h2>
    //   <form onSubmit={handleSubmit} className="mb-4">
    //     <div className="mb-4">
    //       <label
    //         htmlFor="username"
    //         className="block text-gray-700 text-sm font-bold mb-2"
    //       >
    //         Username
    //       </label>
    //       <input
    //         type="text"
    //         id="username"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         required
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label
    //         htmlFor="password"
    //         className="block text-gray-700 text-sm font-bold mb-2"
    //       >
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
    //       />
    //       <p className="text-center text-gray-600 text-sm">
    //         Don&apos;t have an account?{" "}
    //         <Link href="/signup" className="text-blue-500">
    //           Sign Up
    //         </Link>
    //       </p>
    //     </div>
    //     <div className="flex items-center justify-between">
    //       <Button type="submit" variant={"default"} fullWidth>
    //         Log in
    //       </Button>
    //     </div>
    //   </form>
    //   <h1 className="mb-4 font-extrabold">OR</h1>
    //   <div>
    //     <button
    //       onClick={signInWithGoogle}
    //       className="p-2 bg-blue-500 text-white rounded mr-4"
    //     >
    //       Sign in with Google
    //     </button>
    //     <button
    //       onClick={signInWithGitHub}
    //       className="p-2 bg-gray-800 text-white rounded"
    //     >
    //       Sign in with GitHub
    //     </button>
    //   </div>
    // </div>
  );
};

export default TestForm;
