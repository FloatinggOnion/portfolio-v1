import "./globals.css";
import Theming from "@/components/providers/Theme";
import Dashboard from "@/app/dashboard/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Timilehin Owolabi's Portfolio",
	description: "Robotics Software Engineer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#171717]">
        <Theming>
          {/* <Dashboard /> */}
          {children}
        </Theming>
      </body>
    </html>
  );
}
