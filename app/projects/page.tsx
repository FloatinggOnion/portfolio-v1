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

import { Pagination, Spinner } from "@nextui-org/react";

const Projects = (props: Props) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 5;
    const { projects, totalCount, isLoading } = useProject(currentPage, pageSize);

    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div className="space-y-6">
            <div className="flex flex-col my-12">
                <h1 className="text-3xl font-bold mb-4">My Projects</h1>
                <p className="text-sm text-neutral-600">
                    My curiosity finds expression in the things I build.
                </p>
            </div>

            <hr className="text-neutral-600" />

            <div className="rounded-lg lg:w-4/6">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Spinner color="default" />
                    </div>
                ) : projects && projects.length > 0 ? (
                    <>
                        {projects.map((project, idx) => (
                            <div
                                key={idx}
                                className="hover:bg-neutral-50 duration-200 transition-all ease-in p-4 group"
                            >
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                    <div className="w-full md:w-32 h-32 flex-shrink-0">
                                        {project.mainImage?.asset ? (
                                            <Image
                                                width={128}
                                                height={128}
                                                className="w-full h-full object-cover rounded-md"
                                                src={urlFor(project.mainImage)
                                                    .url()
                                                    .toString()}
                                                alt=""
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-md border-2 border-dashed border-neutral-400 flex items-center justify-center p-2">
                                                <p className="text-neutral-400 text-[10px] text-center line-clamp-3">
                                                    {project.title}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <div>
                                            <h2 className="text-base font-semibold">
                                                {project.title}
                                            </h2>
                                            <p className="text-xs text-neutral-600">
                                                {project.description}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 text-xs font-bold">
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
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8 mb-12">
                                <Pagination
                                    total={totalPages}
                                    initialPage={1}
                                    page={currentPage}
                                    onChange={(page) => setCurrentPage(page)}
                                    color="default"
                                    size="sm"
                                    variant="flat"
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-neutral-600">No projects found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;
