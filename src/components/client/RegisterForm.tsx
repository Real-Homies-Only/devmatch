"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { poppins } from "../fonts/poppins";

const RegisterForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const router = useRouter();

  const RegisterFormSchema: ZodType = z
    .object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password should be at least 6 characters"),
      confirmPassword: z
        .string()
        .min(6, "Password should be at least 6 characters"),
      userType: z.enum(["Developer", "Client"])
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"]
    });

  type RegisterForm = z.infer<typeof RegisterFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>({ resolver: zodResolver(RegisterFormSchema) });

  const handleRegister = async (registerData: RegisterForm) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
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
      onSubmit={handleSubmit(handleRegister)}
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
          className={`${poppins.className} bg-background-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700`}
          required
          {...register("firstName")}
        />
        {errors.firstName && (
          <span className="text-red-700 mb-2">
            {String(errors.firstName.message)}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className={`${poppins.className} block mb-2`}>
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          className={`${poppins.className} bg-background-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700`}
          required
          {...register("lastName")}
        />
        {errors.lastName && (
          <span className="text-red-700 mb-2">
            {String(errors.lastName.message)}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className={`${poppins.className} block mb-2`}>
          Email
        </label>
        <input
          type="email"
          id="email"
          className={`${poppins.className} bg-background-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700`}
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
          className={`${poppins.className} bg-background-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700`}
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
        <label htmlFor="password" className={`${poppins.className} block mb-2`}>
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          className={`${poppins.className} bg-background-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700`}
          required
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span className="text-red-700 mb-2">
            {String(errors.confirmPassword.message)}
          </span>
        )}
      </div>
      <div className="mb-6">
        <label htmlFor="userType" className={`${poppins.className} block mb-2`}>
          User Type
        </label>
        <select
          id="userType"
          className={`${poppins.className} bg-background-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700`}
          {...register("userType")}
        >
          <option value="Developer">Developer</option>
          <option value="Client">Client</option>
        </select>
        {errors.userType && (
          <span className="text-red-700 mb-2">
            {String(errors.userType.message)}
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
