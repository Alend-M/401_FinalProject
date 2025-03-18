import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
	try {
		const { name, surname, email, message } = await req.json();

		if (!name || !surname || !email || !message) {
			return NextResponse.json(
				{ error: "All fields are required." },
				{ status: 400 }
			);
		}

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_APP_PASSWORD,
			},
		});

		const mailOptions = {
			from: process.env.EMAIL,
			to: process.env.EMAIL, // Send to your Gmail
			subject: `New Contact Message from ${name} ${surname}`,
			text: `From: ${name} ${surname}\nEmail: ${email}\n\nMessage:\n${message}`,
		};

		await transporter.sendMail(mailOptions);

		return NextResponse.json(
			{ success: "Message sent successfully!" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Message sending error:", error);
		return NextResponse.json(
			{ error: "Failed to send message." },
			{ status: 500 }
		);
	}
}
