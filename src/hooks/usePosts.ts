//@ts-ignore
"use client";
import { useMemo, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ICategory, IParams, TPost } from "@/types";
import { QueryKeys } from "@/utils";
import { postService } from "@/services";

export const usePosts = (
  { limit = 10, page = 1 }: IParams,
  isCategory?: boolean,
  postId?: string,
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
    enabled: !isCategory || !!page || !!limit,
  });

  const { data: category }: { data: any } = useQuery({
    queryKey: [QueryKeys.GET_CATEGORY],
    queryFn: () => postService.getCategory({ limit, page }),
    enabled: isCategory,
  });

  const { data: postDetail }: { data: TPost } = useQuery({
    queryKey: [`DetailPost-${postId}`],
    queryFn: () => postService.getPostDetail(postId),
    enabled: !!postId,
  });

  const categoryList: ICategory[] = useMemo(() => {
    return category?.items?.map((item: ICategory) => {
      return {
        value: item?.id,
        label: item?.name?.charAt(0)?.toUpperCase() + item?.name?.slice(1),
      };
    });
  }, [category]);

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
    categoryList,
    postDetail,
  };
};
