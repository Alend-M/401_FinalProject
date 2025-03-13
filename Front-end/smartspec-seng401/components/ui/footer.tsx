import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className=" min-w-max p-medium bg-secondaryColor border-t-[9px] border-primaryColor flex flex-row justify-between">
      <div className="text-white leading-none">
        © SmartSpec. All rights reserved
      </div>
      <div className="flex flex-row justify-end space-x-medium">
        <div className="text-white leading-none">
          Privacy
        </div>
        <div className="text-white leading-none">
          <Link href={'/contact'}>Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
