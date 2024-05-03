"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Icon from "@mdi/react";

import { mdiNewspaperVariantMultiple } from "@mdi/js";

const ProjectsButton: React.FC = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/projects")}
      className="dropdown dropdown-end"
    >
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <span className="text-primary-700">
            <Icon path={mdiNewspaperVariantMultiple} size={0.8} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectsButton;
