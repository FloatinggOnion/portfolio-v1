import React from "react";
import Image from "next/image";

type Props = {};

const blogCard = (props: Props) => {
	return (
		<div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
			<div className="  flex items-center gap-x-3">
				<Image
					width={1000}
					height={1000}
					className="w-24 h-24 object-cover rounded-md"
					src="/pic.jpg"
					alt=""
				/>
				<div>
					<span className="text-sm">March 22, 2024</span>
					<h2 className="text-sm font-RubikMedium">
						How To Write Type-Safe CSS Modules
					</h2>
				</div>
			</div>
		</div>
	);
};

export default blogCard;
