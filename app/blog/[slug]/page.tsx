import Link from "next/link";
import React from "react";
import { PiArrowLeft, PiArrowLeftThin } from "react-icons/pi";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import formatDate from "@/sanity/lib/formatDate";
import { PortableText, SanityDocument } from "next-sanity";

type Props = {
	params: {
		slug: string;
	};
};

const Page = async ({ params: { slug } }: Props) => {
	const BLOG_QUERY = `
		*[_type == "post" && slug.current == "${slug}"][0]{
                    title,
                    "slug": slug.current,
                    "author": author->name,
                    mainImage,
                    "categories": categories[]->title,
                    publishedAt,
                    excerpt,
                    body,
                }
	`;

	const post = await sanityFetch<SanityDocument>({
		query: BLOG_QUERY,
	});
	console.log(post.title);


	if (!post) {
		return (
			<div className="min-h-[100vh] flex flex-col justify-center text-center items-center px-10 gap-6">
				<p className="text-xl">
					Sorry, I can&apos;t find what you&apos;re looking for. Maybe
					try somewhere else?
				</p>
				<Link
					href={"/blog"}
					className="flex items-center gap-2 my-4 underline underline-offset-2 font-semibold text-neutral-600 hover:text-black transition-all duration-200"
				>
					<PiArrowLeft size={20} /> Back to Blog
				</Link>
			</div>
		);
	} else {
		return (
			<div className="mt-12">
				{/* back button */}
				<Link
					href={"/blog"}
					className="flex items-center gap-2 my-4 underline underline-offset-2 font-semibold text-neutral-600 hover:text-black transition-all duration-200"
				>
					<PiArrowLeft size={20} /> Back to Blog
				</Link>

				{post?.mainImage && (<div className="w-full h-[250px] rounded-lg">
					<Image
						src={urlFor(post.mainImage).width(800).height(600).quality(100).url()}
						width={800}
						height={700}
						alt="article"
						objectFit="cover"
						className="w-full h-full rounded-lg"
					/>
				</div>)}

				<div className="space-y-2 my-6">
					{/* title */}
					<h1 className="text-3xl font-bold my-5">{post.title}</h1>

					{/* publish date */}
					<p className="text-sm text-gray-600">
						Published on {new Date(post?.publishedAt).toDateString()}
					</p>

					{/* category tags */}
					<div className="flex gap-2">
						{post?.categories?.map((cat, idx) => (
							<span
								key={idx}
								className="px-1 bg-neutral-200 rounded-md"
							>
								{cat}
							</span>
						))}
					</div>
				</div>

				<hr className="text-neutral-600" />

				<div className="leading-loose space-y-4 text-sm text-neutral-600">
					<PortableText value={post?.body} />
				</div>
			</div>
		);
	}
};

export default Page;
