import React from "react";
import Image from "next/image";
import { PiArrowUpRightThin, PiGithubLogoThin } from "react-icons/pi";
import Link from "next/link";

type Props = {
    imageUrl: any;
    title: string;
    techStack: string[];
    githubLink: string;
    liveLink: string;
};

const projectCard = (props: Props) => {
	return (
		<div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
			<div className="  flex items-center gap-x-3">
				<Image
					width={1000}
					height={1000}
					className="w-24 md:w-72 h-24 md:32 object-cover rounded-md"
					src={props.imageUrl}
					alt=""
				/>
				<div className="flex flex-col gap-4">
					<h2 className="text-sm font-RubikMedium">
						{props.title}
					</h2>
                    <div className='flex gap-4 text-xs font-bold'>
                        {
                            props.techStack.map((tech, index) => (
                                <span key={index} className='bg-neutral-800 group-hover:bg-neutral-700 transition-all duration-500 rounded-sm px-1'>{tech}</span>
                            ))
                        }
                    </div>
                    <div className='flex gap-3'>
                      <Link href={props.githubLink}>
                          <PiGithubLogoThin />
                      </Link>
                      <Link href={props.liveLink}>
                          <PiArrowUpRightThin />
                      </Link>
                    </div>
				</div>
			</div>
		</div>
	);
};

export default projectCard;
