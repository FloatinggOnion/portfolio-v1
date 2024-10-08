import "./globals.css";
import Theming from "@/components/providers/Theme";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Jesse-Paul Osemeke's Portfolio",
	description:
		"Jesse-Paul Osemeke is an engineer with a passion for building scalable applications.",
};

export default function RootLayout({ children }) {

	return (
		<html lang="en">
			<body className="bg-[#171717]">
				<Theming>
					{children}
				</Theming>
			</body>
		</html>
	);
}
