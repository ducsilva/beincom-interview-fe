import { TOKEN_MANAGEMENT } from "@/utils";
import axios, { AxiosError, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000,
  headers: {
    ContentType: "Application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (req?: any) => {
    const token = await localStorage.getItem(TOKEN_MANAGEMENT.ACCESS_TOKEN);
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (err: AxiosError) => Promise.reject(err),
);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => Promise.resolve(res.data),
  async (err: AxiosError) => {
    return Promise.reject({ data: ((err || {}).response || {}).data });
  },
);

export default axiosInstance;
