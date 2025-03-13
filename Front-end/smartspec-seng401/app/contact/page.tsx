import AboutCard from "@/components/AboutCard";
import ContactUsForm from "@/components/ContactUsForm";
import NavigationBar from "@/components/NavigationBar";
import { Subtitle } from "@/components/ui/subtitle";
import { Title } from "@/components/ui/title";
import React from "react";

function ContactUsPage() {
  return (
    <>
      <div className="flex flex-col items-center">
        <Title className="text-secondaryColor">Contact Us</Title>
        <Subtitle>Do you have a suggestion? Feel free to write us</Subtitle>
      </div>
      <ContactUsForm />
    </>
  );
}

export default ContactUsPage;
