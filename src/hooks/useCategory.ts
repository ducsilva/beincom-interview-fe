//@ts-ignore
"use client";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ICategory, IParams } from "@/types";
import { QueryKeys } from "@/utils";
import { postService } from "@/services";

export const useCategory = ({ limit = 10, page = 1 }: IParams) => {
  const [params] = useState<IParams>({
    limit,
    page,
  });

  const {
    data: category,
    refetch: refetchCategoryList,
  }: { data: any; refetch: () => void } = useQuery({
    queryKey: [QueryKeys.GET_CATEGORY],
    queryFn: () => postService.getCategory({ limit, page }),
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
    params,
    categoryList,
    refetchCategoryList,
  };
};
