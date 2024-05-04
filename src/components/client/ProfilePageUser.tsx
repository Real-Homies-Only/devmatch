"use client";

import React, { useState, useEffect, Fragment } from "react";
import { z } from "zod";
import { poppins } from "../fonts/poppins";
import ProfileContent from "./ProfileContent";

const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profilePicture: z.string()
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
    lastName: "",
    profilePicture: ""
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
          if (!success) throw new Error();
          setUser(data.user);
        } else {
          setUser({ id: "", firstName: "", lastName: "", profilePicture: "" });
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
    setIsLoading(false);
  }, [id]);

  return (
    <Fragment>
      {isLoading ? (
        <div
          className={`mx-2 my-2 card bg-background-700 text-gray-700 border border-gray-200 shadow-md ${poppins.className}`}
        >
          <span className="loading loading-spinner loading-lg text-gray-700"></span>
          <h2 className="card-title font-semibold py-4 self-center">
            Loading profile...
          </h2>
        </div>
      ) : user ? (
        <ProfileContent
          displayName={`${user.firstName} ${user.lastName}`}
          profilePictureURL={user.profilePicture}
          isOwner={false}
          handleChangePicture={() => ""}
        />
      ) : (
        <div
          className={`mx-2 my-2 card text-gray-700 border${poppins.className}`}
        >
          <h3 className="card-title font-light text-gray-400 py-4 self-center">
            Profile not found...
          </h3>
        </div>
      )}
    </Fragment>
  );
};

export default ProfilePageUser;
