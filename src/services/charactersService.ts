/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { axiosInstance } from "../utils/axiosIntance";

export const generateRandomCharacters = async () => {
  try {
    const randomPage =
      Math.floor(
        Math.random() * Number(import.meta.env.VITE_LIMIT_PAGE_CHARACTERS)
      ) + 1;
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_CHARACTERS_API_URL}/character?page=${randomPage}`
    );
    return response.data?.results || [];
  } catch (error: any) {
    console.error("Error fetching random characters:", error);
    throw (
      error.response?.data || {
        message: "Failed to generate random characters",
      }
    );
  }
};
