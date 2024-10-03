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
	PiYoutubeLogoThin,
} from "react-icons/pi";
import { SiGithub } from "react-icons/si";
import useProject from "@/hooks/useProject";
import { urlFor } from "@/sanity/lib/image";

type Props = {};

const Projects = (props: Props) => {
	const { projects } = useProject();

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
						{projects &&
							projects.map((project, idx) => (
								<div
									key={idx}
									className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4 group"
								>
									<div className="flex items-center gap-x-3">
										<div className="w-full">
											<Image
												width={1000}
												height={1000}
												className="w-24 md:w-72 h-24 md:32 object-cover rounded-md"
												src={
													urlFor(project?.mainImage)
														.url()
														.toString() || "/pic.jpg"
												}
												alt=""
											/>
										</div>
										<div className="flex flex-col gap-2 w-full">
											<div>
												<h2 className="text-sm font-RubikMedium">
													{project.title}
												</h2>
												<p className="text-xs">
													{project.description}
												</p>
											</div>
											<div className="flex gap-4 text-xs font-bold">
												{project.skills.map(
													(skill, idx) => (
														<span
															key={idx}
															className="bg-neutral-800 group-hover:bg-neutral-700 transition-all duration-500 rounded-sm px-1"
														>
															{skill}
														</span>
													)
												)}
											</div>
											<div className="flex gap-3 text-base">
												{project.githubLink && <Link href={project.githubLink}>
													<PiGithubLogoThin />
												</Link>}
												{project.liveLink && <Link href={project.liveLink}>
													<PiArrowUpRightThin />
												</Link>}
												{project.demoLink && <Link href={project.demoLink}>
													<PiYoutubeLogoThin />
												</Link>}
											</div>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Projects;
