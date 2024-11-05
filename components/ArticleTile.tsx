import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const ArticleTile = (props: Props) => {
	return (
		<div className="flex items-start hover:bg-neutral-100 px-1 py-3 rounded-md my-4 space-x-3">
            <div className="h-full w-[50%] rounded-lg">
                <Image src={"/article.png"} width={100} height={100} alt="" className="object-cover h-full w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-2 ">
                <h3 className="font-semibold hover:underline underline-offset-2 transition-all duration-200">
                    20 years: Review, Repentance, Resolutions.
                </h3>
                <div className="flex gap-2">
                    <span className="px-1 bg-neutral-200 rounded-md">Life</span>
                    <span className="px-1 bg-neutral-200 rounded-md">Career</span>
                    <span className="px-1 bg-neutral-200 rounded-md">Study</span>
                </div>
                <p className="text-neutral-600 text-sm">
                    A few things I want to get off my chest, now that I&apos;ve turned 20.
                </p>
                <Link
                    href={"#"}
                    className="underline underline-offset-2 text-sm font-semibold"
                >
                    Read more...
                </Link>
            </div>
        </div>
	);
};

export default ArticleTile;
