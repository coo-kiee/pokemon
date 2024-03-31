import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { POKE_API_URL } from 'consts/common';

const DEFAULT_AXIOS_INSTANCE = axios.create({
  baseURL: POKE_API_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json; charset=UTF-8',
  },
});

// Interceptor Request
DEFAULT_AXIOS_INSTANCE.interceptors.request.use((request) => {
  return request;
});

// Interceptor Response
DEFAULT_AXIOS_INSTANCE.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err instanceof AxiosError) {
      throw Error(
        `[ERROR_ ${err.response?.status}]\n ${err.response?.data || err?.message}`,
      );
    } else if (err instanceof Error) throw Error(err.message);

    throw Error(String(err));
  },
);

const get = async <T>(url: string, config?: AxiosRequestConfig<unknown>) => {
  const res = await DEFAULT_AXIOS_INSTANCE.get(url, config);

  return res.data as T;
};

const Axios = {
  get,
};
export default Axios;
