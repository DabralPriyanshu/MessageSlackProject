import { useEffect, useState } from "react";
import SigninCard from "./SigninCard";
import { useSignin } from "@/hooks/apis/auth/useSignin";
import { useNavigate } from "react-router-dom";

const SigninContainer = () => {
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState(null);
  const { isPending, isSuccess, error, signinMutation } = useSignin();
  async function onSigninFormSubmit(e) {
    e.preventDefault();
    if (!signinForm.email || !signinForm.password) {
      console.error("All fields are required");
      setValidationError({ message: "All fields are required" });
      return;
    }
    setValidationError(null);
    await signinMutation({
      email: signinForm.email,
      password: signinForm.password,
    });
  }
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [isSuccess, navigate]);
  return (
    <SigninCard
      signinForm={signinForm}
      setSigninForm={setSigninForm}
      onSigninFormSubmit={onSigninFormSubmit}
      validationError={validationError}
      error={error}
      isPending={isPending}
      isSuccess={isSuccess}
    />
  );
};

export default SigninContainer;
