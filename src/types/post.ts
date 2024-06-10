import { IUser } from "./user";

export interface TPost {
  isDeleted?: boolean;
  title?: string;
  content?: string;
  banner?: string;
  category?: ICategory;
  user?: IUser; // author of the post
  updatedAt?: string;
  createdAt?: string;
  id?: string | number;
  comments: IComment[];
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

export interface IComment {
  _id?: string; //"6666ced9b60501ec7293cecc";
  isDeleted?: boolean; //false;
  content?: string; //"Comment nef";
  postId?: string; //"6666cdafb60501ec7293ceaa";
  userId?: IUser; // user created comment
  updatedAt?: string;
  createdAt?: string;
  id?: string; //"6666ced9b60501ec7293cecc";
}
