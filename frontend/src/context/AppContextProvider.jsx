import combineContext from "@/utils/combineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceProvider } from "./CreateWorkspaceContext";
import { WorkspacePreferencesModalContextProvider } from "./WorkspacePreferencesModalContext";
export const AppContextProvider = combineContext(
  AuthContextProvider,
  CreateWorkspaceProvider,
  WorkspacePreferencesModalContextProvider,
);
