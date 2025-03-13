"use client";

import {
  supabase,
  signInWithGitHub,
  signInWithGoogle,
} from "@/utils/supabaseClient";
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
import { Textarea } from "./ui/textarea";

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

  // Defining Form Submit Handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.

    if (DEBUG) console.log("Values: ", values);

    // const { name, surname, email, message } = values;
    // TODO: Send details to gmail account.
  }

  return (
    <div className="flex flex-col items-center">
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
                      <Textarea
                        className="h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactUsForm;
