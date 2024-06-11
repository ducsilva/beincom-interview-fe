//@ts-ignore
"use client";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/utils";
import { postService } from "@/services";

export const useSearchList = (search: string) => {
  const {
    isLoading,
    data: searchList,
    refetch: refetchSearchList,
  }: { data: any; refetch: () => void; isLoading: boolean } = useQuery({
    queryKey: [QueryKeys.GET_LIST_SEARCH, search],
    queryFn: () => postService.getSearchList(search),
    enabled: !!search,
  });

  return {
    searchList,
    refetchSearchList,
    isLoading,
  };
};
