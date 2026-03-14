import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchWorkspace } from "@/hooks/apis/workspaces/useFetchWorkspace";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";
import { Loader2 } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const WorkspaceSwitcher = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const { isFetching, workspace } = useGetWorkspaceById(workspaceId);
  const { workspaces, isFetching: isFetchingWorkspace } = useFetchWorkspace();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="size-9 relative overflow-hidden bg-[#f0f0f0] hover:bg-[#e0e0e0]/80` text-semibold text-slate-800 text-xl    ">
          {isFetching ? (
            <Loader2 className="animate-spin size-5" />
          ) : (
            workspace?.name?.charAt(0).toUpperCase() || "W"
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer flex-col justify-start items-start">
          {workspace?.name}
          <span className="text-xs text-muted-foreground">
            (Active workspace)
          </span>
        </DropdownMenuItem>
        {isFetchingWorkspace ? (
          <Loader2 className="animate-spin size-5" />
        ) : (
          workspaces?.map((ws) => {
            if (ws._id === workspaceId) return null;
            return (
              <DropdownMenuItem
                onClick={() => navigate(`/workspaces/${ws._id}`)}
                key={ws._id}
                className="cursor-pointer flex-col justify-start items-start"
              >
                <p className="truncate">{ws.name}</p>
              </DropdownMenuItem>
            );
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;
