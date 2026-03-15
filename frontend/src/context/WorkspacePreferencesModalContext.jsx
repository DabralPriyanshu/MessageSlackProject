import { createContext, useState } from "react";

export const WorkspacePreferencesModalContext = createContext();
export const WorkspacePreferencesModalContextProvider = ({ children }) => {
  const [openPreferences, setOpenPreferences] = useState(false);
  const [initialValue, setInitialValue] = useState("Edit workspace");
  return (
    <WorkspacePreferencesModalContext.Provider
      value={{
        openPreferences,
        setOpenPreferences,
        initialValue,
        setInitialValue,
      }}
    >
      {children}
    </WorkspacePreferencesModalContext.Provider>
  );
};
