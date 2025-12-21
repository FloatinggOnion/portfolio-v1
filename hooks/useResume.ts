import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

const useResume = () => {
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        const getResumes = async () => {
            const response = await client.fetch(`
                *[_type == "resume"] | order(order asc) {
                    title,
                    type,
                    "url": resume.asset->url
                }
            `);
            setResumes(response);
        };

        getResumes();
    }, []);

    return { resumes };
};

export default useResume;
