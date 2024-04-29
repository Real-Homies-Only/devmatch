"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ProjectsButton: React.FC = () => {
  const router = useRouter();

  return (
    <span
      onClick={() => router.push("/projects")}
      className="text-gray-700 hover:text-accent-700 cursor-pointer"
    >
      Projects
    </span>
  );
};

export default ProjectsButton;
