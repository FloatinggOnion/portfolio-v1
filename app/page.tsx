"use client";

import Image from "next/image";
import Link from "next/link";
import {
	PiHouseLight,
	PiGithubLogoLight,
	PiToolboxLight,
	PiHeartBreakThin,
	PiHeartThin,
	PiPersonThin,
	PiBookOpen,
	PiLinkedinLogoThin,
	PiGithubLogoThin,
	PiEnvelopeThin,
	PiLinkedinLogo,
	PiGithubLogo,
	PiEnvelope,
	PiLinkedinLogoFill,
	PiGithubLogoFill,
	PiEnvelopeFill,
	PiFilePdfThin,
	PiFilePdf,
	PiFile,
} from "react-icons/pi";
import { Tooltip, Button, Divider, image } from "@nextui-org/react";
import { motion } from "framer-motion";
import SmallGallery from "@/components/SmallGallery";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Articles from "@/components/Articles";

function page() {

	const images = [
		{ src: "/me_pic.jpg", alt: "me" },
		{ src: "/stuff.jpg", alt: "me" },
		{ src: "/game.jpg", alt: "me" },
		{ src: "/me_pic.jpg", alt: "me" },
	]

	return (
		<div className="">
			{/* hero section */}
			<div className="mt-12 flex gap-5">
				<div className="w-[400px] h-[200px]">
					<Image
						src={"/me_pic.jpg"}
						width={100}
						height={50}
						alt="image"
						className="rounded-xl object-cover w-full h-full"
					/>
				</div>
				<div className="flex flex-col gap-4 justify-between w-3/5">
					<h1 className="text-3xl font-extrabold uppercase border border-dashed border-black rounded-xl px-4">
						Jesse-Paul Osemeke
					</h1>
					<p className="text-neutral-600 text-wrap text-justify">
						I&apos;m an engineer with a passion for building
						scalable applications. My interests range from web
						development to machine learning and even low level
						software development.
					</p>
					<div className="flex justify-between">
						<div className="text-3xl flex gap-3 items-center">
							<PiLinkedinLogo />
							<PiGithubLogo />
							<PiEnvelope />
						</div>
						<div className="flex gap-2 items-end cursor-pointer">
							<button className="underline underline-offset-2 text-lg">My Resume</button>
							<PiFilePdf className="text-2xl" />
						</div>
					</div>
				</div>
			</div>

			{/* small gallery */}
			<SmallGallery images={images} />

			{/* Work experience and projects */}
			<div className="flex flex-col lg:flex-row w-full justify-between lg:gap-24">
				<div className="lg:w-1/2">
					<Experience	/>
				</div>
				<div className="lg:w-1/2">
					<Projects />
				</div>
			</div>

			{/* Articles */}
			<div>
				<h1 className="text-3xl font-bold mb-4">Articles</h1>
				<Articles />
			</div>
		</div>
	);
}

export default page;
