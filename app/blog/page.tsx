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

const Posts = () => {
    const { posts } = usePost();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

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

    const filteredPosts =
        selectedCategory === "all"
            ? posts
            : posts?.filter((post) =>
                  post.categories?.includes(selectedCategory)
              );

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
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-transparent border border-black p-1 rounded-md text-black focus:outline-none focus:border-black text-sm w-full"
                    >
                        <option value="all">All Categories</option>
                        {categories?.map((cat, idx) => (
                            <option key={idx} value={cat.title}>
                                {cat.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <hr className="text-neutral-600" />

            <div className="flex flex-col lg:w-3/5">
                {filteredPosts && filteredPosts.length > 0 ? (
                    filteredPosts.map((post, idx) => (
                        <ArticleTile key={idx} article={post} />
                    ))
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
