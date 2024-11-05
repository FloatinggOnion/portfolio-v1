import Link from "next/link";
import React from "react";
import ArticleTile from "./ArticleTile";

type Props = {};

const Articles = (props: Props) => {
	return (
		<div>
			<div className="flex flex-col lg:w-3/5">
				<ArticleTile />
				<ArticleTile />
				<ArticleTile />
			</div>
		</div>
	);
};

export default Articles;
