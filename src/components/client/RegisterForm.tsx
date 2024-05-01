"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { poppins } from "../fonts/poppins";

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Developer");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          userType
        })
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/login");
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
      className={`${poppins.variable} my-4 font-light text-gray-700 bg-background-700 rounded-lg shadow-lg p-8`}
    >
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className={`${poppins.className} block mb-2`}
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={`${poppins.className} bg-background-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700`}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className={`${poppins.className} block mb-2`}>
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={`${poppins.className} bg-background-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700`}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className={`${poppins.className} block mb-2`}>
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${poppins.className} bg-background-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700`}
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
          className={`${poppins.className} bg-background-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700`}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="userType" className={`${poppins.className} block mb-2`}>
          User Type
        </label>
        <select
          id="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className={`${poppins.className} bg-background-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700`}
        >
          <option value="Developer">Developer</option>
          <option value="Client">Client</option>
        </select>
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
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className={`${poppins.className} bg-primary-700 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors`}
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
