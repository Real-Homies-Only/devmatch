import React from "react";

import ProjectsButton from "../client/ProjectsButton";
import LoginButton from "../client/LoginButton";
import RegisterButton from "../client/RegisterButton";
import Logo from "../client/Logo";
import { poppins } from "../fonts/poppins";

const NavBar: React.FC = () => {
  return (
    <nav
      className={`${poppins.variable} flex items-center justify-between px-4 py-1 bg-background-700 shadow-lg`}
    >
      <div className={`flex items-center ${poppins.className} `}>
        <span className={`${poppins.className} font-semibold`}>
          <Logo />
        </span>
        <span
          className={`${poppins.className} text-xs font-light ml-4 hidden md:block`}
        >
          <ProjectsButton />
        </span>
      </div>
      <div
        className={`flex items-center text-xs ${poppins.className} font-light`}
      >
        <LoginButton />
        <RegisterButton />
      </div>
    </nav>
  );
};

export default NavBar;
