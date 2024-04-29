"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Logo: React.FC = () => {
  const router = useRouter();

  return (
    <span
      onClick={() => router.push("/")}
      className="text-2xl text-primary-700 cursor-pointer"
    >
      DM
    </span>
  );
};

export default Logo;
