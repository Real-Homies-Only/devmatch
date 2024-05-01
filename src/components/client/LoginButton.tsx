"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { poppins } from "../fonts/poppins";

const LoginButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/login")}
      className={`${poppins.className} font-light btn btn-xs btn-ghost mr-2 text-gray-700 border 
      border-gray-700 rounded hover:text-accent-700 hover:border-accent-700 
      cursor-pointer`}
    >
      Login
    </button>
  );
};

export default LoginButton;
