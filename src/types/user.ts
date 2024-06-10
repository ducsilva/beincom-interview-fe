export interface IUser {
  createdAt?: string; // "2024-05-13T05:11:06.609Z";
  email?: string; // "silva@gmail.com";
  id?: string; // "6641a0e30ed2ab43a577e1d9";
  isDeleted?: boolean;
  role?: string; // "USER";
  updatedAt?: string; // "2024-05-13T05:11:06.609Z";
  username?: string; // "darkness";
  fullname?: string; // "darkness";
  avatar?: string;
  designation?: string;
}

export interface ICreateUser {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}
