import combineContext from "@/utils/combineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceProvider } from "./CreateWorkspaceContext";
import { WorkspacePreferencesModalContextProvider } from "./WorkspacePreferencesModalContext";
import { CreateChannelContextProvider } from "./CreateChannelContext";
import { WorkspaceContextProvider } from "./WorkspaceContext";
import { SocketContextProvider } from "./SocketContext";
import { ChannelMessagesProvider } from "./CHannelMessages";
export const AppContextProvider = combineContext(
  AuthContextProvider,
  CreateWorkspaceProvider,
  WorkspacePreferencesModalContextProvider,
  CreateChannelContextProvider,
  WorkspaceContextProvider,
  ChannelMessagesProvider,
  SocketContextProvider,
);
