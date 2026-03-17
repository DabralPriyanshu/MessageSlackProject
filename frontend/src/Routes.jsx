import { Route, Routes } from "react-router-dom";
import SignupContainer from "@/components/organisms/Auth/SignupContainer";
import SigninContainer from "@/components/organisms/Auth/SigninContainer";
import Notfound from "@/pages/Notfound/Notfound";
import Auth from "@/pages/auth/Auth";
import ProtectedRoute from "./components/molecules/ProtectedRoute/ProtectedRoute";
import Home from "./pages/home/Home";
import WorkspaceLayout from "./pages/workspace/Layout";
import JoinPage from "./pages/workspace/JoinPage";
import { Channel } from "./pages/workspace/Channel/Channel";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <Auth>
            <SignupContainer />
          </Auth>
        }
      />
      <Route
        path="/auth/signin"
        element={
          <Auth>
            <SigninContainer />
          </Auth>
        }
      />
      <Route
        path="/workspaces/:workspaceId/channels/:channelId"
        element={
          <ProtectedRoute>
            <WorkspaceLayout>
              <Channel />
            </WorkspaceLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/workspaces/:workspaceId"
        element={
          <ProtectedRoute>
            <WorkspaceLayout>Workspace</WorkspaceLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/workspaces/join/:workspaceId" element={<JoinPage />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default AppRoutes;
