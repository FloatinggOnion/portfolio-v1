import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

const useProject = (page: number = 1, pageSize: number = 5) => {
	const [projects, setProjects] = useState<any[] | null>(null);
	const [totalCount, setTotalCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getProjects = async () => {
			setIsLoading(true);
			const start = (page - 1) * pageSize;
			const end = start + pageSize;

			const query = `{
				"projects": *[_type == "project"] | order(coalesce(isOngoing, false) desc, startDate desc) [${start}...${end}] {
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
					isOngoing,
					publishedAt
                },
				"total": count(*[_type == "project"])
			}`;

			const response = await client.fetch(query);
			setProjects(response.projects);
			setTotalCount(response.total);
			setIsLoading(false);
		};

		getProjects();
	}, [page, pageSize]);

	return { projects, totalCount, isLoading };
};

export default useProject;
