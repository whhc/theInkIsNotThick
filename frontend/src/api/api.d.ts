import * as axios from 'axios';

declare module 'axios' {
  export interface SuccessData<T> {
    data: T;
    status: number;
    message: string;
    [k: string]: any;
  }
}

export type Post = <T>(
  url: string,
  data?: object,
  config?: axios.AxiosRequestConfig
) => Promise<axios.SuccessData<T>>;

export type Get = <T>(
  url: string,
  params?: object,
  config?: axios.AxiosRequestConfig
) => Promise<axios.SuccessData<T>>;

export type Put = <T>(
  url: string,
  data?: object,
  config?: axios.AxiosRequestConfig
) => Promise<axios.SuccessData<T>>;

export type Del = <T>(
  url: string,
  data?: object,
  config?: axios.AxiosRequestConfig
) => Promise<axios.SuccessData<T>>;
