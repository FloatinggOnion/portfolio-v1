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
			<div className="grid grid-cols-2 lg:grid-cols-4 w-full justify-center lg:justify-between mx-auto my-12 h-[60vh] items-center cursor-default select-none">
				{props.images.map((image, index) => (
					<div
						key={index}
						className={`${index % 2 === 0 ? "-rotate-3" : "rotate-3"} w-[120px] lg:w-[200px] h-[180px] lg:h-[250px] rounded-lg`}
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
