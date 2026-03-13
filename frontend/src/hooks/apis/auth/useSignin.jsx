import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signInRequest } from "@/apis/auth";
import { useAuth } from "@/hooks/context/useAuth";

export const useSignin = () => {
  const { auth, setAuth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signinMutation,
  } = useMutation({
    mutationFn: signInRequest,
    onSuccess: (response) => {
      const userObject = JSON.stringify(response.data);
      localStorage.setItem("user", userObject);
      //so that we don't have to parse the string to object every time
      localStorage.setItem("token", response.data.token);
      setAuth({
        user: response.data,
        token: response.data.token,
        isLoading: false,
      });
      toast.success("Login Successful!", {
        description: "Welcome back to your workspace! 👋",
      });
      console.log("Successfully signed in", response);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Invalid credentials. Please try again!";

      toast.error(errorMessage);
      console.log("Error during signin:", error);
    },
  });

  return { isPending, isSuccess, error, signinMutation };
};
