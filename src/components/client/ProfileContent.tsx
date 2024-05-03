"use client";
import React from "react";
import { z } from "zod";

import { poppins } from "../fonts/poppins";

const ProfileSchema = z.object({
  profilePictureURL: z.string(),
  displayName: z.string()
});

type ProfilePictureProps = z.infer<typeof ProfileSchema>;

const ProfileContent: React.FC<ProfilePictureProps> = ({
  profilePictureURL,
  displayName
}) => {
  return (
    <div
      className={`mx-2 my-2 card bg-background-700 text-gray-700 border border-gray-200 shadow-md ${poppins.className}`}
    >
      <div className="card-body items-center text-center">
        <div className="w-24">
          <img
            className="rounded-full"
            alt="Tailwind CSS Navbar component"
            src={profilePictureURL}
          />
        </div>
        <h2 className="card-title font-semibold ">{displayName}</h2>
        <p>Professional Gamer / Software Engineer at LeBonBon</p>
        <p>Central Philippine University</p>
        <p>
          Philippines
          <span className="badge badge-ghost ml-2">Location</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileContent;
