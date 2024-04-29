"use client";
import React from "react";
import { useRouter } from "next/navigation";

const RegisterButton: React.FC = () => {
  const router = useRouter();

  return (
    <span
      onClick={() => router.push("/register")}
      className="px-4 py-1 text-gray-700 bg-secondary-700 rounded hover:bg-accent-700 cursor-pointer"
    >
      Sign Up
    </span>
  );
};

export default RegisterButton;
