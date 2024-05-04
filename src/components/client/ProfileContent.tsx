"use client";
import React, { useState } from "react";
import Icon from "@mdi/react";
import UploadPhotoModal from "./UploadPhotoModal";

import { mdiPencil } from "@mdi/js";
import { poppins } from "../fonts/poppins";
import Image from "next/image";

interface ProfilePictureProps {
  profilePictureURL: string;
  displayName: string;
  isOwner: boolean;
  handleChangePicture: (photo: File | null) => void;
}

const ProfileContent: React.FC<ProfilePictureProps> = ({
  profilePictureURL,
  displayName,
  isOwner,
  handleChangePicture
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className={`mx-2 my-2 card bg-background-700 text-gray-700 border border-gray-200 shadow-md ${poppins.className}`}
    >
      <div className="card-body items-center text-center">
        <div className={`w-24 ${isOwner && "indicator"}`}>
          <Image
            className={`rounded-full ${isOwner && "border-2 border-gray-700"}`}
            alt="Display Picture"
            src={profilePictureURL}
            width={480}
            height={480}
          />
          {isOwner && (
            <span>
              <span
                onClick={() => setIsModalOpen(true)}
                className="badge btn btn-circle mr-3 mt-20 z-0 btn-xs indicator-item"
              >
                <Icon path={mdiPencil} size={0.5} />
              </span>
              <UploadPhotoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpload={handleChangePicture}
              />
            </span>
          )}
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
