import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";


const useExperience = () => {
    const [xp, setXp] = useState(null);

    useEffect(() => {
        const getExperience = async () => {
            const response = await client.fetch(`
                *[_type == "experience"]{
                    companyName,
                    role,
                    startDate,
                    endDate,
                    isCurrent
                } | order(endDate desc)
            `);
            
            setXp(response);
        }

        getExperience();
    }, []);

    return { xp };
};

export default useExperience;