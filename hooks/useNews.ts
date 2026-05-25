import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

const useNews = () => {
    const [news, setNews] = useState<any[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getNews = async () => {
            setIsLoading(true);
            const response = await client.fetch(`
                *[_type == "newsItem"] | order(publishedAt desc) {
                    headline,
                    publishedAt
                }
            `);
            setNews(response);
            setIsLoading(false);
        };

        getNews();
    }, []);

    return { news, isLoading };
};

export default useNews;
