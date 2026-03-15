import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const WorkspacePreferencesModalContext = createContext();
export const WorkspacePreferencesModalContextProvider = ({ children }) => {
  const [openPreferences, setOpenPreferences] = useState(false);
  const [initialValue, setInitialValue] = useState("Edit workspace");
  const [workspace, setWorkspace] = useState(null);
  return (
    <WorkspacePreferencesModalContext.Provider
      value={{
        openPreferences,
        setOpenPreferences,
        initialValue,
        setInitialValue,
        workspace,
        setWorkspace

      }}
    >
      {children}
    </WorkspacePreferencesModalContext.Provider>
  );
};
