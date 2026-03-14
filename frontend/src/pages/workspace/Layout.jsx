import WorkspaceNavbar from "@/components/organisms/Workspace/WorkspaceNavbar";
import WorkspacePanel from "@/components/organisms/Workspace/WorkspacePanel";
import WorkspaceSidebar from "@/components/organisms/Workspace/WorkspaceSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const WorkspaceLayout = ({ children }) => {
  return (
    <div className="h-screen">
      <WorkspaceNavbar />

      <div className="flex h-[calc(100vh-40px)] w-full overflow-hidden">
        <WorkspaceSidebar />

        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId="workspace-resize"
          className="w-full"
        >
          <ResizablePanel
            defaultSize={25}
            minSize={15}
            className="bg-[#141620]"
          >
            <WorkspacePanel />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={75} minSize={20}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceLayout;
