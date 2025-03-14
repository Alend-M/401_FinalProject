import BuildForm from "@/components/BuildForm";
import { Subtitle } from "@/components/ui/subtitle";
import { Title } from "@/components/ui/title";
import React from "react";

function ContactUsPage() {
    return (
        <div className="m-14 mb-20">
            <div className="flex flex-col items-center">
                <Title className="text-secondaryColor">SmartSpec Builder</Title>
                <Subtitle className="mb-1">
                    Tune it to your requirements
                </Subtitle>
            </div>
            <BuildForm />
        </div>
    );
}

export default ContactUsPage;
