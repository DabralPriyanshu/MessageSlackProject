import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { TrashIcon } from "lucide-react";

const WorkspacePreferencesModal = () => {
  const { initialValue, openPreferences, setOpenPreferences } =
    useWorkspacePreferencesModal();

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
              <button className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg w-full border mt-4 hover:bg-gray-50">
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
