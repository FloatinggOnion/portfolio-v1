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
} from "react-icons/pi";
import { Tooltip, Button, Divider } from "@nextui-org/react";
import { motion } from "framer-motion";

function page() {
	return (
		<div className=" ">
			<div className="p-5 fixed bottom-32 flex flex-col items-center justify-center mx-auto w-full ">
				<motion.div
					initial={{ opacity: 0, y: -15 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: {
							duration: 0.5,
							delay: 0.9,
							type: "spring",
							stiffness: 200,
						},
					}}
					className="bg-neutral-600 rounded-full "
				>
					<Image
						height={150}
						width={150}
						className="object-cover w-fit"
						src="/emo.webp"
						alt=""
					/>
				</motion.div>
				<h1 className="font-RubikExtraBold text-6xl text-center my-6 btn-shine">
					Jesse-Paul Osemeke
				</h1>

				<p className="text-neutral-400 lg:max-w-lg text-center font-RubikRegular ">
					I&apos;m an engineer with a passion for building scalable
					applications. My interests range from web development to
					machine learning and even low level software development.
				</p>
			</div>

			<div className=" flex justify-center">
				<div className="fixed bottom-7 flex items-center border border-neutral-600 rounded-lg p-2 gap-x-5 text-neutral-500">
					<Tooltip
						content="About"
						placement="left"
						delay={500}
						className="text-sm text-neutral-400 bg-neutral-700 px-1 rounded-sm font-RubikMedium"
					>
						<Link href={"/about"}>
							<span className="flex gap-2">
								<PiPersonThin className="text-2xl" />
								<p className="underline underline-offset-4 decoration-dashed">About Me</p>
							</span>
						</Link>
					</Tooltip>
					<Tooltip
						content="My Work"
						placement="top"
						delay={500}
						className="text-sm text-neutral-400 bg-neutral-700 px-1 rounded-sm font-RubikMedium"
					>
						<Link href={"/projects"}>
							<span className="flex gap-2">
								<PiToolboxLight className="text-2xl" />
								<p className="underline underline-offset-4 decoration-dashed">My Work</p>
							</span>
						</Link>
					</Tooltip>
					<Tooltip
						content="My Blog"
						placement="top"
						delay={500}
						className="text-sm text-neutral-400 bg-neutral-700 px-1 rounded-sm font-RubikMedium"
					>
						<Link href={"/blog"}>
							<span className="flex gap-2">
								<PiBookOpen className="text-2xl" />
								<p className="underline underline-offset-4 decoration-dashed">My Blog</p>
							</span>
						</Link>
					</Tooltip>
					<Tooltip
						content="GitHub"
						placement="right"
						delay={500}
						className="text-sm text-neutral-400 bg-neutral-700 px-1 rounded-sm font-RubikMedium"
					>
						<Link href={"https://github.com/floatinggonion"} className="bg-neutral-800 p-1 rounded-lg">
							<span>
								<PiGithubLogoLight className="text-2xl" />
							</span>
						</Link>
					</Tooltip>
				</div>
			</div>

			{/* credits */}
			<div className="text-neutral-500 text-xs flex items-center bottom-3 fixed right-0">
				<p>
					Inspired by{" "}
					<span className="inline-flex items-center gap-1">
						<Link
							className="underline"
							href={"https://github.com/Joscriptt"}
						>
							JoScript
						</Link>{" "}
						<PiHeartThin />
					</span>
				</p>
			</div>
		</div>
	);
}

export default page;
