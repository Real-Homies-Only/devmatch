import React from "react";
import { poppins } from "@/components/fonts/poppins";
import NavBar from "@/components/server/NavBar";
import ProfilePageClient from "@/components/client/ProfilePageClient";

const ProfilePage: React.FC = () => {
  return (
    <div className={`${poppins.variable} font-poppins`}>
      <NavBar />
      <ProfilePageClient />
    </div>
  );
};

export default ProfilePage;
