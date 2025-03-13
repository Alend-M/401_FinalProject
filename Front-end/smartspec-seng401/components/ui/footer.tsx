import React from "react";

export default function Footer() {
  return (
    <div>
      <div className="w-[1280px] h-[88px] min-h-[88px] p-6 bg-[#2c2c2c] border-t-[9px] border-[#c16de4] inline-flex justify-between items-center">
        <div className="flex-1 justify-start text-white text-base font-normal font-['Inter'] leading-none">
          © SmartSpec. All rights reserved
        </div>
        <div className="flex justify-start items-center gap-6">
          <div className="justify-start text-white text-base font-normal font-['Inter'] leading-none">
            Privacy
          </div>
          <div className="justify-start text-white text-base font-normal font-['Inter'] leading-none">
            Contact Us
          </div>
        </div>
      </div>
    </div>
  );
}
