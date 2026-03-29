'use client';

export type ApiSuccess = {
  success: true;
  message: string;
};

export type ApiFailure = {
  success: false;
  message: string;
  details?: unknown;
};

export type ApiResponse<T> = (ApiSuccess & T) | ApiFailure;
