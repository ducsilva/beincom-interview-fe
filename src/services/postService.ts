import { ENDPOINT_URL } from "@/utils";
import axiosInstance from "./axiosService";
import { IParams } from "@/types";

export const postService = {
  async getPostList({ page, limit }: IParams): Promise<void> {
    return await axiosInstance.get(
      `${ENDPOINT_URL.GET_POST_LIST}?page=${page}&limit=${limit}`,
    );
  },
  async getPostDetail(id: string): Promise<void> {
    return await axiosInstance.get(`${ENDPOINT_URL.GET_DETAIL_POST}/${id}`);
  },
  async createNewPost(params): Promise<void> {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    return await axiosInstance.post(ENDPOINT_URL.CREATE_POST, params, config);
  },
  async getCategory({ page, limit }: IParams): Promise<void> {
    return await axiosInstance.get(
      `${ENDPOINT_URL.GET_CATEGORY_LIST}?page=${page}&limit=${limit}`,
    );
  },
};
