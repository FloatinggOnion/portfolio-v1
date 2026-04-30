import React from "react";
import Link from "next/link";
import XPTable from "./XPTable";
import ProjectTable from "./ProjectTable";
import useProject from "@/hooks/useProject";

type Props = {};

const Projects = (props: Props) => {
    const { projects, totalCount } = useProject(1, 3);

    // Handle loading state
    if (!projects) {
        return <div>Loading projects...</div>;
    }

    return (
        <div className="h-[70vh] lg:h-[50vh] my-6 lg:my-12">
            <h3 className="text-2xl font-bold my-4">Projects</h3>
            <ProjectTable projects={projects} />
            {totalCount > 3 && (
                <Link
                    href="/projects"
                    className="text-sm text-neutral-600 hover:text-black underline underline-offset-2 transition-all duration-200"
                >
                    see more...
                </Link>
            )}
        </div>
    );
};

export default Projects;
