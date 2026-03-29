'use client';

import type { ApiSuccess } from '@/src/models/api-response.model';
import type { CreateOrderPayload, OrderResponse } from '@/src/models/order.model';
import { request } from './api-client.service';

export function createOrder(payload: CreateOrderPayload) {
  return request<ApiSuccess & OrderResponse>('orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getOrder(identifier: string) {
  return request<ApiSuccess & OrderResponse>(`orders/${identifier}`);
}
