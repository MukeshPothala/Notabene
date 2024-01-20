import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image src={"/logo.svg"} width={32} height={32} alt="logo" />
      <p className="text-xl font-semibold font-serif">Notabene</p>
    </div>
  );
};

export default Logo;
