import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

const token = localStorage.getItem("token");

export const addDestination = async (destinationData) => {
  try {
    const response = await api.post(`add-destination/`, destinationData, {
      headers: {
        Authorization: `Token ${token}`,
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
    console.log("error in: addDestination", { error });
    return false;
  }
};

export const updateDestination = async (destinationData) => {
  try {
    const response = await api.put(
      `update-destination/${destinationData?.id}`,
      destinationData,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-type": "application/json",
        },
      }
    );
    if (response) {
      console.log({ response });
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in: addDestination", { error });
    return false;
  }
};

export const deleteDestination = async (destinationData) => {
  try {
    const response = await api.delete(
      `delete-destination/${destinationData?.id}`,
      destinationData,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-type": "application/json",
        },
      }
    );
    if (response) {
      console.log({ response });
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in: addDestination", { error });
    return false;
  }
};
