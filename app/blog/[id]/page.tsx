"use client";

import Link from "next/link";
import React from "react";
import { PiArrowLeft, PiArrowLeftThin } from "react-icons/pi";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

function page() {
	return (
		<div className="mt-12">
			{/* back button */}
			<Link
				href={"/blog"}
				className="flex items-center gap-2 my-4 underline underline-offset-2 font-semibold text-neutral-600 hover:text-black transition-all duration-200"
			>
				<PiArrowLeft size={20} /> Back to Blog
			</Link>

			<div className="w-full h-[250px] rounded-lg">
				<Image
					src={"/article.png"}
					width={100}
					height={100}
					alt="article"
					className="object-cover w-full h-full rounded-lg"
				/>
			</div>

			<div className="space-y-2 my-6">
				{/* title */}
				<h1 className="text-3xl font-bold my-5">
					20 years: Review, Repentance, Resolutions.
				</h1>

				{/* publish date */}
				<p className="text-sm text-gray-600">
					Published on 29th October, 2024
				</p>

				{/* category tags */}
				<div className="flex gap-2">
					<span className="px-1 bg-neutral-200 rounded-md">Life</span>
					<span className="px-1 bg-neutral-200 rounded-md">
						Career
					</span>
					<span className="px-1 bg-neutral-200 rounded-md">
						Study
					</span>
				</div>
			</div>

			<hr className="text-neutral-600" />

			<div className="text-justify text-sm text-neutral-700 space-y-8 my-6">
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Iste aspernatur dolorem dolorum possimus. Neque vel ut
					incidunt, tempora quia laborum dignissimos quisquam in
					alias. Tempora quasi illum pariatur. Animi, incidunt rerum?
				</p>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Iste aspernatur dolorem dolorum possimus. Neque vel ut
					incidunt, tempora quia laborum dignissimos quisquam in
					alias. Tempora quasi illum pariatur. Iure minus
					reprehenderit quia dignissimos, amet tenetur natus odio qui
					similique reiciendis vero eos vitae quo soluta deserunt sint
					rerum optio architecto cum quas illo accusantium fugit.
					Recusandae culpa cupiditate magni amet officia perferendis
					voluptates dignissimos, odio excepturi obcaecati
					reprehenderit exercitationem veritatis fugit perspiciatis
					cumque fuga dolor. Ipsum voluptates exercitationem veritatis
					ullam consectetur dignissimos nesciunt obcaecati illum
					debitis, incidunt vel iure accusamus laudantium dolore
					perspiciatis labore, ipsa eligendi amet. Animi, incidunt
					rerum?
				</p>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Iste aspernatur dolorem dolorum possimus. Neque vel ut
					incidunt, tempora quia laborum dignissimos quisquam in
					alias. Tempora quasi illum pariatur.
				</p>
				<p>
					Iure minus reprehenderit quia dignissimos, amet tenetur
					natus odio qui similique reiciendis vero eos vitae quo
					soluta deserunt sint rerum optio architecto cum quas illo
					accusantium fugit. Recusandae culpa cupiditate magni amet
					officia perferendis voluptates dignissimos, odio excepturi
					obcaecati reprehenderit exercitationem veritatis fugit
					perspiciatis cumque fuga dolor. Ipsum voluptates
					exercitationem veritatis ullam consectetur dignissimos
					nesciunt obcaecati illum debitis, incidunt vel iure
					accusamus laudantium dolore perspiciatis labore, ipsa
					eligendi amet. Animi, incidunt rerum?
				</p>
			</div>
		</div>
	);
}

export default page;
