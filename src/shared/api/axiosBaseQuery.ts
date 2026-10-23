/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import { http } from './http';

/**
 * baseQuery de RTK Query implementado sobre la instancia Axios compartida.
 */
export const axiosBaseQuery =
  (): BaseQueryFn<
    { url: string; method?: AxiosRequestConfig['method']; params?: AxiosRequestConfig['params'] },
    unknown,
    { status?: number; message: string }
  > =>
  async ({ url, method = 'GET', params }) => {
    try {
      const result = await http.request({ url, method, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          message: err.message,
        },
      };
    }
  };
