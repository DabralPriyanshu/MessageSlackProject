import WorkspacePanelHeader from "@/components/molecules/Workspace/WorkspacePanelHeader";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";
import { AlertTriangleIcon, Loader } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

const WorkspacePanel = () => {
  const { workspaceId } = useParams();
  const { isFetching, workspace, isSuccess } = useGetWorkspaceById(workspaceId);
  if (isFetching) {
    return (
      <div className="flex flex-col gap-y-2 h-full items-center justify-center text-white">
        <Loader className="animate-spin size-5 text-white" />
      </div>
    );
  }
  if (!isSuccess) {
    <div className="flex flex-col gap-y-2 h-full items-center justify-center text-white">
      <AlertTriangleIcon className="size-6 text-white" />
      Something went wrong while fetching workspace details. Please try again
      later.
    </div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#0f172a] text-white">
      <WorkspacePanelHeader workspace={workspace} />
    </div>
  );
};

export default WorkspacePanel;
