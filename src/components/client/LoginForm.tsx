"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { poppins } from "../fonts/poppins";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/");
      } else {
        setErrorMessage(data.error);
        setErrorStatus(!errorStatus);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${poppins.variable} font-light text-gray-700 bg-background-700 rounded-lg shadow-lg p-8`}
    >
      <div className="mb-4">
        <label htmlFor="email" className={`${poppins.className} block mb-2`}>
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${poppins.className} w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700`}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className={`${poppins.className} block mb-2`}>
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${poppins.className} w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700`}
          required
        />
      </div>
      <div className="mb-6">
        {errorStatus ? (
          <span className={`${poppins.className} text-red-700`}>
            {errorMessage}
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className={`${poppins.className} bg-primary-700 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors`}
        >
          Login
        </button>
        <div className={`${poppins.className} text-sm flex flex-col ml-4`}>
          <a href="#" className="text-gray-700 hover:underline">
            Forgot Password
          </a>
          <a href="/register" className="text-gray-700 hover:underline">
            Create an Account
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
