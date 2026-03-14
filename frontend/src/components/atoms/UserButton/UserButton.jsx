import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/context/useAuth";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { LogOutIcon, PencilIcon, SettingsIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UserButton = () => {
  const { auth, logout } = useAuth();
  const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();
  const navigate = useNavigate();
  async function handleLogout() {
    await logout();
    toast.success("Logout Successful!", {
      description: "Signin again!! 👋",
    });
    setTimeout(() => {
      navigate("/auth/signin");
    }, 1000);
  }
  function handleCreate() {
    setOpenCreateWorkspaceModal(true);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-65 transition">
          <AvatarImage src={auth?.user?.avatar} />
          <AvatarFallback>
            {auth?.user?.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon className="size-4 mr-1 h-10" />
          Logout
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCreate}>
          <PencilIcon className="size-4 mr-1 h-10" />
          Create workspace
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon className="size-4 mr-1 h-10" />
          Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
