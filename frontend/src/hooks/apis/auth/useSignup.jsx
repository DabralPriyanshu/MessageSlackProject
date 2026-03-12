import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { signUpRequest } from "@/apis/auth";

export const useSignup = () => {
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signupMutation,
  } = useMutation({
    mutationFn: signUpRequest,
    onSuccess: (data) => {
      toast.success("Account created successfully!", {
        description: "You can now login to your workspace.",
      });
      console.log("Successfully signup ", data);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to signup!";

      toast.error(errorMessage);

      console.log("error failed to signup ", error);
    },
  });

  return { isPending, isSuccess, error, signupMutation };
};
