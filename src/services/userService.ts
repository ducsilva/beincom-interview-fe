import { ENDPOINT_URL } from "@/utils";
import axiosInstance from "./axiosService";

export const userService = {
  async getProfile(): Promise<void> {
    return await axiosInstance.get(ENDPOINT_URL.PROFILE);
  },
};
