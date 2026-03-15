import UserButton from "@/components/atoms/UserButton/UserButton";
import { useFetchWorkspace } from "@/hooks/apis/workspaces/useFetchWorkspace";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isFetching, workspaces } = useFetchWorkspace();
  const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();
  const navigate = useNavigate();
  useEffect(() => {
    if (isFetching) {
      return;
    }
    console.log("Workspaces downloaded is ", workspaces);
    if (workspaces?.length === 0 || !workspaces) {
      console.log("empty");
      setOpenCreateWorkspaceModal(true);
    } else {
      navigate(`workspaces/${workspaces[0]._id}`);
    }
  }, [workspaces, isFetching, navigate,setOpenCreateWorkspaceModal]);
  return (
    <>
      <h1>Home</h1>
      <UserButton />
    </>
  );
};

export default Home;
