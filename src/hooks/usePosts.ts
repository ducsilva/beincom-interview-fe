//@ts-ignore
"use client";
import { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { IParams, TPost } from "@/types";
import { QueryKeys } from "@/utils";
import { postService } from "@/services";

export const usePosts = (
  { limit = 10, page = 1 }: IParams,
  postId?: string
) => {
  const [params] = useState<IParams>({
    limit,
    page,
  });

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetching,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: [QueryKeys.GET_LIST_POST, params],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      postService.getPostList({ ...params, page: pageParam }),
    initialPageParam: page,
    getNextPageParam: (lastPage: any, allPages) => {
      if (
        +lastPage?.pagination?.page * params.limit >=
        +lastPage?.pagination?.total
      ) {
        return undefined;
      }
      return allPages.length + 1;
    },
    enabled: !!page || !!limit,
  });

  const { data: postDetail }: { data: TPost } = useQuery({
    queryKey: [`DetailPost-${postId}`],
    queryFn: () => postService.getPostDetail(postId),
    enabled: !!postId,
  });

  return {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetching,
    refetch,
    isRefetching,
    params,
    postDetail,
  };
};
