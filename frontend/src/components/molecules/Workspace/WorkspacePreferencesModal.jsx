import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteWorkspace } from "@/hooks/apis/workspaces/useDeleteWorkspace";
import { useWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const WorkspacePreferencesModal = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [workspaceId, setWorkspaceId] = useState(null);
  const { initialValue, openPreferences, setOpenPreferences, workspace } =
    useWorkspacePreferencesModal();

  const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);
  async function handleDelete() {
    try {
      await deleteWorkspaceMutation();
      queryClient.invalidateQueries({ queryKey: ["fetchWorkspaces"] });
      console.log("Delete workspace");
      toast.success("Workspace deleted successfully");
      setOpenPreferences(false);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error("Error in deleting workspace");
      console.log("Error in deleting workspace", error);
    }
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWorkspaceId(workspace?._id);
  }, [workspace]);

  return (
    <Dialog open={openPreferences} onOpenChange={setOpenPreferences}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{initialValue}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">Workspace Name</p>
              <p className="text-sm font-semibold hover:underline">Edit</p>
            </div>
            <p className="text-sm">{initialValue}</p>
            <div>
              <button
                className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg w-full border mt-4 hover:bg-gray-50"
                onClick={handleDelete}
              >
                <TrashIcon className="size-5" />
                <p>Delete Workspace</p>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspacePreferencesModal;
