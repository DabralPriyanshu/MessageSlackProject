import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TrashIcon, PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDeleteWorkspace } from "@/hooks/apis/workspaces/useDeleteWorkspace";
import { useUpdateWorkspace } from "@/hooks/apis/workspaces/useUpdateWorkspace";
import { useWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { useConfirm } from "@/hooks/useConfirm.jsx";

const WorkspacePreferencesModal = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { openPreferences, setOpenPreferences, workspace } =
    useWorkspacePreferencesModal();

  const [editOpen, setEditOpen] = useState(false);
  const [renameValue, setRenameValue] = useState(workspace?.name || "");
  const { confirmation, ConfirmDialog } = useConfirm({
    title: "Do you want to delete the workspace?",
    message: "This action cannot be undone.",
  });
  const { confirmation: updateConfirmation, ConfirmDialog: UpdateDialog } =
    useConfirm({
      title: "Do you want to update the workspace?",
      message: "This action cannot be undone.",
    });

  const { deleteWorkspaceMutation } = useDeleteWorkspace(workspace?._id);
  const { updateWorkspaceMutation, isPending: isUpdating } = useUpdateWorkspace(
    workspace?._id,
  );

  const handleRename = async (e) => {
    e.preventDefault();
    try {
      const ok = await updateConfirmation();
      console.log("Confirmation received");
      if (!ok) {
        return;
      }
      await updateWorkspaceMutation(renameValue);
      queryClient.invalidateQueries(["fetchWorkspaceById", workspace?._id]);
      setEditOpen(false);
      toast.success("Workspace updated");
    } catch (error) {
      toast.error("Failed to update workspace");
    }
  };

  const handleDelete = async () => {
    try {
      const ok = await confirmation();
      console.log("Confirmation received");
      if (!ok) {
        return;
      }
      await deleteWorkspaceMutation();
      queryClient.invalidateQueries({ queryKey: ["fetchWorkspaces"] });
      toast.success("Workspace deleted");
      setOpenPreferences(false);
      navigate("/");
    } catch (error) {
      toast.error("Error deleting workspace");
    }
  };

  return (
    <>
      <ConfirmDialog />
      <UpdateDialog />
      {/* Main Preferences Modal */}
      <Dialog open={openPreferences} onOpenChange={setOpenPreferences}>
        <DialogContent className="p-0 bg-slate-50 overflow-hidden max-w-md">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle className="text-xl font-bold">
              Workspace Settings
            </DialogTitle>
          </DialogHeader>

          <div className="p-4 flex flex-col gap-y-4">
            {/* Rename Section */}
            <div
              onClick={() => {
                setEditOpen(true);
                setRenameValue(workspace?.name);
              }}
              className="group flex flex-col gap-y-1 bg-white p-4 rounded-xl border cursor-pointer hover:border-blue-400 transition shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Workspace Name
                </p>
                <span className="text-sm font-semibold text-blue-600 group-hover:underline">
                  Edit
                </span>
              </div>
              <p className="text-sm font-medium">{workspace?.name}</p>
            </div>

            {/* Danger Zone */}
            <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex flex-col gap-y-3">
              <button
                onClick={handleDelete}
                className="flex items-center justify-center gap-x-2 w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-200 transition active:scale-95"
              >
                <TrashIcon className="size-4" />
                <span className="text-sm font-bold">Delete Workspace</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Separate Edit Dialog (Not Nested) */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Rename Workspace</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRename} className="space-y-4">
            <Input
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              disabled={isUpdating}
              placeholder="Workspace Name"
              autoFocus
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkspacePreferencesModal;
