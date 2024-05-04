"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { poppins } from "../fonts/poppins";

const LoginForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const router = useRouter();

  const LoginFormSchema: ZodType = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
  });
  type LoginForm = z.infer<typeof LoginFormSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(LoginFormSchema) });

  const handleLogin = async (loginData: LoginForm) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        router.back();
      } else {
        setErrorMessage(data.error);
        setErrorStatus(!errorStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className={`${poppins.variable} my-2 font-light text-gray-700 bg-background-700 rounded-lg shadow-lg p-8`}
    >
      <div className="mb-4">
        <label htmlFor="email" className={`${poppins.className} block mb-2`}>
          Email
        </label>
        <input
          type="email"
          id="email"
          className={`${poppins.className} w-full px-3 py-2 border bg-background-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700`}
          required
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-700 mb-2">
            {String(errors.email.message)}
          </span>
        )}
      </div>
      <div className="mb-6">
        <label htmlFor="password" className={`${poppins.className} block mb-2`}>
          Password
        </label>
        <input
          type="password"
          id="password"
          className={`${poppins.className} w-full px-3 py-2 border bg-background-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700`}
          required
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-700 mb-2">
            {String(errors.password.message)}
          </span>
        )}
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
