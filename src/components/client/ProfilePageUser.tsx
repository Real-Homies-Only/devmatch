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

const ProfilePageProps = z.object({
  id: z.string()
});

type ProfilePageUserProps = z.infer<typeof ProfilePageProps>;

const ProfilePageUser: React.FC<ProfilePageUserProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserAccount>({
    id: "",
    firstName: "",
    lastName: ""
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/user/${id}`, {
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
        } else {
          setUser({ id: "", firstName: "", lastName: "" });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    setTimeout(() => {
      getUser();
      setIsLoading(false);
    }, 1600);
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <div
          className={`mx-2 my-2 card bg-background-700 text-gray-700 border border-gray-200 shadow-md ${poppins.className}`}
        >
          <h2 className="card-title font-semibold py-4 self-center">
            Loading profile...
          </h2>
        </div>
      ) : user ? (
        <ProfileContent
          displayName={`${user.firstName} ${user.lastName}`}
          profilePictureURL="https://scontent.fceb6-1.fna.fbcdn.net/v/t39.30808-6/438935867_1812345769233161_6742176315864512411_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFcml616r0okvP88mTQi6Vc9Fls6-RfteT0WWzr5F-15AybzXGliD4-YrFJ980eOgBFcB2w2IcaeVePeteSIW2H&_nc_ohc=6_2j9_6jWZIQ7kNvgEluJVk&_nc_ht=scontent.fceb6-1.fna&oh=00_AfCAv4n13dNVUT1qpj59PQPGR7PkXT8h4dTZdrlU-a-w9w&oe=66382771"
        />
      ) : (
        <div
          className={`mx-2 my-2 card bg-background-700 text-gray-700 border border-gray-200 shadow-md ${poppins.className}`}
        >
          <h2 className="card-title font-semibold py-4 self-center">
            User does not exist!
          </h2>
        </div>
      )}
    </Fragment>
  );
};

export default ProfilePageUser;
