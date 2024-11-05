import React from "react";
import Image from "next/image";

interface imageProp {
	src: string;
	alt: string;
}

type Props = {
	images: imageProp[];
};

const SmallGallery = (props: Props) => {
	return (
		<div className="flex w-full justify-between mt-9 h-[60vh] items-center cursor-default select-none">
			{props.images.map((image, index) => (
				<div
					key={index}
					className={`${index % 2 === 0 ? "-rotate-3" : "rotate-3"} w-[200px] h-[250px] rounded-lg`}
				>
					<Image
						src={image.src}
						alt={image.alt}
						width={200}
						height={100}
						className={`${index % 2 === 0 ? "-rotate-3" : "rotate-3"} rounded-lg object-cover w-full h-full`}
					/>
				</div>
			))}
		</div>
	);
};

export default SmallGallery;
