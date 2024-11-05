import React from "react";

type Props = {};

const XPTable = (props: Props) => {
	return (
		<div className="w-full flex flex-col">
			<div className="w-full flex justify-between items-end my-4 hover:bg-neutral-50 transition-all duration-200 py-3 px-1">
				<div>
					<h3 className="font-semibold text-lg">Company Name</h3>
					<p className="text-neutral-600">Role at company</p>
				</div>

				<p className="text-neutral-600">2020 - present</p>
			</div>
			<div className="w-full flex justify-between items-end my-4 hover:bg-neutral-50 transition-all duration-200 py-3 px-1">
				<div>
					<h3 className="font-semibold text-lg">Company Name</h3>
					<p className="text-neutral-600">Role at company</p>
				</div>

				<p className="text-neutral-600">2020 - present</p>
			</div>
			<div className="w-full flex justify-between items-end my-4 hover:bg-neutral-50 transition-all duration-200 py-3 px-1">
				<div>
					<h3 className="font-semibold text-lg">Company Name</h3>
					<p className="text-neutral-600">Role at company</p>
				</div>

				<p className="text-neutral-600">2020 - present</p>
			</div>
		</div>
	);
};

export default XPTable;
