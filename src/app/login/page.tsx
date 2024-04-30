import React from "react";
import { poppins } from "@/components/fonts/poppins";
import LoginForm from "@/components/client/LoginForm";

const Login: React.FC = () => {
  return (
    <div
      className={`${poppins.variable} flex items-center justify-center min-h-screen bg-background-700`}
    >
      <div className={`${poppins.className} text-center`}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
