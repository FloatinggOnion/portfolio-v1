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
                    excerpt,
                    "body": body[0].children[0].text,
                } | order(_createdAt desc)
            `);
            setPosts(response);
        };

        getPosts();
    }, []);

    return { posts }
};

export default usePost;