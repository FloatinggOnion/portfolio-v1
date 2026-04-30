"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { PiCodeThin, PiSmileySadLight } from "react-icons/pi";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import usePost from "@/hooks/usePost";
import { urlFor } from "@/sanity/lib/image";
import ArticleTile from "@/components/ArticleTile";
import { client } from "@/sanity/lib/client";

import { Pagination, Spinner } from "@nextui-org/react";

const Posts = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const { posts, totalCount, isLoading } = usePost(currentPage, pageSize, selectedCategory);
    const [categories, setCategories] = useState<{ title: string; slug: string }[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            const response = await client.fetch(`
                *[_type == "category"]{
                    title,
                    "slug": slug.current
                } | order(title asc)
            `);
            setCategories(response);
        };

        getCategories();
    }, []);

    const totalPages = Math.ceil(totalCount / pageSize);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="">
            <div className="my-12 flex flex-col lg:flex-row justify-between gap-4 lg:gap-0 lg:items-end">
                <div className="flex flex-col lg:w-1/2 gap-3">
                    <h1 className="text-3xl font-bold">My Blog</h1>
                    <p className="text-neutral-600 text-sm">
                        Articles, thoughts, updates on my learnings, and much
                        more
                    </p>
                </div>
                <div className="space-y-1">
                    <h3 className="text-sm font-semibold px-1">
                        Filter by category
                    </h3>
                    <select
                        name="category"
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="bg-transparent border border-black p-1 rounded-md text-black focus:outline-none focus:border-black text-sm w-full"
                    >
                        <option value="all">All Categories</option>
                        {categories?.map((cat, idx) => (
                            <option key={idx} value={cat.slug}>
                                {cat.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <hr className="text-neutral-600" />

            <div className="flex flex-col lg:w-3/5">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Spinner color="default" />
                    </div>
                ) : posts && posts.length > 0 ? (
                    <>
                        {posts.map((post, idx) => (
                            <ArticleTile key={idx} article={post} />
                        ))}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8 mb-12">
                                <Pagination
                                    total={totalPages}
                                    initialPage={1}
                                    page={currentPage}
                                    onChange={(page) => setCurrentPage(page)}
                                    color="default"
                                    size="sm"
                                    variant="flat"
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-neutral-600">
                            No articles found in this category.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Posts;
