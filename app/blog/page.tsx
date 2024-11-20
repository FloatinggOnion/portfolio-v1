"use client";

import Link from "next/link";
import React from "react";
import { PiCodeThin, PiSmileySadLight } from "react-icons/pi";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import usePost from "@/hooks/usePost";
import { urlFor } from "@/sanity/lib/image";
import Articles from "@/components/Articles";

const Posts = () => {
	const { posts } = usePost();

	return (
		// <motion.div
		// 	initial={{ y: 100, opacity: 0 }}
		// 	animate={{
		// 		y: 0,
		// 		opacity: 1,
		// 		transition: {
		// 			duration: 0.8,
		// 			delay: 0.6,
		// 			type: "spring",
		// 			stiffness: 200,
		// 		},
		// 	}}
		// 	className="w-full lg:w-fit "
		// >
		// 	<div className="  bg-[#1C1C1C] lg:bg-transparent rounded-2xl ">
		// 		<div>
		// 			<div className="flex gap-x-6 p-4">
		// 				<PiCodeThin className="text-6xl text-neutral-50" />

		// 				<div>
		// 					<h1 className="text-2xl font-RubikMedium text-neutral-300">
		// 						Autodidact,{" "}
		// 						<span className="text-sm text-neutral-400">
		// 							A Dev Blog
		// 						</span>
		// 					</h1>
		// 					<p className="max-w-sm text-neutral-400 text-sm">
		// 						I learn about and build slightly complex things,
		// 						and <br /> occasionally I write about them.
		// 					</p>
		// 				</div>
		// 			</div>

		// 			<div className="border border-neutral-700 my-5" />

		// 			<div className="  bg-[#1C1C1C] rounded-lg text-neutral-400">
		// 				{posts ?
		// 					posts.map((post, idx) => (
		// 						<Link href={`/blog/${post.slug}`} key={idx}>
		// 							<div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
		// 								<div className="  flex items-center gap-x-3">
		// 									<Image
		// 										width={1000}
		// 										height={1000}
		// 										className="w-24 h-24 object-cover rounded-md"
		// 										src={
		// 											urlFor(
		// 												post.mainImage
		// 											).url() || "/pic.jpg"
		// 										}
		// 										alt=""
		// 									/>
		// 									<div>
		// 										<span className="text-sm">
		// 											{post.publishedAt.toDateString()}
		// 										</span>
		// 										<h2 className="text-sm font-RubikMedium">
		// 											{post.title}
		// 										</h2>
		// 									</div>
		// 								</div>
		// 							</div>
		// 						</Link>
		// 					))
		//       :
		//       <div className="text-neutral-300 text-center p-4">
		//         <PiSmileySadLight />
		//         <h2 className="text-2xl">Nothing to see here...yet</h2>
		//         <p>Come back soon!</p>
		//       </div>
		//     }

		// 			</div>
		// 		</div>
		// 	</div>
		// </motion.div>

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
						className="border border-neutral-600 p-1 rounded-md text-neutral-600 focus:border-none active:border-none text-sm"
					>
						<option value="ml">Machine Learning</option>
						<option value="robotics">Robotics</option>
						<option value="backend">Backend</option>
					</select>
				</div>
			</div>

			<hr className="text-neutral-600" />

			<Articles />
		</div>
	);
};

export default Posts;
