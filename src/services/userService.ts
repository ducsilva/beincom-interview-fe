import { ENDPOINT_URL } from "@/utils";
import axiosInstance from "./axiosService";

export const userService = {
  async getProfile(): Promise<void> {
    return await axiosInstance.get(ENDPOINT_URL.PROFILE);
  },
  async getProfileByUsername(username: string): Promise<void> {
    return await axiosInstance.get(
      `${ENDPOINT_URL.GET_PROFILE_USERNAME}?username=${username}`
    );
  },
  async updateUserAvatar(params): Promise<void> {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    return await axiosInstance.post(ENDPOINT_URL.UPLOAD_AVATAR, params, config);
  },
};
