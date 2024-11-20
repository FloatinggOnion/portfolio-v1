import React from "react";
import XPTable from "./XPTable";
import useExperience from "@/hooks/useExperience";

type Props = {};

const Experience = (props: Props) => {
	const { xp } = useExperience();
	console.log(xp);
	
	return (
		<div className="h-[60vh] my-6 lg:my-12">
			<h3 className="text-2xl font-bold my-4">Work Experience</h3>
			<XPTable experiences={xp} />
		</div>
	);
};

export default Experience;
