import Link from "next/link";
import React from "react";

export default function Footer() {
	return (
		<div className="w-screen max-w-full p-4 bg-secondaryColor border-t-[9px] border-primaryColor">
			<div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start">
				<div className="text-white leading-none mb-4 md:mb-0 text-center md:text-left">
					© SmartSpec. All rights reserved
				</div>
				<div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4 text-center md:text-left md:mr-5">
					<div className="text-white leading-none">Privacy</div>
					<div className="text-white leading-none">
						<Link href={"/contact"}>Contact Us</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
