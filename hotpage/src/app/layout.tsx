import { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { sonoma } from "@/font/BRSonoma";
import ScrollTop from "@/components/ScrollTop";
import { Provider } from "react-redux";
import CustomProvider from "@/redux/provider";

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
				<CustomProvider>
					<ScrollTop />
					{children}
				</CustomProvider>
			</body>
		</html>
	);
}
