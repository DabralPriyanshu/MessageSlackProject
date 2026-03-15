import combineContext from "@/utils/combineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceProvider } from "./CreateWorkspaceContext";
import { WorkspacePreferencesModalContextProvider } from "./WorkspacePreferencesModalContext";
import { CreateChannelContextProvider } from "./CreateChannelContext";
import { WorkspaceContextProvider } from "./WorkspaceContext";
export const AppContextProvider = combineContext(
  AuthContextProvider,
  CreateWorkspaceProvider,
  WorkspacePreferencesModalContextProvider,
  CreateChannelContextProvider,
  WorkspaceContextProvider,
);
