import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
  withCredentials: true,
});

export const login = async (loginData) => {
  try {
    const response = await api.post(`login`, loginData, {
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response) {
      console.log({ response });
      localStorage.setItem("isLoggedin", response?.data?.success);
      localStorage.setItem("username", response?.data?.user?.username);
      localStorage.setItem("id", response?.data?.user?._id);
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in: login", { error });
    return false;
  }
};

export const signup = async (signupData) => {
  try {
    console.log({ signupData });
    const response = await api.post(`signup`, signupData, {
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response) {
      console.log({ response });
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in: signup", { error });
    return false;
  }
};

export const logout = async () => {
  try {
    const response = await api.get(`logout`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response) {
      console.log({ response });
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in: logout", { error });
    return false;
  }
};

export const checkAuth = async () => {
  try {
    console.log("here in checkauth");
    const response = await api.get(`auth`, {});
    if (response) {
      console.log({ response });
      localStorage.setItem("id", response?.data?.id);
      localStorage.setItem("username", response?.data?.username);
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in: logout", { error });
    return false;
  }
};
