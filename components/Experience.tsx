import React from "react";
import Link from "next/link";
import XPTable from "./XPTable";
import useExperience from "@/hooks/useExperience";

type Props = {};

const Experience = (props: Props) => {
    const { xp } = useExperience();
    const homeXp = xp?.slice(0, 3);

    // Handle loading state
    if (!xp) {
        return <div>Loading experience...</div>;
    }

    return (
        <div className="h-[50vh] lg:h-[50vh] my-6 lg:my-12">
            <h3 className="text-2xl font-bold my-4">Work Experience</h3>
            <XPTable experiences={homeXp} />
            {xp.length > 3 && (
                <Link
                    href="/about#experience"
                    className="text-sm text-neutral-600 hover:text-black underline underline-offset-2 transition-all duration-200"
                >
                    see more...
                </Link>
            )}
        </div>
    );
};

export default Experience;
