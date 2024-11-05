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

const Footer = (props: Props) => {
	const pathname = usePathname();

	return (
		<div className="flex flex-col gap-6 my-4">
			<hr className="bg-neutral-600" />
			<div className="flex justify-between">
				<ul className={`flex gap-5`}>
					{links.map(({ href, label }) => (
						<li key={`${href}${label}`}>
							<Link
								href={href}
								className={`text-lg font-semibold hover:text-zinc-600 transition-all duration-200`}
							>
								{label}
							</Link>
						</li>
					))}
				</ul>

				<span className="text-neutral-600 flex gap-2 items-center">
					<p className="text-xl">&copy;</p> &apos;24 Jesse-Paul
					Osemeke. All rights reserved.
				</span>
			</div>
		</div>
	);
};

export default Footer;
