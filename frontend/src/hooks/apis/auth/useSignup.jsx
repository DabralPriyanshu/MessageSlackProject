import { useMutation } from "@tanstack/react-query";

import { signUpRequest } from "@/apis/auth";
export const useSignup = () => {
  const {
    isPending,
    isSuccess,
    error,
    mutate: signupMutation,
  } = useMutation({
    mutationFn: signUpRequest,
    onSuccess: (data) => console.log("Successfully signup ", data),
    onError: (error) => console.log("error failed to signup ", error),
  });
  return { isPending, isSuccess, error, signupMutation };
};
