"use client";

import React from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import {
	PiArrowUpRightThin,
	PiCodeThin,
	PiGithubLogo,
	PiGithubLogoThin,
} from "react-icons/pi";
import { SiGithub } from "react-icons/si";

type Props = {};

const Projects = (props: Props) => {
	return (
		<motion.div
			initial={{ y: 100, opacity: 0 }}
			animate={{
				y: 0,
				opacity: 1,
				transition: {
					duration: 0.8,
					delay: 0.6,
					type: "spring",
					stiffness: 200,
				},
			}}
			className="w-full"
		>
			<div className="  bg-[#1C1C1C] lg:bg-transparent rounded-2xl ">
				<div>
					<div className="flex gap-x-6 p-4">
						<PiCodeThin className="text-6xl text-neutral-50" />

						<div>
							<h1 className="text-2xl font-RubikMedium text-neutral-300">
								My Projects
							</h1>
							<p className="max-w-sm text-neutral-400 text-sm">
								I enjoy reading about really interesting topics,
								and <br /> occasionally I try to implement them.
							</p>
						</div>
					</div>

					<div className="border border-neutral-700 my-5" />

					<div className="  bg-[#1C1C1C] rounded-lg text-neutral-400">
						<div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4 group">
							<div className="  flex items-center gap-x-3">
								<Image
									width={1000}
									height={1000}
									className="w-24 md:w-72 h-24 md:32 object-cover rounded-md"
									src="/pic.jpg"
									alt=""
								/>
								<div className="flex flex-col gap-4">
									{/* <span className="text-sm">March 22, 2024</span> */}
									<h2 className="text-sm font-RubikMedium">
										How To Write Type-Safe CSS Modules
									</h2>
									<div className="flex gap-4 text-xs font-bold">
										<span className="bg-neutral-800 group-hover:bg-neutral-700 transition-all duration-500 rounded-sm px-1">
											React
										</span>
										<span className="bg-neutral-800 group-hover:bg-neutral-700 transition-all duration-500 rounded-sm px-1">
											React
										</span>
										<span className="bg-neutral-800 group-hover:bg-neutral-700 transition-all duration-500 rounded-sm px-1">
											React
										</span>
										<span className="bg-neutral-800 group-hover:bg-neutral-700 transition-all duration-500 rounded-sm px-1">
											React
										</span>
									</div>
									<div className="flex gap-3 text-base">
										<PiGithubLogoThin />
										<PiArrowUpRightThin />
									</div>
								</div>
							</div>
						</div>
						<div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
							<div className="  flex items-center gap-x-3">
								<Image
									height={1000}
									width={1000}
									className="w-24 h-24 object-cover rounded-md"
									src="/game.jpg"
									alt=""
								/>
								<div>
									<span className="text-sm">
										February 12, 2024
									</span>
									<h2 className="text-sm font-RubikMedium">
										Building A RAG Application with React,
										FastAPI and Google Gemini
									</h2>
								</div>
							</div>
						</div>
						<div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
							<div className="  flex items-center gap-x-3">
								<Image
									height={1000}
									width={1000}
									className="w-24 h-24 object-cover rounded-md"
									src="/scult.jpeg"
									alt=""
								/>
								<div>
									<span className="text-sm">
										January 2, 2024
									</span>
									<h2 className="text-sm font-RubikMedium">
										New Years Resolutions: Pixels vs Vectors
									</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Projects;
