import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

const useProject = () => {
	const [projects, setProjects] = useState(null);

	useEffect(() => {
		const getProjects = async () => {
			const response = await client.fetch(`
                *[_type == "project"]{
                    title,
					description,
					role,
                    "slug": slug.current,
                    "skills": skills[]->title,
					mainImage,
					githubLink,
					liveLink,
					demoLink,
					startDate,
					endDate,
					isOngoing
                } | order(endDate desc)
            `);
			setProjects(response);
		};

		getProjects();
	}, []);

	return { projects };
};

export default useProject;
