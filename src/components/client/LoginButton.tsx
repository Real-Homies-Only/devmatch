"use client";
import React from "react";
import { useRouter } from "next/navigation";

const LoginButton: React.FC = () => {
  const router = useRouter();

  return (
    <span
      onClick={() => router.push("/login")}
      className="px-4 py-1 mr-2 text-gray-700 border border-gray-700 rounded hover:text-accent-700 hover:border-accent-700 cursor-pointer"
    >
      Login
    </span>
  );
};

export default LoginButton;
