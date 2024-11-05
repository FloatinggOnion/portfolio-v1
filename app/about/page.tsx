import React from "react";
import Image from "next/image";
import { PiGithubLogo, PiInstagramLogo, PiLinkedinLogo } from "react-icons/pi";

function About() {
	return (
		<div>
			<div className="flex flex-col lg:flex-row mt-12">
				{/* left column */}
				<div className="flex flex-col gap-6 lg:w-1/2">
					<div className="h-[350px] w-[250px] rounded-lg rotate-3">
						<Image
							src={"/about_me.jpg"}
							alt="me"
							width={200}
							height={200}
							className="object-cover h-full w-full rounded-lg"
						/>
					</div>
					<div className="text-2xl space-y-1">
						<span className="flex gap-2 text-neutral-600 hover:text-black transition-all duration-200">
							<PiInstagramLogo />
							<p className="text-base font-semibold">
								@floatinggonion
							</p>
						</span>
						<span className="flex gap-2 text-neutral-600 hover:text-black transition-all duration-200">
							<PiLinkedinLogo />
							<p className="text-base font-semibold">
								@jesse-paul_osemeke
							</p>
						</span>
						<span className="flex gap-2 text-neutral-600 hover:text-black transition-all duration-200">
							<PiGithubLogo />
							<p className="text-base font-semibold">
								@FloatinggOnion
							</p>
						</span>
					</div>
				</div>

				{/* right column */}
				<div className="lg:w-1/2">
					<h1 className="text-3xl font-bold my-4">About Me</h1>

					<div className="leading-loose space-y-4">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Voluptas quia aperiam, debitis, quis veniam
							vitae nostrum tempore error nesciunt libero enim sit
							beatae sunt dicta, sequi sapiente. Cupiditate,
							rerum? Eligendi.
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Voluptas quia aperiam, debitis, quis veniam
							vitae nostrum tempore error nesciunt libero enim sit
							beatae sunt dicta, sequi sapiente. Cupiditate,
							rerum? Eligendi.
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Voluptas quia aperiam, debitis, quis veniam
							vitae nostrum tempore error nesciunt libero enim sit
							beatae sunt dicta, sequi sapiente. Cupiditate,
							rerum? Eligendi.
						</p>
					</div>
				</div>
			</div>

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

          {/* Orchestras and Such */}
					{/* <iframe
						className="rounded-lg w-full"
						src="https://open.spotify.com/embed/playlist/4OAZl0BME7hoknseMqH2JN?utm_source=generator&theme=0"
						width="40%"
						height="152"
						frameBorder="0"
						// allowfullscreen=""
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy"
					></iframe> */}

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
