import React from "react";
import XPTable from "./XPTable";
import ProjectTable from "./ProjectTable";
import useProject from "@/hooks/useProject";

type Props = {};

const Projects = (props: Props) => {
	const { projects } = useProject();
	return (
		<div className="h-[60vh] my-6 lg:my-12">
			<h3 className="text-2xl font-bold my-4">Projects</h3>
			<ProjectTable projects={projects} />
		</div>
	);
};

export default Projects;
