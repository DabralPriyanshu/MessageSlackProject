import API from "@/config/axiosConfig";
export const createWorkspaceRequest = async ({ name, description, token }) => {
  try {
    const response = await API.post(
      "/workspaces",
      {
        name,
        description,
      },
      { headers: { "x-access-token": token } },
    );
    console.log(response?.data);
    return response?.data;
  } catch (error) {
    console.error("Error in creating workspace", error);
    throw error.response.data;
  }
};

export const fetchWorkspacesRequest = async ({ token }) => {
  try {
    const response = await API.get("/workspaces", {
      headers: { "x-access-token": token },
    });
    console.log(response?.data);
    return response?.data;
  } catch (error) {
    console.error("Error in fetching user workspaces", error);
    throw error.response.data;
  }
};
