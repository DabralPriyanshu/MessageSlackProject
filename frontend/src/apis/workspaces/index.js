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
    console.log(response?.data?.data);
    return response?.data?.data;
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
    return response?.data?.data;
  } catch (error) {
    console.error("Error in fetching user workspaces", error);
    throw error.response.data;
  }
};

export const fetchWorkspaceDetailsRequest = async ({ workspaceId, token }) => {
  try {
    const response = await API.get(`/workspaces/${workspaceId}`, {
      headers: { "x-access-token": token },
    });
    console.log(response?.data?.data);
    return response?.data?.data;
  } catch (error) {
    console.error("Error in fetching workspaces details", error);
    throw error.response.data;
  }
};
