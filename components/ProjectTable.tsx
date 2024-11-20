import formatDate from "@/sanity/lib/formatDate";
import Link from "next/link";
import React from "react";

interface projectTableProps {
	title: string;
	githubLink: string;
	liveLink: string;
	role: string;
	startDate: string;
	endDate?: string;
	isOngoing: boolean;
}
type Props = {
	projects: projectTableProps[];
};

const ProjectTable = (props: Props) => {
	return (
		<div className="w-full flex flex-col">
			{props.projects?.map((project, idx) => (
				<div
					key={idx}
					className="w-full flex justify-between items-end my-4 hover:bg-neutral-50 transition-all duration-200 py-3 px-1"
				>
					<div className="w-1/2">
						<Link
							href={
								project.liveLink !== undefined
									? project.liveLink
									: project.githubLink
							}
							className="font-semibold text-lg hover:underline underline-offset-2 transition-all duration-200"
						>
							{project.title}
						</Link>
						<p className="text-neutral-600 text-sm">
							{project.role}
						</p>
					</div>

					<p className="text-neutral-600 text-sm w-1/2 text-end">{`${formatDate(project.startDate)} - ${project.isOngoing ? "present" : formatDate(project.endDate)}`}</p>
				</div>
			))}
		</div>
	);
};

export default ProjectTable;
