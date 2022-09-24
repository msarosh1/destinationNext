import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

export const login = async (loginData) => {
  try {
    const response = await api.post(`login/`, loginData, {
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response) {
      console.log({ response });
      // save response -> token to localStorage
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
    const response = await api.post(`signup/`, signupData, {
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
