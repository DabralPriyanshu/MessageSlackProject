import UserButton from "@/components/atoms/UserButton/UserButton";
import SidebarButton from "@/components/molecules/SidebarButton/SidebarButton";
import {
  BellIcon,
  HomeIcon,
  MessageSquare,
  MoreHorizontalIcon,
} from "lucide-react";
import React from "react";

const WorkspaceSidebar = () => {
  return (
    <aside className="w-[70px] h-full bg-gradient-to-tr from-[#020617] via-[#0f172a] to-[#1e293b] flex flex-col gap-y-4 items-center pt-[10px] pb-[5px]">
      <SidebarButton Icon={HomeIcon} label="Home" />
      <SidebarButton Icon={MessageSquare} label="DMs" />
      <SidebarButton Icon={BellIcon} label="Notifications" />
      <SidebarButton Icon={MoreHorizontalIcon} label="More" />
      <div className="flex flex-col items-center justify-center  mt-auto mb-5 gap-y-1 ">
        <UserButton />
      </div>
    </aside>
  );
};

export default WorkspaceSidebar;
