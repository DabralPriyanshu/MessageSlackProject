import { CreateChannelModal } from "@/components/molecules/CreateChannelModal/CreateChannelModal";
import CreateWorkspaceModal from "@/components/molecules/CreateWorkspaceModal/CreateWorkspaceModal";
import WorkspacePreferencesModal from "@/components/molecules/Workspace/WorkspacePreferencesModal";
import React from "react";

const Modals = () => {
  return (
    <>
      <CreateWorkspaceModal />
      <WorkspacePreferencesModal />
      <CreateChannelModal/>
    </>
  );
};

export default Modals;
