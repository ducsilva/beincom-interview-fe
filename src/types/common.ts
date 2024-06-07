export interface IParams {
  page?: number;
  limit?: number;
  [key: string]: any;
}

export type TListResponse<T> = {
  data: T[];
  message: "OK" | "ERROR";
  statusCode: number;
  pagination: TPagination;
};

export type TPagination = {
  total?: number;
  totalPage?: number;
  page?: number;
  limit?: number;
};
