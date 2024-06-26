import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from 'consts/common';

const DEFAULT_AXIOS_INSTANCE = axios.create({
  baseURL: API_URL.BASE,
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
    throw err;
  },
);

const get = async <T>(url: string, config?: AxiosRequestConfig<unknown>) => {
  const res = await DEFAULT_AXIOS_INSTANCE.get<T>(url, config);

  return res.data;
};

const Axios = {
  get,
};
export default Axios;
