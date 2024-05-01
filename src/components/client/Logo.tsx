"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Logo: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex-1">
      <span
        onClick={() => router.push("/")}
        className="btn btn-ghost btn-sm text-xl text-primary-700"
      >
        DM
      </span>
    </div>
  );
};

export default Logo;
