"use client";
import React from "react";
import { PiGithubLogoLight } from "react-icons/pi";
import { SiCss3, SiFramer } from "react-icons/si";

import TestimonialTooltip from "@/app/TestimonialTooltip/page";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Right() {
	const pathName = usePathname();

	return (
		<motion.div
			initial={{ y: 10, opacity: 0 }}
			animate={{
				y: 0,
				opacity: 1,
				transition: {
					duration: 0.5,
					delay: 0.9,
					type: "spring",
					stiffness: 200,
				},
			}}
			className="lg:block w-ful lg:w-fit hidden  max-xl:hidden "
		>
			<div className=" md:w-60 w-full rounded-2xl h-fit sticky top-5 ">
				<div>
					<div className="bg-[#1C1C1C] min-w-min rounded-2xl p-4 border border-neutral-800 h-fit">
						<h2 className="font-RubikBold text-neutral-200">
							My Resume
						</h2>
						<p className="text-xs my-3 text-neutral-400 font-RubikRegular">
							Curious about my experiences and skills and would
							like to know more?
						</p>
						<a
							download={true}
							href="OSEMEKE JESSE-PAUL RESUME 24th July, 2024.pdf"
						>
							<button className="bg-[#696969] h-7 p-1 rounded-md text-xs w-full font-RubikMedium text-neutral-50 ">
								Download
							</button>
						</a>

						<div className="border border-neutral-700 my-5" />

						<div className="text-neutral-400">
							<h1 className="font-RubikMedium text-neutral-200">
								{pathName === "/blog" ? (
									<Link href={"/projects"} className="underline underline-offset-2">My Projects</Link>
								) : (
									<Link href={"/blog"} className="underline underline-offset-2">My Blog</Link>
								)}
							</h1>
							<div className="mt-6  bg-[#1C1C1C] rounded-lg text-neutral-400">
								<div className="hover:bg-neutral-800 duration-200 transition-all ease-in rounded-md">
									<div className="flex gap-x-3">
										<div>
											<span className="text-sm">
												July 22, 2023
											</span>
											<h2 className="text-sm font-RubikMedium">
												Smooth Animation with React and
												Framer Motion
											</h2>
										</div>
									</div>
								</div>
								<div className="hover:bg-neutral-800 duration-200 transition-all ease-in py-2 rounded-md">
									<div className="flex gap-x-3">
										<div>
											<span className="text-sm">
												July 22, 2023
											</span>
											<h2 className="text-sm font-RubikMedium">
												Smooth Animation with React and
												Framer Motion
											</h2>
										</div>
									</div>
								</div>
								<div className="hover:bg-neutral-800 duration-200 transition-all ease-in py-2 rounded-md">
									<div className="flex gap-x-3">
										<div>
											<span className="text-sm">
												July 22, 2023
											</span>
											<h2 className="text-sm font-RubikMedium">
												Smooth Animation with React and
												Framer Motion
											</h2>
										</div>
									</div>
								</div>
							</div>

							<div className="border border-neutral-700 my-5" />

							<div className="flex items-center justify-center gap-x-2">
								<TestimonialTooltip />
							</div>
						</div>
					</div>
				</div>

				{/* <div className="bg-[#1C1C1C] min-w-min rounded-2xl p-4 border border-neutral-800 mt-3 text-neutral-50">
          <Image
            width={1000}
            height={1000}
            className="h-32 w-56 object-cover rounded-lg"
            src="/game.jpg"
            alt=""
          />
          <p className="my-3 font-RubikMedium text-sm">3D Games in Reactjs</p>
          <button className="bg-[#696969] h-7 p-1 rounded-md text-xs w-full font-RubikMedium ">
            Get Now @20% OFF
          </button>
        </div> */}
			</div>
		</motion.div>
	);
}

export default Right;
