import { createWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useCreateWorkspace = () => {
  const { auth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: createWorkspaceMutation,
  } = useMutation({
    mutationFn: (data) => {
      createWorkspaceRequest({ ...data, token: auth?.token });
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { isPending, isSuccess, error, createWorkspaceMutation };
};
