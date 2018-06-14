import axios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

// export type IHttpClient = AxiosInstance;
export type IHttpRequestConfig = AxiosRequestConfig;

// Not ideal, should not depend upon Axios at all.
export interface IHttpClient {
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}

export function httpClientFactory(config?: IHttpRequestConfig): IHttpClient {
  return axios.create({
    headers: { 'Cache-Control': 'no-cache' },
    adapter: cacheAdapterEnhancer(axios.defaults.adapter),
    ...config
  });
}
