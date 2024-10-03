"use client";
import React, { useState } from "react";
import {
	PiBookOpenTextLight,
	PiGoogleLogoThin,
	PiTwitterLogoLight,
	PiMagicWandThin,
	PiShapesThin,
	PiHouseLight,
	PiToolboxThin,
} from "react-icons/pi";
import { SiAdobe, SiBox } from "react-icons/si";

import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { LuBox } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { Tooltip } from "@nextui-org/tooltip";

import useUser from "@/hooks/useUser";

function Leftpage() {
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState("");
	const { user } = useUser();

	const controls = useAnimation();

	const pathName = usePathname();

	const handleChange = (e) => {
		setEmail(e.target.value);
	};

	const isValidEmail = (email) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isValidEmail(email)) {
			setEmail("");
		} else {
			controls.start({
				x: 0,
				transition: {
					type: "spring",
					velocity: "600",
					stiffness: "5000",
					damping: 15,
				},
			});
		}
	};

	return (
		<div>
			<motion.div
				initial={{ y: 10, opacity: 0 }}
				animate={{
					y: 0,
					opacity: 1,
					transition: {
						duration: 0.3,
						type: "spring",
						stiffness: 200,
					},
				}}
				className=" hidden md:block bg-[#1C1C1C] w-full md:w-80  h-fit sticky top-5 "
			>
				<div className=" md:w-80 w-full p-3 border border-neutral-800   rounded-2xl h-full bg-[#1C1C1C]  ">
					<div className="flex">
						<div className="w-full relative">
							<Image
								width={1000}
								height={1000}
								className="w-28 h-28 rounded-full object-cover"
								src="/emo.webp"
								alt=""
							/>
							{/* <div
                onClick={() => setOpen(!open)}
                className="bg-lime-400 w-3 h-3 cursor-pointer rounded-full absolute top-20 right-28 animate-pulse"
              />

              {open && (
                <div className="border border-lime-400 h-5 flex items-center justify-center rounded-2xl w-fit px-2 top-[4.7rem] right-3 ">
                  <p className="text-[9px] font-RubikMedium text-lime-300">
                    Open to freelancing
                  </p>
                </div>
              )} */}
							<h1 className="font-RubikExtraBold text-xl  text-neutral-300 mt-3">
								{user ? user.name : "Jesse-Paul Osemeke"}
								{/* { user?.name } */}
							</h1>
							<Link href={"mailto:jesseosems123@gmail.com"}>
								<p className="text-xs font-RubikMedium text-neutral-300 mt-2">
									{user
										? user.email
										: "jesseosems123@gmail.com"}{" "}
									📧
								</p>
							</Link>

							<Link href={"/"}>
								<p className="text-xs font-RubikMedium text-neutral-300 mt-1">
									jesse-paul.me 🌍
								</p>
							</Link>

							{user && (
								<div className="flex w-full">
									<div className="flex gap-x-1 text-xs my-4">
										{user.skills.map((skill, idx) => (
											<p
												key={idx}
												className="bg-[#282828] text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[11px] font-RubikBold"
											>
												{skill}
											</p>
										))}
									</div>
								</div>
							)}
						</div>

						<div className="flex gap-x-1 w-fit h-fit absolute right-2">
							<Tooltip
								content="Home"
								placement="top"
								delay={500}
								className="text-sm text-neutral-400 bg-neutral-700 px-1 rounded-sm font-RubikMedium"
							>
								<Link href={"/"}>
									<div className="bg-neutral-700/50 h-7 w-7 rounded-full flex items-center justify-center">
										<PiHouseLight className="text-neutral-100" />
									</div>
								</Link>
							</Tooltip>

							<div className="bg-neutral-700/50 h-7 w-7 rounded-full flex items-center justify-center">
								{/* {
                  pathName === "/about" ? ( */}
								<Tooltip
									content="My Work"
									placement="top"
									delay={500}
									className="text-sm text-neutral-400 bg-neutral-700 px-1 rounded-sm font-RubikMedium"
								>
									<Link href={"/projects"}>
										<PiToolboxThin className="text-neutral-100" />
									</Link>
								</Tooltip>
								{/* ) : ( */}
								{/* <Link href={"/about"}>
                      <PiBookOpenTextLight className="text-neutral-100" />
                    </Link> */}
								{/* ) */}

								{/* } */}
							</div>
							<div className="bg-neutral-700/50 h-7 w-7 rounded-full flex items-center justify-center">
								<Tooltip
									content="Blog"
									placement="top"
									delay={500}
									className="text-sm text-neutral-400 bg-neutral-700 px-1 rounded-sm font-RubikMedium"
								>
									<Link href={"/about"}>
										<PiBookOpenTextLight className="text-neutral-100" />
									</Link>
								</Tooltip>
							</div>
						</div>
					</div>

					{/* <form
            onSubmit={handleSubmit}
            className="bg-[#282828] p-1  rounded-md md:flex items-center  justify-between h-9 w-full hidden "
          >
            <input
              value={email}
              onChange={handleChange}
              className=" w-36 focus:outline-none bg-transparent text-neutral-400 text-xs placeholder:text-neutral-600 h-full pl-2 placeholder:text-xs placeholder:font-RubikMedium"
              placeholder="name@email.com"
              type="text"
            />
            <motion.button
              animate={controls}
              className="bg-[#696969] h-full p-1 rounded-md text-xs w-20 font-RubikMedium text-neutral-50"
            >
              Subscribe
            </motion.button>
          </form> */}

					<div className="w-full mt-5 text-neutral-300">
						<h2 className="font-RubikBold my-4">Bio</h2>
						<p className="text-[12px]  font-RubikRegular my-3">
							{user
								? <>{user.bio1}<br />{user.bio2}</>
								: `The world of technology has constantly been evolving
							and I have been evolving with it. <br />I enjoy
							learning about new technologies and building
							projects to put these new concepts to practice.{" "}`}
							<br />
							<br />
							Check out{" "}
							<Link
								href={"/projects"}
								className="underline underline-offset-2 hover:text-neutral-400"
							>
								my work
							</Link>
							, or{" "}
							<Link
								href={"/blog"}
								className="underline underline-offset-2 hover:text-neutral-400"
							>
								my blog
							</Link>
							.
						</p>

						{/* <div className="mt-6 flex justify-between text-sm">
							<div className="flex items-center gap-x-1">
								<PiShapesThin />
								<span className="text-xs font-RubikRegular">
									4 Years as a Developer
								</span>
							</div>
							<div className="flex items-center gap-x-1">
								<PiMagicWandThin />
								<span className="text-xs font-RubikRegular">
									24+ Projects
								</span>
							</div>
						</div> */}

						<div className="border border-[#282828] text-neutral-300 my-6" />

						<div className="my-4 ">
							<h1 className="font-RubikRegular">Work History</h1>
							<div className="mt-7 flex  justify-between">
								<div className="flex gap-x-3">
									<LuBox className="text-xl" />
									<div className="-mt-1">
										<h3 className="text-sm font-RubikMedium">
											Backend Intern
										</h3>
										<p className="text-[9px]">
											InvestNaira
										</p>
									</div>
								</div>
								<small className="text-[9px] text-neutral-300">
									March 2024 - Current
								</small>
							</div>
							<div className="my-3 flex  justify-between">
								<div className="flex gap-x-3">
									<LuBox className="text-xl" />
									<div className="-mt-1">
										<h3 className="text-sm font-RubikMedium">
											Frontend Intern
										</h3>
										<p className="text-[9px]">
											FlexiSAF Edusoft Ltd
										</p>
									</div>
								</div>
								<small className="text-[9px] text-neutral-300">
									March 2024 - August 2024
								</small>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}

export default Leftpage;
