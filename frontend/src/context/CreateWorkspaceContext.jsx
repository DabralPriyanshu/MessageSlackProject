import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CreateWorkspaceContext = createContext();

export const CreateWorkspaceProvider = ({ children }) => {
  const [openCreateWorkspaceModel, setOpenCreateWorkspaceModal] =
    useState(false);

  return (
    <CreateWorkspaceContext.Provider
      value={{ openCreateWorkspaceModel, setOpenCreateWorkspaceModal }}
    >
      {children}
    </CreateWorkspaceContext.Provider>
  );
};
