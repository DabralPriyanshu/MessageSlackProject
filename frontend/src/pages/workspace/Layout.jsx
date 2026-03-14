import WorkspaceSidebar from "@/components/organisms/Workspace/WorkspaceSidebar";
import React from "react";

const WorkspaceLayout = ({ children }) => {
  return (
    <div className="h-[100vh]">
      <div className="flex h-full">
        <WorkspaceSidebar />

        {children}
      </div>
    </div>
  );
};

export default WorkspaceLayout;
