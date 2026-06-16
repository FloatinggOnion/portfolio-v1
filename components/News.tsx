import React from "react";
import { PortableText } from "next-sanity";
import useNews from "@/hooks/useNews";
import formatDate from "@/sanity/lib/formatDate";

const PortableTextComponents = {
    marks: {
        link: ({ children, value }: { children: React.ReactNode; value?: { href: string } }) => (
            <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-neutral-600 transition-all duration-200"
            >
                {children}
            </a>
        ),
        strong: ({ children }: { children: React.ReactNode }) => (
            <strong>{children}</strong>
        ),
        em: ({ children }: { children: React.ReactNode }) => (
            <em>{children}</em>
        ),
        code: ({ children }: { children: React.ReactNode }) => (
            <code className="bg-neutral-200 px-1 py-0.5 rounded text-sm">{children}</code>
        ),
    },
    block: {
        normal: ({ children }: { children: React.ReactNode }) => (
            <span>{children}</span>
        ),
    },
    list: ({ children }: { children: React.ReactNode }) => (
        <ul className="list-disc list-inside ml-2">{children}</ul>
    ),
    listItem: ({ children }: { children: React.ReactNode }) => (
        <li>{children}</li>
    ),
};

const News = () => {
    const { news, isLoading } = useNews();

    if (isLoading || news === null) {
        return null;
    }

    if (news.length === 0) {
        return null;
    }

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">News</h2>
            <div className="space-y-2">
                {news.map((item, idx) => (
                    <div key={idx} className="flex gap-2 text-sm text-neutral-600">
                        <span className="font-bold text-neutral-800 whitespace-nowrap tabular-nums">
                            {item.publishedAt ? formatDate(item.publishedAt) : ''}
                            {item.publishedAt ? ':' : ''}
                        </span>
                        <span className="[&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-neutral-900 [&_a]:transition-all [&_a]:duration-200">
                            <PortableText
                                value={item.headline}
                                // @ts-ignore
                                components={PortableTextComponents}
                            />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
