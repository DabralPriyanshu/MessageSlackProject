import React from "react";
// import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auth from "@/pages/auth/Auth";
import Notfound from "@/pages/Notfound/Notfound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignupContainer from "@/components/organisms/Auth/SignupContainer";
import { Toaster } from "@/components/ui/sonner";
import SigninContainer from "./components/organisms/Auth/SigninContainer";
const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      <Routes>
        <Route path="/" element={<h1>Home </h1>} />
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
        <Route path="/*" element={<Notfound />} />
      </Routes>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
