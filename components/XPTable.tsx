import React from "react";
import formatDate from "@/sanity/lib/formatDate";

interface XPTableProps {
	companyName: string;
	role: string;
	startDate: string;
	endDate?: string;
	isCurrent: boolean;
}

type Props = {
	experiences: XPTableProps[];
};

const XPTable = (props: Props) => {
	return (
		<div className="w-full flex flex-col">
			{props.experiences?.map((xp, idx) => (
				<div
					key={idx}
					className="w-full flex justify-between items-end my-4 hover:bg-neutral-50 transition-all duration-200 py-3 px-1"
				>
					<div className="w-1/2">
						<h3 className="font-semibold text-lg">
							{xp.companyName}
						</h3>
						<p className="text-neutral-600 text-sm">{xp.role}</p>
					</div>

					<p className="text-neutral-600 text-sm w-1/2 text-end">{`${formatDate(xp.startDate)} - ${xp.isCurrent ? "present" : formatDate(xp.endDate)}`}</p>
				</div>
			))}
		</div>
	);
};

export default XPTable;
