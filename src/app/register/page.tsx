import React from "react";
import { poppins } from "@/components/fonts/poppins";
import RegisterForm from "@/components/client/RegisterForm";

const Register: React.FC = () => {
  return (
    <div
      className={`${poppins.variable} flex items-center justify-center min-h-screen bg-background-700`}
    >
      <div className={`${poppins.className} text-center`}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
