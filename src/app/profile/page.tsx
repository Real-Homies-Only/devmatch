import React from "react";

import { poppins } from "@/components/fonts/poppins";
import NavBar from "@/components/server/NavBar";
import ProfilePage from "@/components/client/ProfilePage";

const Profile = () => {
  return (
    <div className={`${poppins.variable} font-poppins`}>
      <NavBar />
      <ProfilePage />
    </div>
  );
};

export default Profile;
