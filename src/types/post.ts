import { IUser } from "./user";

export interface TPost {
  isDeleted?: boolean;
  title?: string;
  content?: string;
  banner?: string;
  category?: ICategory;
  user?: IUser;
  updatedAt?: string;
  createdAt?: string;
  id?: string | number;
}

export interface ICategory {
  isDeleted?: boolean;
  name?: string;
  updatedAt?: string;
  createdAt?: string;
  id?: string;
}

export interface ICreatePost {
  category?: string;
  title: string;
  content: string;
}
