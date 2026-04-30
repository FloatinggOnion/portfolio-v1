import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urlFor } from "@/sanity/lib/image";

interface ArticleProps {
    title: string;
    slug: string;
    author: string;
    mainImage: any;
    categories: string[];
    publishedAt: string;
    excerpt: string;
    body: any;
}

type Props = {
    article: ArticleProps;
};

const ArticleTile = ({ article }: Props) => {
    return (
        <div className="flex items-start hover:bg-neutral-100 px-1 py-3 rounded-md my-4 space-x-0 md:space-x-3">
            <div className="hidden md:block h-24 w-24 rounded-lg flex-shrink-0">
                {article.mainImage?.asset ? (
                    <Image
                        src={urlFor(article.mainImage).url()}
                        width={100}
                        height={100}
                        alt=""
                        className="object-cover h-full w-full rounded-lg"
                    />
                ) : (
                    <div className="w-full h-full rounded-lg border-2 border-dashed border-neutral-400 flex items-center justify-center p-4">
                        <p className="text-neutral-400 text-xs text-center line-clamp-2">
                            {article.title}
                        </p>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2 w-full">
                <Link
                    href={`/blog/${article.slug}`}
                    className="font-semibold hover:underline underline-offset-2 transition-all duration-200"
                >
                    {article.title
                        ? article.title
                        : "20 years: Review, Repentance, Resolutions."}
                </Link>
                <div className="flex gap-2 text-[10px] md:text-xs">
                    {article.categories.map((cat, idx) => (
                        <span
                            className="px-1 bg-neutral-200 rounded-md"
                            key={idx}
                        >
                            {cat}
                        </span>
                    ))}
                </div>
                <p className="text-neutral-600 text-sm">
                    {article.excerpt
                        ? article.excerpt
                        : "A few things I want to get off my chest, now that I&apos;ve turned 20."}
                </p>
                <Link
                    href={`/blog/${article.slug}`}
                    className="underline underline-offset-2 text-sm font-semibold"
                >
                    Read more...
                </Link>
            </div>
        </div>
    );
};

export default ArticleTile;
