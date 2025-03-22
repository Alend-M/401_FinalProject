import ContactUsForm from "@/components/ContactUsForm";
import { Subtitle } from "@/components/ui/subtitle";
import { Title } from "@/components/ui/title";
import React from "react";

function ContactUsPage() {
	return (
		<div className="mb-20 flex flex-col items-center justify-center mt-5">
			<div className="w-screen flex flex-col items-center justify-center">
				<Title className="text-secondaryColor">Contact Us</Title>
				<Subtitle className="mb-1 text-center">
					Do you have a suggestion? Feel free to write to us
				</Subtitle>
			</div>
			<ContactUsForm />
		</div>
	);
}

export default ContactUsPage;
