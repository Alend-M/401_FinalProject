import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/ui/footer";
import { cn } from "@/lib/utils";
import { BuildResultsProvider } from "@/context/buildResultContext";
import { LoginProvider } from "@/context/loginContext";

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
    <LoginProvider>
      <BuildResultsProvider>
        <html lang="en">
          <body
            className={cn(
              inter.className,
              "flex flex-col justify-start bg-secondaryColor min-h-screen"
            )}
          >
            <NavigationBar />
            <div className="flex flex-col flex-grow justify-start items-center bg-offWhite">
              {children}
            </div>
            <Footer />
          </body>
        </html>
      </BuildResultsProvider>
    </LoginProvider>
  );
}
