"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
	PiArrowUpRightThin,
	PiGithubLogoThin,
	PiYoutubeLogoThin,
} from "react-icons/pi";
import useProject from "@/hooks/useProject";
import { urlFor } from "@/sanity/lib/image";

type Props = {};

const Projects = (props: Props) => {
	const { projects } = useProject();

	return (
		<div className="space-y-6">
			<div className="flex flex-col my-12">
				<h1 className="text-3xl font-bold mb-4">My Projects</h1>
				<p className="text-sm text-neutral-600">
					My curiosity finds expression in some of the things I build.
				</p>
			</div>

			<hr className="text-neutral-600" />

			<div className="rounded-lg lg:w-4/6">
				{projects &&
					projects.map((project, idx) => (
						<div
							key={idx}
							className="hover:bg-neutral-50 duration-200 transition-all ease-in p-4 group"
						>
							<div className="flex items-center gap-x-3">
								<div className="lg:w-full">
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
										{project.skills.map((skill, idx) => (
											<span
												key={idx}
												className="bg-neutral-100 group-hover:bg-neutral-200 transition-all duration-500 rounded-sm px-1"
											>
												{skill}
											</span>
										))}
									</div>
									<div className="flex gap-3 text-base">
										{project.githubLink && (
											<Link href={project.githubLink}>
												<PiGithubLogoThin />
											</Link>
										)}
										{project.liveLink && (
											<Link href={project.liveLink}>
												<PiArrowUpRightThin />
											</Link>
										)}
										{project.demoLink && (
											<Link href={project.demoLink}>
												<PiYoutubeLogoThin />
											</Link>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Projects;
