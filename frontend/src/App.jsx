import React from "react";
// import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auth from "@/pages/auth/Auth";
import SignupCard from "@/components/organisms/Auth/SignupCard";
import SigninCard from "@/components/organisms/Auth/SigninCard";
import Notfound from "@/pages/Notfound/Notfound";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home </h1>} />
        <Route
          path="/auth/signup"
          element={
            <Auth>
              <SignupCard />
            </Auth>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <Auth>
              <SigninCard />
            </Auth>
          }
        />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default App;
