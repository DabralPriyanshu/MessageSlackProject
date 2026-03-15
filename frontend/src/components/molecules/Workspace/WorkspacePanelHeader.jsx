import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/context/useAuth";
import { useWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { ChevronDownIcon, ListFilterIcon, SquarePenIcon } from "lucide-react";

import React from "react";

const WorkspacePanelHeader = ({ workspace }) => {
  const { setOpenPreferences, setInitialValue } =
    useWorkspacePreferencesModal();
  const workspaceMembers = workspace?.members;
  const { auth } = useAuth();
  const isLoggedInUserAdmin =
    workspaceMembers?.find((member) => member.memberId === auth?.user._id)
      ?.role === "admin";
  console.log(isLoggedInUserAdmin);

  return (
    <div className="flex items-center justify-between px-4 h-[50px] gap-0.5">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="transparent"
            className={"font-semibold text-lg w-auto p-1.5 overflow-hidden"}
          >
            <span className="truncate">{workspace?.name}</span>
            <ChevronDownIcon className="size-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="start"
          className="bg-[#0f172a] border border-gray-700 text-white"
        >
          <DropdownMenuItem>
            <div className="size-9 relative overflow-hidden text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
              {workspace?.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col items-start">
              <p className="font-bold">{workspace?.name}</p>
              <p className="text-xs text-muted-foreground">Active workspace</p>
            </div>
          </DropdownMenuItem>
          {isLoggedInUserAdmin && (
            <>
              <DropdownMenuItem
                className="cursor-pointer py-2"
                onClick={() => {
                  setInitialValue(workspace?.name);
                  setOpenPreferences(true);
                }}
              >
                Preferences
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2">
                Invite people to {workspace?.name}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-0.5">
        <Button variant="transparent" size="iconSm">
          <ListFilterIcon className="size-5" />
        </Button>
        <Button variant="transparent" size="iconSm">
          <SquarePenIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default WorkspacePanelHeader;
