import axiosInstance from "../utils/axiosInstance";

export const signUp = async (data) => {
  try {
    const resp = await axiosInstance.post("/create-user", data);
    return resp.data;
  } catch (error) {
    throw error.resp.data;
  }
};

export const signIn = async (data) => {
  try {
    const resp = await axiosInstance.post("/login-user", data);
    return resp.data;
  } catch (error) {
    throw error.resp.data;
  }
};

export const createBooking = async (data) => {
  try {
    const resp = await axiosInstance.post("/createbooking", data);
    return resp.data;
  } catch (error) {
    throw error.resp.data;
  }
};

export const getAllBokkings = async (params) => {
  try {
    const resp = await axiosInstance.get("/getallbooking", params);
    return resp.data;
  } catch (error) {
    throw error.resp.data;
  }
};
