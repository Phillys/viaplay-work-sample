import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

// Not ideal, should not depend upon Axios at all.
export type IHttpClientPromise<T> = AxiosPromise<T>;
export type IHttpRequestConfig = AxiosRequestConfig

export interface IHttpClient {
  get<T = any>(url: string, config?: IHttpRequestConfig): IHttpClientPromise<T>;
}

export function httpClientFactory(config?: IHttpRequestConfig): IHttpClient {
  return axios.create({
    headers: { 'Cache-Control': 'no-cache' },
    adapter: cacheAdapterEnhancer(axios.defaults.adapter),
    ...config
  });
}
