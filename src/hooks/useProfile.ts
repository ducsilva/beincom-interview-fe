//@ts-ignore
"use client";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/utils";
import { userService } from "@/services";

export const useProfile = (username: string) => {
  const {
    isLoading,
    data: profileUser,
    refetch: refetchUserProfile,
  }: { data: any; refetch: () => void; isLoading: boolean } = useQuery({
    queryKey: [QueryKeys.GET_LIST_SEARCH, username],
    queryFn: () => userService.getProfileByUsername(username),
    enabled: !!username,
  });

  return {
    profileUser,
    refetchUserProfile,
    isLoading,
  };
};
