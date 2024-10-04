import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";


const usePost = () => {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const getPosts = async () => {
            const response = await client.fetch(`
                *[_type == "post"]{
                    title,
                    "slug": slug.current,
                    author,
                    mainImage,
                    categories,
                    publishedAt,
                    "body": body[0].children[0].text,
                }
            `);
            setPosts(response);
        };

        getPosts();
    }, []);

    return { posts }
};

export default usePost;