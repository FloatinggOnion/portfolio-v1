import Link from "next/link";
import React from "react";
import { PiArrowLeft, PiArrowLeftThin } from "react-icons/pi";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import formatDate, { formatDateLong, formatTime } from "@/sanity/lib/formatDate";
import { PortableText, SanityDocument } from "next-sanity";

type Props = {
	params: {
		slug: string;
	};
};

const getImageDimensions = (assetRef: string) => {
	const [, , dimensions] = assetRef.split("-");
	const [width, height] = dimensions.split("x").map(Number);
	return { width, height };
};

const PortableTextComponents = {
	types: {
		image: ({ value }: { value: any }) => {
			if (!value?.asset?._ref) return null;
			const { width, height } = getImageDimensions(value.asset._ref);
			return (
				<figure className="my-8 mx-auto flex max-w-xl flex-col items-center text-center">
					<Image
						src={urlFor(value).width(1200).quality(90).url()}
						width={width}
						height={height}
						alt={value?.alt || ""}
						className="h-auto w-full rounded-lg"
					/>
					{value?.alt && (
						<figcaption className="mt-3 text-center text-xs text-neutral-500">
							{value.alt}
						</figcaption>
					)}
				</figure>
			);
		},
	},
	marks: {
		strong: ({ children }: { children: React.ReactNode }) => (
			<strong>{children}</strong>
		),
		em: ({ children }: { children: React.ReactNode }) => (
			<em>{children}</em>
		),
		highlight: ({ children }: { children: React.ReactNode }) => (
			<span style={{ backgroundColor: "grey" }}>{children}</span>
		),
		underline: ({ children }: { children: React.ReactNode }) => (
			<span style={{ textDecoration: "underline", textDecorationColor: "inherit" }}>
				{children}
			</span>
		),
		strikethrough: ({ children }: { children: React.ReactNode }) => (
			<span style={{ textDecoration: "line-through" }}>{children}</span>
		),
		code: ({ children }: { children: React.ReactNode }) => (
			<code
				style={{
					backgroundColor: "#f4f4f4",
					padding: "2px 4px",
					borderRadius: "4px",
					fontFamily: "monospace",
				}}
			>
				{children}
			</code>
		),
	},
	block: {
		blockquote: ({ children }: { children: React.ReactNode }) => (
			<blockquote
				style={{
					borderLeft: "4px solid #ccc",
					marginLeft: 0,
					paddingLeft: "16px",
					fontStyle: "italic",
					color: "#555",
				}}
			>
				{children}
			</blockquote>
		),
	},
	list: {
		bullet: ({ children }: { children: React.ReactNode }) => (
			<ul className="list-disc list-outside ml-5 space-y-1 my-2">{children}</ul>
		),
		number: ({ children }: { children: React.ReactNode }) => (
			<ol className="list-decimal list-outside ml-5 space-y-1 my-2">{children}</ol>
		),
	},
	listItem: {
		bullet: ({ children }: { children: React.ReactNode }) => (
			<li>{children}</li>
		),
		number: ({ children }: { children: React.ReactNode }) => (
			<li>{children}</li>
		),
	},
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

				{post?.mainImage && (
					<div className="w-full h-[250px] lg:h-[470px] rounded-lg">
						<Image
							src={urlFor(post.mainImage)
								.width(1000)
								.height(800)
								.quality(100)
								.url()}
							width={1000}
							height={800}
							alt="article"
							className="w-full h-full rounded-lg"
						/>
					</div>
				)}

				<div className="space-y-2 my-6">
					{/* title */}
					<h1 className="text-3xl font-bold my-5">{post.title}</h1>

					{/* publish date */}
					<p className="text-sm text-gray-600">
						Published on{" "}
						{formatDateLong(post?.publishedAt)}{", "}
						{formatTime(post?.publishedAt)}
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
					<PortableText
						value={post?.body}
						// @ts-ignore
						components={PortableTextComponents}
					/>
				</div>
			</div>
		);
	}
};

export default Page;
