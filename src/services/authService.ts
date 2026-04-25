import { axiosInstance } from "../utils/axiosIntance";


const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(
      "https://memory-game-back-end.vercel.app/api/auth/login",
      {
        email,
        password,
      }
    );

    return response.data;
  } catch (error: any) {
    console.log("Login error:", error);
    throw error.response?.data || { message: "An unknown error ocurred" };
  }
};

const register = async (username: string, email: string, password: string) => {
  try {
    const response = await axiosInstance.post(
      "https://memory-game-back-end.vercel.app/api/auth/register",
      {
        username,
        email,
        password,
      }
    );
    return response.data;
  } catch (error: any) {
    console.log("Register error:", error);
    throw error.response?.data || { message: "An unknown error ocurred" };
  }
};

const getProfile = async () => {
  try {
    const response = await axiosInstance.get(
      "https://memory-game-back-end.vercel.app/api/auth/profile"
    );
    return response.data;
  } catch (error: any) {
    console.log("Get Profile error:", error);
    throw error.response?.data || { message: "An unknown error ocurred" };
  }
};

const updateProfile = async (userData: any) => {
  try {
    const response = await axiosInstance.put(
      "https://memory-game-back-end.vercel.app/api/auth/profile",
      userData
    );
    return response.data;
  } catch (error: any) {
    console.log("Update Profile error:", error);
    throw error.response?.data || { message: "An unknown error ocurred" };
  }
};

const changePassword = async (passwords: any) => {
  try {
    const response = await axiosInstance.post(
      "https://memory-game-back-end.vercel.app/api/auth/change-password",
      passwords
    );
    return response.data;
  } catch (error: any) {
    console.log("Change Password error:", error);
    throw error.response?.data || { message: "An unknown error ocurred" };
  }
};

const authService = {
  login,
  register,
  getProfile,
  updateProfile,
  changePassword,
};

export default authService;
