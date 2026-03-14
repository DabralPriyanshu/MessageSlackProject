import combineContext from "@/utils/combineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceProvider } from "./CreateWorkspaceContext";
export const AppContextProvider=combineContext(AuthContextProvider,CreateWorkspaceProvider)