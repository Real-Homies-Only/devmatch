"use client";
import React, { Fragment } from "react";

import useAuthState from "@/hooks/useAuthState";
import { poppins } from "../fonts/poppins";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import ProfilePopUp from "./ProfilePopUp";
import ProjectsButton from "./ProjectsButton";

const AccountButtons: React.FC = () => {
  const { loading, user, isLoggedIn } = useAuthState();

  return (
    <Fragment>
      {loading ? (
        <span className="loading loading-spinner loading-sm text-gray-700"></span>
      ) : isLoggedIn ? (
        <div>
          <ProjectsButton />
          <ProfilePopUp
            firstName={user.firstName}
            photoURL={user.profilePicture}
          />
        </div>
      ) : (
        <div
          className={`flex items-center text-xs ${poppins.className} font-light`}
        >
          <LoginButton />
          <RegisterButton />
        </div>
      )}
    </Fragment>
  );
};

export default AccountButtons;
