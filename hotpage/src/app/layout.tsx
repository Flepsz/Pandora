import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/providers";
import { sonoma } from "@/font/BRSonoma";
import ScrollTop from "@/components/ScrollTop";
import { Suspense } from "react";
import Script from "next/script";


export const metadata: Metadata = {
	title: "Pandora",
	description: "Unlocking Infinite Possibilities",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${sonoma.className} bg-zinc-50 dark:bg-[#0a0c0f]`}>
				<Providers attribute="class" defaultTheme="light" enableSystem>
						<Navbar />
						<ScrollTop />
						{children}
						<Footer />
				</Providers>
			</body>
			<Script src="/nprogress.js" />
		</html>
	);
}
