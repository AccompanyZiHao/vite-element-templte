import { AxiosRequestConfig } from 'axios';
import service from '@/utils/http/http';
import { ResponseType } from '@/type/http';

export const http = {
  get<T = ResponseType>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config);
  },
  post<T = ResponseType>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.post(url, params, config);
  },
  postForm<T = ResponseType>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.post(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...config,
    });
  },
};
