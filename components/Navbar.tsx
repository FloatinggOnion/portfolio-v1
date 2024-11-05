"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {};

const links = [
	{ href: "/about", label: "About" },
	{ href: "/blog", label: "Blog" },
	{ href: "/projects", label: "Projects" },
];

const Navbar = (props: Props) => {
	const pathname = usePathname();

	return (
		<div className="flex bg-white/35 backdrop-blur-md sticky top-10 gap-6 rounded-full py-1 mx-auto border border-neutral-400 w-fit px-4 items-center z-50">
			<Link href={"/"} className="font-extrabold px-2 bg-black text-white rounded-full">
				JP
			</Link>
			<ul className={`flex gap-5`}>
				{links.map(({ href, label }) => (
					<li key={`${href}${label}`}>
						<Link
							href={href}
							className={`text-lg ${pathname === href ? "text-zinc-900" : "text-neutral-500"} hover:text-zinc-900 transition-all duration-200`}
						>
							{label}
						</Link>
					</li>
				))}
			</ul>

			{/* TODO: Insert switch for light/dark mode here */}
		</div>
	);
};

export default Navbar;
