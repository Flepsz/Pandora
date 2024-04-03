import { Metadata } from "next";
import "./globals.css";
import { sonoma } from "@/font/BRSonoma";
import ScrollTop from "@/components/ScrollTop";
import Provider from "@/redux/provider";
import Setup from "@/components/utils/Setup";

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
		<html lang="en" className="light">
			<body className={`${sonoma.className} bg-zinc-50 dark:bg-[#0a0c0f]`}>
				<Provider>
					<Setup />
					<ScrollTop />
					{children}
				</Provider>
			</body>
		</html>
	);
}
