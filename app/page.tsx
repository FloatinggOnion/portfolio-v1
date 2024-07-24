import Image from "next/image";
import Link from "next/link";
import { PiHouseLight, PiGithubLogoLight } from "react-icons/pi";

function page() {
  return (
    <div className=" ">
      <div className="p-5 fixed bottom-28 flex flex-col items-center justify-center mx-auto   w-full ">
        <div className="bg-neutral-600 rounded-full ">
          <Image
            height={200}
            width={200}
            className="object-cover w-fit"
            src="/emo.webp"
            alt=""
          />
        </div>
        <h1 className="font-RubikExtraBold text-6xl text-center my-9 btn-shine">
          Jesse-Paul Osemeke
        </h1>

        <p className="text-neutral-400 lg:max-w-lg text-center font-RubikRegular ">
          I&apos;m an engineer with a passion for building scalable applications.
          My interests range from web development to machine learning and even low level software development.
        </p>
      </div>

      <div className=" flex justify-center">
        <div className="fixed bottom-7 flex border border-neutral-600 rounded-lg p-2 gap-x-5 text-neutral-500">
          <Link href={"/dashboard"}>
            <span>
              <PiHouseLight className="text-2xl" />
            </span>
          </Link>
          <Link href={'https://github.com/floatinggonion'}>
            <span>
              <PiGithubLogoLight className="text-2xl" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
