"use client";
import React from "react";
import Icon from "@mdi/react";

import { mdiAccount, mdiLogout, mdiAccountEdit } from "@mdi/js";
import { useRouter } from "next/navigation";
import { poppins } from "../fonts/poppins";

interface ProfileProps {
  firstName: string;
  photoURL: string;
}

const ProfilePopUp: React.FC<ProfileProps> = ({ firstName, photoURL }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (response.ok) {
        router.push("/login");
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className={`${poppins.className} dropdown dropdown-end`}>
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle justify-center items-center avatar"
      >
        <div className="w-10 rounded-full indicator">
          {photoURL === "" ? (
            <span className="text-primary-700">
              <Icon path={mdiAccount} size={0.8} />
            </span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="profile" src={photoURL} />
          )}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-1 gap-4 z-[1] p-2 py-4 shadow bg-background-700 rounded-box w-52 text-gray-700"
      >
        <li>
          <span color="text-gray-700">
            <Icon path={mdiAccountEdit} size={0.8} />
            {firstName === "" ? "Account" : firstName}
          </span>
        </li>
        <li>
          <span onClick={handleSignOut}>
            <Icon path={mdiLogout} size={0.8} />
            Sign Out
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ProfilePopUp;
