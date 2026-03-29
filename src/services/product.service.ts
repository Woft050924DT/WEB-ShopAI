'use client';

import type { ApiSuccess } from '@/src/models/api-response.model';
import type { ProductDetailResponse, ProductListResponse, ProductsQuery } from '@/src/models/product.model';
import { request } from './api-client.service';

export function formatCurrency(value: string | number) {
  const numericValue = typeof value === 'string' ? Number(value) : value;
  return `${new Intl.NumberFormat('vi-VN').format(numericValue)} d`;
}

export async function getProducts(query: ProductsQuery) {
  const params: Record<string, string> = {};

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    params[key] = typeof value === 'boolean' ? String(value) : String(value);
  });

  return request<ApiSuccess & ProductListResponse>('products', undefined, params);
}

export function getProduct(identifier: string) {
  return request<ApiSuccess & ProductDetailResponse>(`products/${identifier}`);
}
