import React from "react";

import { poppins } from "@/components/fonts/poppins";
import NavBar from "@/components/server/NavBar";
import ProfilePageUser from "@/components/client/ProfilePageUser";

const ProfileOthers = ({ params }: { params: { id: string } }) => {
  return (
    <div className={`${poppins.variable} font-poppins`}>
      <NavBar />
      <ProfilePageUser id={params.id} />
    </div>
  );
};

export default ProfileOthers;
