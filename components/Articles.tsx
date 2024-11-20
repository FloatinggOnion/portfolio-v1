import Link from "next/link";
import React from "react";
import ArticleTile from "./ArticleTile";
import usePost from "@/hooks/usePost";

type Props = {};

const Articles = (props: Props) => {
	const { posts } = usePost();
	const homePosts = posts?.slice(0, 4);

	return (
		<div>
			{homePosts?.length >= 1 && <h1 className="text-3xl font-bold mb-4">Articles</h1>}
			<div className="flex flex-col lg:w-3/5">
				{homePosts?.map((post, idx) => (
					<ArticleTile key={idx} article={post} />
				))}
			</div>
		</div>
	);
};

export default Articles;
