"use client";
import React, { Fragment, useState, useEffect } from "react";

import { poppins } from "../fonts/poppins";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import ProfilePopUp from "./ProfilePopUp";
import ProjectsButton from "./ProjectsButton";

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
          setUser({ id: "", firstName: "", lastName: "" });
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
          <ProjectsButton />
          <ProfilePopUp
            firstName={user.firstName}
            photoURL="https://scontent.fceb6-1.fna.fbcdn.net/v/t39.30808-6/438935867_1812345769233161_6742176315864512411_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFcml616r0okvP88mTQi6Vc9Fls6-RfteT0WWzr5F-15AybzXGliD4-YrFJ980eOgBFcB2w2IcaeVePeteSIW2H&_nc_ohc=6_2j9_6jWZIQ7kNvgEluJVk&_nc_ht=scontent.fceb6-1.fna&oh=00_AfCAv4n13dNVUT1qpj59PQPGR7PkXT8h4dTZdrlU-a-w9w&oe=66382771"
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
