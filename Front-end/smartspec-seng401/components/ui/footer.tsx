import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="w-full p-4 md:p-medium bg-secondaryColor border-t-[9px] border-primaryColor flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-4 md:gap-0">
      <div className="text-white leading-none text-center md:text-left">
        © SmartSpec. All rights reserved
      </div>
      <div className="flex flex-row justify-center md:justify-end space-x-4 md:space-x-medium">
        <div className="text-white leading-none">Privacy</div>
        <div className="text-white leading-none">
          <Link href={"/contact"}>Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
