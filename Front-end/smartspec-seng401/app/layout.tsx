import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/ui/footer";
import HeroNavBar from "@/components/HeroNavBar";

// Using Font from Figma Design
const inter = Inter({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "SmartSpec",
	description: "Your PC Building Pal",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NavigationBar />
				<div className="flex flex-col justify-start items-center px-supermassive bg-offWhite">
					{children}
				</div>
				<Footer />
			</body>
		</html>
	);
}
