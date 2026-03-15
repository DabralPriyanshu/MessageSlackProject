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
export const deleteWorkspaceRequest = async ({ workspaceId, token }) => {
  try {
    const response = await API.delete(`/workspaces/${workspaceId}`, {
      headers: { "x-access-token": token },
    });
    console.log(response?.data?.data);
    return response?.data?.data;
  } catch (error) {
    console.error("Error in deleting workspaces", error);
    throw error.response.data;
  }
};

export const updateWorkspaceRequest = async ({ workspaceId, name, token }) => {
  try {
    const response = await API.put(
      `/workspaces/${workspaceId}`,
      { name },
      {
        headers: {
          "x-access-token": token,
        },
      },
    );
    console.log(response?.data?.data);
    return response?.data?.data;
  } catch (error) {
    console.log("Error in updating workspace request", error);
    throw error.response.data;
  }
};
export const addChannelToWorkspaceRequest = async ({
  workspaceId,
  channelName,
  token,
}) => {
  try {
    const response = await API.put(
      `/workspaces/${workspaceId}/channels`,
      { channelName },
      {
        headers: {
          "x-access-token": token,
        },
      },
    );
    console.log(
      "response from adding channel to workspace",
      response?.data?.data,
    );
    return response?.data?.data;
  } catch (error) {
    console.log("Error in adding channel to workspace request", error);
    throw error.response.data;
  }
};

export const resetJoinCodeRequest = async ({ workspaceId, token }) => {
  try {
    const response = await API.put(
      `/workspaces/${workspaceId}/joinCode/reset`,
      {},
      {
        headers: {
          "x-access-token": token,
        },
      },
    );
    return response?.data?.data;
  } catch (error) {
    console.log("Error in resetting join code request", error);
    throw error.response.data;
  }
};

export const addMemberToWorkspaceRequest = async ({ workspaceId, token }) => {
  try {
    const response = await API.put(
      `/workspaces/${workspaceId}/members`,
      {},
      {
        headers: {
          "x-access-token": token,
        },
      },
    );
    return response?.data?.data;
  } catch (error) {
    console.log("Error in adding member to workspace request", error);
    throw error.response.data;
  }
};

export const joinWorkspaceRequest = async ({
  workspaceId,
  joinCode,
  token,
}) => {
  try {
    const response = await API.put(
      `/workspaces/${workspaceId}/join`,
      { joinCode },
      {
        headers: {
          "x-access-token": token,
        },
      },
    );
    return response?.data?.data;
  } catch (error) {
    console.log("Error in joining workspace request", error);
    throw error.response.data;
  }
};
