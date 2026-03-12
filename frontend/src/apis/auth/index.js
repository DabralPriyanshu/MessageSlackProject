import API from "@/config/axiosConfig";

export const signUpRequest = async ({email, password, username}) => {
  try {
    const response = await API.post("/users/signup", {
      email,
      password,
      username,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};
export const signInRequest = async ({email, password}) => {
  try {
    const response = await API.post("/users/signin", {
      email,
      password,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};
