import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";


const usePost = () => {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const getPosts = async () => {
            const response = await client.fetch(`
                *[_type == "post"]{
                    title,
                    description,
                    "slug": slug.current,
                    "skills": skills[]->title,
                    mainImage,
                    githubLink,
                    liveLink,
                    demoLink,
                    "bio": bio[0].children[0].text,
                }
            `);
            setPosts(response);
        };

        getPosts();
    }, []);
};

export default usePost;