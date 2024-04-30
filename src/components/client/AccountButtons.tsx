"use client";
import React, { Fragment, useState, useEffect } from "react";

import { poppins } from "../fonts/poppins";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import ProfilePopUp from "./ProfilePopUp";

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

const AccountButtons: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    id: "",
    firstName: "",
    lastName: ""
  });

  useEffect(() => {
    const getLoggedInStatus = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
          setIsLoggedIn(data.loggedIn);
        } else {
          setUser({ id: "", firstName: "Profile", lastName: "" });
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getLoggedInStatus();
  }, []);

  return (
    <Fragment>
      {isLoggedIn ? (
        <div>
          <ProfilePopUp firstName={user.firstName} />
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
