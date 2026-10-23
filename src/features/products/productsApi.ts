/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../shared/api/axiosBaseQuery';
import { PRODUCTS_PATH } from '../../shared/config/env';
import type { Product, ProductListResponse } from '../../types/product';

/**
 * Normaliza la respuesta de lista: DummyJSON devuelve `{ products: [...] }`,
 * mientras el backend Topaz devuelve un array directo. Soporta ambos.
 */
function extractProducts(raw: unknown): Product[] {
  if (Array.isArray(raw)) {
    return raw as Product[];
  }
  return (raw as ProductListResponse)?.products ?? [];
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({ url: PRODUCTS_PATH }),
      transformResponse: extractProducts,
      providesTags: ['Product'],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => ({ url: `${PRODUCTS_PATH}/${id}` }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
