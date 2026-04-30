import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

const usePost = (page: number = 1, pageSize: number = 5, category: string = "all") => {
    const [posts, setPosts] = useState<any[] | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            setIsLoading(true);
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            
            const categoryFilter = category !== "all" ? `&& "${category}" in categories[]->slug.current` : "";

            const query = `{
                "posts": *[_type == "post" ${categoryFilter}] | order(publishedAt desc) [${start}...${end}] {
                    title,
                    "slug": slug.current,
                    "author": author->name,
                    mainImage,
                    "categories": categories[]->title,
                    publishedAt,
                    excerpt,
                    "body": body[0].children[0].text,
                },
                "total": count(*[_type == "post" ${categoryFilter}])
            }`;

            const response = await client.fetch(query);
            setPosts(response.posts);
            setTotalCount(response.total);
            setIsLoading(false);
        };

        getPosts();
    }, [page, pageSize, category]);

    return { posts, totalCount, isLoading };
};

export default usePost;
