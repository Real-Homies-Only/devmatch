"use client";
import React, { useState, useEffect, Fragment } from "react";
import { z } from "zod";

import { poppins } from "../fonts/poppins";
import ProfileContent from "./ProfileContent";

const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string()
});

type UserAccount = z.infer<typeof UserSchema>;

const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserAccount>({
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
          const { success } = UserSchema.safeParse(data.user);
          if (!success) throw new Error("User data invalid!");

          setUser(data.user);
          setIsLoggedIn(data.loggedIn);
        } else {
          setUser({ id: "", firstName: "", lastName: "" });
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoggedIn(false);
      }
    };
    setTimeout(() => {
      getLoggedInStatus();
    }, 1000);
  }, []);
  return (
    <Fragment>
      {isLoggedIn && user ? (
        <ProfileContent
          displayName={`${user.firstName} ${user.lastName}`}
          profilePictureURL="https://scontent.fceb6-1.fna.fbcdn.net/v/t39.30808-6/438935867_1812345769233161_6742176315864512411_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFcml616r0okvP88mTQi6Vc9Fls6-RfteT0WWzr5F-15AybzXGliD4-YrFJ980eOgBFcB2w2IcaeVePeteSIW2H&_nc_ohc=6_2j9_6jWZIQ7kNvgEluJVk&_nc_ht=scontent.fceb6-1.fna&oh=00_AfCAv4n13dNVUT1qpj59PQPGR7PkXT8h4dTZdrlU-a-w9w&oe=66382771"
        />
      ) : (
        <div
          className={`mx-2 my-2 card bg-background-700 text-gray-700 border border-gray-200 shadow-md ${poppins.className}`}
        >
          <h2 className="card-title font-semibold py-4 self-center">
            You are not logged in!
          </h2>
        </div>
      )}
    </Fragment>
  );
};

export default ProfilePage;
