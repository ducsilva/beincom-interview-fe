import { ENDPOINT_URL } from "@/utils";
import axiosInstance from "./axiosService";
import { ISignIn, ISignUp } from "@/types";

export const authService = {
  async signIn({ email, password }: ISignIn): Promise<void> {
    return await axiosInstance.post(ENDPOINT_URL.LOGIN_URL, {
      email,
      password,
    });
  },
  async signUp({
    email,
    password,
    username,
    fullname,
  }: ISignUp): Promise<void> {
    console.log("signUp", email, password, username, fullname);
    return await axiosInstance.post(ENDPOINT_URL.SIGNUP, {
      email,
      password,
      username,
      fullname,
    });
  },
};
