import { Route, Routes } from "react-router-dom";
import SignupContainer from "@/components/organisms/Auth/SignupContainer";
import SigninContainer from "@/components/organisms/Auth/SigninContainer";
import Notfound from "@/pages/Notfound/Notfound";
import Auth from "@/pages/auth/Auth";
import ProtectedRoute from "./components/molecules/ProtectedRoute/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <h1>Home </h1>
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
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default AppRoutes;
