import React from "react";
import XPTable from "./XPTable";

type Props = {};

const Projects = (props: Props) => {
	return (
		<div className="h-[60vh] my-6 lg:my-12">
			<h3 className="text-2xl font-bold my-4">Projects</h3>
			<XPTable />
		</div>
	);
};

export default Projects;
