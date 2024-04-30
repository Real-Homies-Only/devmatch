"use client";
import React, { useState } from "react";
import Icon from "@mdi/react";
import { useRouter } from "next/navigation";

import { mdiAccount, mdiLogout, mdiAccountEdit } from "@mdi/js";
import { poppins } from "../fonts/poppins";

interface ProfileProps {
  firstName: string;
}

const ProfilePopUp: React.FC<ProfileProps> = ({ firstName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const togglePopUp = () => {
    setIsOpen(!isOpen);
  };

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
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <div
        className="text-primary-700 border border-primary-700 rounded-full p-0.5 cursor-pointer"
        onClick={togglePopUp}
      >
        <Icon path={mdiAccount} size={1} />
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background-700 rounded-md shadow-lg py-2">
          <div className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer">
            <Icon
              path={mdiAccountEdit}
              size={0.8}
              className="text-gray-700 mr-2"
            />
            <span className={`${poppins.className} text-gray-700`}>
              {firstName}
            </span>
          </div>
          <div
            className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
            onClick={handleSignOut}
          >
            <Icon path={mdiLogout} size={0.8} className="text-gray-700 mr-2" />
            <span className={`${poppins.className} text-gray-700`}>
              Sign Out
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePopUp;
