import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";


const useResume = () => {
    const [resume, setResume] = useState(null);

    useEffect(() => {
        const getResume = async () => {
            const response = await client.fetch(`
                *[_type == "resume"]{
                    "resume": resume.asset->url
                }[0]
            `);
            setResume(response.resume);
        }

        getResume();
    }, []);

    return { resume };
};

export default useResume;