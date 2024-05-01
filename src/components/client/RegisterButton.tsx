"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { poppins } from "../fonts/poppins";

const RegisterButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/register")}
      className={`${poppins.className} font-light btn btn-xs btn-primary border-none text-gray-700 bg-primary-700 rounded hover:bg-accent-700 cursor-pointer`}
    >
      Sign Up
    </button>
  );
};

export default RegisterButton;
