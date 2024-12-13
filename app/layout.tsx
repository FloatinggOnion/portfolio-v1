import "./globals.css";
import Theming from "@/components/providers/Theme";
import { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PHProvider } from "./providers";

const fira_code = Fira_Code({ subsets: ["latin"], weight: "400", display: 'swap' })

export const metadata: Metadata = {
	title: "Jesse-Paul Osemeke's Portfolio",
	description:
		"Jesse-Paul Osemeke is an engineer with a passion for building scalable applications.",
};

export default function RootLayout({ children }) {

	return (
		<html lang="en">
			<PHProvider>
				<body className={`${fira_code.className} bg-zinc-50 text-black`}>
					<Theming>
						<div className="bg-white min-h-screen w-full md:w-[70%] rounded-lg mx-auto px-10 py-5">
							<Navbar />
							{children}
							<Footer />
						</div>
					</Theming>
				</body>
			</PHProvider>
		</html>
	);
}
