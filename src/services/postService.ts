import { ENDPOINT_URL } from "@/utils";
import axiosInstance from "./axiosService";
import { IParams } from "@/types";

export const postService = {
  async getPostList({ page, limit }: IParams): Promise<void> {
    return await axiosInstance.get(
      `${ENDPOINT_URL.GET_POST_LIST}?page=${page}&limit=${limit}`
    );
  },
  async getPostDetail(id: string): Promise<void> {
    return await axiosInstance.get(`${ENDPOINT_URL.GET_DETAIL_POST}/${id}`);
  },
  async getSearchList(keyword: string): Promise<void> {
    return await axiosInstance.get(
      `${ENDPOINT_URL.SEARCH_POST_LIST}?query=${keyword}`
    );
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
      `${ENDPOINT_URL.GET_CATEGORY_LIST}?page=${page}&limit=${limit}`
    );
  },
  async createCategory({ name }: { name: string }): Promise<void> {
    return await axiosInstance.post(ENDPOINT_URL.CREATE_CATEGORY, { name });
  },
  async addComment({
    content,
    postId,
  }: {
    content: string;
    postId: string;
  }): Promise<void> {
    return await axiosInstance.post(ENDPOINT_URL.CREATE_COMMENT, {
      content,
      postId,
    });
  },
  async updateComment({
    content,
    id,
  }: {
    content: string;
    id: string;
  }): Promise<void> {
    return await axiosInstance.post(`${ENDPOINT_URL.UPDATE_COMMENT}/${id}`, {
      content,
    });
  },
  async deleteComment({ id }: { content: string; id: string }): Promise<void> {
    return await axiosInstance.delete(`${ENDPOINT_URL.DELETE_COMMENT}/${id}`);
  },
};
