import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signInRequest } from "@/apis/auth";

export const useSignin = () => {
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signinMutation,
  } = useMutation({
    mutationFn: signInRequest,
    onSuccess: (data) => {
      toast.success("Login Successful!", {
        description: "Welcome back to your workspace! 👋",
      });
      console.log("Successfully signed in", data);
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
