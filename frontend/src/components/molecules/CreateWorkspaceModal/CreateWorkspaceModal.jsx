import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateWorkspace } from "@/hooks/apis/workspaces/useCreateWorkspace";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateWorkspaceModal = () => {
  const queryClient = useQueryClient();
  const { openCreateWorkspaceModel, setOpenCreateWorkspaceModal } =
    useCreateWorkspaceModal();
  const navigate = useNavigate();
  const [workspaceDetails, setWorkspaceDetails] = useState({
    name: "",
    description: "",
  });
  const { isPending, createWorkspaceMutation } = useCreateWorkspace();
  function handleClose() {
    setOpenCreateWorkspaceModal(false);
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const data = await createWorkspaceMutation({
        name: workspaceDetails.name,
        description: workspaceDetails.description,
      });
      console.dir(data);
      queryClient.invalidateQueries({ queryKey: ["fetchWorkspaces"] });
      setTimeout(() => {
        navigate(`/workspaces/${data?._id}`);
      }, 2000);
    } catch (error) {
      console.log("Not able toc create a new workspace ", error);
    } finally {
      setWorkspaceDetails({ name: "", description: "" });
      setOpenCreateWorkspaceModal(false);
    }
  }
  return (
    <Dialog open={openCreateWorkspaceModel} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            placeholder="Enter workspace name e.g MyWorkspace etc"
            required
            minLength={3}
            disabled={isPending}
            value={workspaceDetails.name}
            onChange={(e) =>
              setWorkspaceDetails({ ...workspaceDetails, name: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Description..."
            required
            minLength={3}
            disabled={isPending}
            value={workspaceDetails.description}
            onChange={(e) =>
              setWorkspaceDetails({
                ...workspaceDetails,
                description: e.target.value,
              })
            }
          />
          <div className="flex justify-end mt-5">
            <Button type="submit" disabled={isPending}>
              Create workspace
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceModal;
