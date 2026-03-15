import { Button } from "@/components/ui/button";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { InfoIcon, LucideLoader2, SearchIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const WorkspaceOptions = () => {
  const { workspaceId } = useParams();
  console.log(workspaceId);
  const { workspace, isFetching } = useGetWorkspaceById(workspaceId);
  const { setCurrentWorkspace } = useCurrentWorkspace();
  useEffect(() => {
    setCurrentWorkspace(workspace);
  }, [workspace, setCurrentWorkspace]);
  if (isFetching) {
    return <LucideLoader2 className="animate-spin ml-2 " />;
  }

  return (
    <nav className="flex items-center justify-center h-10 p-1.5 bg-slate-900">
      <div className="flex-1 " />
      <div>
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent/15 w-full justify-start h-7 px-2"
        >
          <SearchIcon className="size-5 text-white mr-2" />
          <span className="text-white text-sm">
            Search {workspace?.name || "Workspace"}
          </span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="sm" className="h-7 px-2">
          <InfoIcon className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};

export default WorkspaceOptions;
