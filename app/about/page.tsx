"use client";

import React from "react";
import Image from "next/image";
import {
    PiGithubLogo,
    PiInstagramLogo,
    PiLinkedinLogo,
    PiTwitterLogo,
} from "react-icons/pi";
import useUser from "@/hooks/useUser";
import useExperience from "@/hooks/useExperience";
import { PortableText, PortableTextComponents } from "next-sanity";
import Link from "next/link";
import XPTable from "@/components/XPTable";
import { urlFor } from "@/sanity/lib/image";

const aboutMeComponents: PortableTextComponents = {
    marks: {
        strong: ({ children }) => <strong>{children}</strong>,
        em: ({ children }) => <em>{children}</em>,
        underline: ({ children }) => (
            <span style={{ textDecoration: "underline" }}>{children}</span>
        ),
        link: ({ children, value }) => (
            <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-neutral-900 transition-all duration-200"
            >
                {children}
            </a>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc list-outside ml-5 space-y-1 my-2">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal list-outside ml-5 space-y-1 my-2">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => <li>{children}</li>,
        number: ({ children }) => <li>{children}</li>,
    },
};

function About() {
    const { user } = useUser();
    const { xp } = useExperience();

    return (
        <div>
            <div className="flex flex-col lg:flex-row mt-12">
                {/* left column */}
                <div className="flex flex-col gap-6 lg:w-1/2">
                    <div className="h-[350px] w-[250px] rounded-lg rotate-3">
                        {user?.aboutMeImage?.asset ? (
                            <Image
                                src={urlFor(user.aboutMeImage).url()}
                                alt="me"
                                width={250}
                                height={350}
                                className="object-cover h-full w-full rounded-lg"
                            />
                        ) : (
                            <div className="w-full h-full rounded-lg border-2 border-dashed border-neutral-400 flex items-center justify-center">
                                <p className="text-neutral-400 text-sm">
                                    image goes here
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="text-2xl space-y-1">
                        {user?.socials?.map((social, idx) => (
                            <span
                                key={idx}
                                className="flex gap-2 text-neutral-600 hover:text-black transition-all duration-200"
                            >
                                {social.platform === "instagram" && (
                                    <PiInstagramLogo />
                                )}
                                {social.platform === "linkedin" && (
                                    <PiLinkedinLogo />
                                )}
                                {social.platform === "github" && (
                                    <PiGithubLogo />
                                )}
                                {social.platform === "twitter" && (
                                    <PiTwitterLogo />
                                )}
                                <Link
                                    href={social.url}
                                    className="text-base font-semibold"
                                >
                                    {`@${social.url.split("/").pop()}`}
                                </Link>
                            </span>
                        ))}
                    </div>
                </div>

                {/* right column */}
                <div className="lg:w-1/2">
                    <h1 className="text-3xl font-bold my-4">About Me</h1>

                    <div className="leading-loose space-y-4 text-sm text-neutral-600 text-justify">
                        <PortableText value={user?.aboutMe} components={aboutMeComponents} />
                    </div>
                </div>
            </div>

            {/* Experience section */}
            <div id="experience" className="my-12">
                <h1 className="text-3xl font-bold mb-4">Work Experience</h1>
                {xp ? (
                    <XPTable experiences={xp} />
                ) : (
                    <p className="text-neutral-600">Loading experience...</p>
                )}
            </div>

            <hr className="text-neutral-600 my-12" />

            {/* Spotify playlist */}
            <div className="flex flex-col lg:flex-row w-full justify-between my-12">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold lg:w-1/2">
                        Check out some of my playlists
                    </h1>
                    <p className="text-neutral-600">
                        Songs I listen to...somewhat, regularly.
                    </p>
                </div>
                {/* Playlists */}
                <div className="flex flex-col gap-4 lg:w-1/2">
                    {/* Daily Mix 1 */}
                    <iframe
                        className="rounded-lg w-full"
                        src="https://open.spotify.com/embed/playlist/37i9dQZF1E3a9E0mnUvyFH?utm_source=generator&theme=0"
                        width="100%"
                        height="152"
                        frameBorder="0"
                        // allowfullscreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>

                    {/* Daily Mix 2 */}
                    <iframe
                        className="rounded-lg w-full"
                        src="https://open.spotify.com/embed/playlist/37i9dQZF1E38eN0dWfWUDt?utm_source=generator&theme=0"
                        width="40%"
                        height="152"
                        frameBorder="0"
                        // allowfullscreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default About;
