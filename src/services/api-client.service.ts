'use client';

import axios from 'axios';
import { getStoredToken } from '@/src/lib/storage';
import type { ApiResponse } from '@/src/models/api-response.model';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export async function request<T>(
  path: string,
  init?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: string;
    headers?: Record<string, string>;
  },
  query?: Record<string, string>
): Promise<T> {
  try {
    const token = getStoredToken();
    const response = await apiClient.request<ApiResponse<T>>({
      url: path,
      method: init?.method ?? 'GET',
      data: init?.body ? JSON.parse(init.body) : undefined,
      params: query,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init?.headers,
      },
    });

    const data = response.data;

    if (!data.success) {
      throw new ApiError(data.message || 'Co loi xay ra khi goi API.', response.status, 'details' in data ? data.details : undefined);
    }

    return data as T;
  } catch (error) {
    if (axios.isAxiosError<ApiResponse<T>>(error)) {
      const message = error.response?.data?.message || error.message || 'Co loi xay ra khi goi API.';
      const status = error.response?.status ?? 500;
      const details = error.response?.data && 'details' in error.response.data ? error.response.data.details : undefined;
      throw new ApiError(message, status, details);
    }

    throw error;
  }
}

export function normalizeApiError(error: unknown) {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Co loi khong xac dinh. Vui long thu lai.';
}

export function healthCheck() {
  return request('health');
}
