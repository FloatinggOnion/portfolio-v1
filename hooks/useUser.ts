import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

const useUser = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const getUser = async () => {
			const response = await client.fetch(`
                *[_type == "author"][0]{
                    name,
                    email,
                    skills,
                    "bio1": bio[0].children[0].text,
					"bio2": bio[1].children[0].text,
					"slug": slug.current,
					"skills": skills[]->title
                }
            `);
			setUser(response);
		};

		getUser();
	}, []);

	return { user };
};

export default useUser;
