"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    PiLinkedinLogo,
    PiGithubLogo,
    PiEnvelope,
    PiFilePdf,
} from "react-icons/pi";
import { Tooltip, Button, Divider, image } from "@nextui-org/react";
// import SmallGallery from "@/components/SmallGallery";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Articles from "@/components/Articles";
import useUser from "@/hooks/useUser";
import useResume from "@/hooks/useResume";
import { urlFor } from "@/sanity/lib/image";
import ResumeModal from "@/components/ResumeModal";

function Page() {
    // const images = [
    // 	{ src: "/me_pic.jpg", alt: "me" },
    // 	{ src: "/stuff.jpg", alt: "me" },
    // 	{ src: "/Me2.jpg", alt: "me" },
    // 	{ src: "/Me.jpg", alt: "me" },
    // ]

    const user = useUser();
    const { resumes } = useResume();
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

    const linkedinUrl = user.user?.socials?.find((s: { platform: string; url: string }) => s.platform === "linkedin")?.url ?? "";
    const githubUrl = user.user?.socials?.find((s: { platform: string; url: string }) => s.platform === "github")?.url ?? "";

    return (
        <div className="">
            {/* hero section */}
            <div className="mt-12 flex flex-col lg:flex-row gap-5">
                <div className="w-full max-w-[400px] h-[200px] mx-auto lg:mx-0">
                    {user.user?.image?.asset ? (
                        <Image
                            src={urlFor(user.user.image).url()}
                            width={400}
                            height={200}
                            alt="image"
                            className="rounded-xl object-cover w-full h-full"
                        />
                    ) : (
                        <div className="w-full h-full rounded-xl border-2 border-dashed border-neutral-400 flex items-center justify-center">
                            <p className="text-neutral-400 text-sm">
                                image goes here
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-4 justify-between lg:w-3/5">
                    <h1 className="text-3xl font-extrabold uppercase border border-dashed border-black rounded-xl px-4">
                        {user.user?.name}
                    </h1>
                    <p className="text-neutral-600 text-wrap text-justify">
                        {user.user?.homepageBio ||
                            "I'm an engineer with a passion for building scalable applications. My interests range from web development to machine learning and even low level software development."}
                    </p>
                    <div className="flex justify-between">
                        <div className="text-3xl flex gap-3 items-center">
                            <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                                <PiLinkedinLogo />
                            </Link>
                            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                                <PiGithubLogo />
                            </Link>
                            <Link href={`mailto:${user.user?.email}`}>
                                <PiEnvelope />
                            </Link>
                        </div>
                        <div className="flex gap-2 items-end">
                            <button
                                onClick={() => setIsResumeModalOpen(true)}
                                className="underline underline-offset-2 text-lg hover:text-neutral-600 transition-all duration-200 cursor-pointer"
                            >
                                My Resume
                            </button>
                            <PiFilePdf className="text-2xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Resume Modal */}
            <ResumeModal
                isOpen={isResumeModalOpen}
                onClose={() => setIsResumeModalOpen(false)}
                resumes={resumes}
            />

            {/* small gallery */}
            {/* <div className="w-full flex justify-center items-center">
				<SmallGallery images={images} />
			</div> */}

            {/* Work experience and projects */}
            <div className="mt-10 flex flex-col lg:flex-row w-full gap-8 lg:gap-24">
                <div className="w-full lg:w-1/2">
                    <Experience />
                </div>
                <div className="w-full lg:w-1/2">
                    <Projects />
                </div>
            </div>

            {/* Articles */}
            <div>
                <Articles />
            </div>
        </div>
    );
}

export default Page;
