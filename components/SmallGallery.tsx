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
			<div className="grid grid-cols-2 lg:grid-cols-4 w-full lg:justify-between my-12 h-[60vh] items-center cursor-default select-none">
				{props.images.map((image, index) => (
					<div
						key={index}
						className={`${index % 2 === 0 ? "-rotate-3" : "rotate-3"} w-[120px] lg:w-[200px] h-[180px] lg:h-[250px] rounded-lg flex items-center justify-center mx-auto`}
					>
						<Image
							src={image.src}
							alt={image.alt}
							width={200}
							height={100}
							className={`${index % 2 === 0 ? "lg:-rotate-3" : "lg:rotate-3"} rounded-lg object-cover w-full h-full self-center`}
						/>
					</div>
				))}
			</div>
	);

};

export default SmallGallery;
