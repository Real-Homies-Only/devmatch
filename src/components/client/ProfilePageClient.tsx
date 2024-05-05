"use client";
import React, { Fragment } from "react";

import { poppins } from "../fonts/poppins";
import ProfileContent from "./ProfileContent";
import useAuthState from "@/hooks/useAuthState";

const ProfilePageClient = () => {
  const { loading, user, isLoggedIn, mutate } = useAuthState();

  const onChange = async (photo: File | null) => {
    try {
      if (photo === null) {
        throw new Error();
      }
      const formData = new FormData();
      formData.append("photo", photo);

      const response = await fetch(`/api/user/${user.id}/edit`, {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setTimeout(() => {
          mutate(undefined, true);
        }, 2000);
      } else {
        throw new Error();
      }
    } catch (error) {
      alert("There was a problem uploading your picture");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <div
          className={`mx-2 my-2 justify-center items-center card text-gray-700 border${poppins.className}`}
        >
          <span className="loading loading-spinner loading-lg text-gray-700"></span>
          <h3 className="card-title font-light text-gray-400 py-4">
            Loading...
          </h3>
        </div>
      ) : isLoggedIn && user ? (
        <ProfileContent
          displayName={`${user.firstName} ${user.lastName}`}
          profilePictureURL={user.profilePicture}
          isOwner={true}
          handleChangePicture={onChange}
        />
      ) : (
        <div
          className={`mx-2 my-2 card text-gray-700 border${poppins.className}`}
        >
          <h3 className="card-title font-light text-gray-400 py-4 self-center">
            Profile not found!
          </h3>
        </div>
      )}
    </Fragment>
  );
};

export default ProfilePageClient;
