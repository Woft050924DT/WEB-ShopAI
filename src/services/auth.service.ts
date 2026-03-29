'use client';

import type { ApiSuccess } from '@/src/models/api-response.model';
import type { AuthResponse, AuthResponseLike, AuthUser } from '@/src/models/auth.model';
import { ApiError, request } from './api-client.service';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function extractRoleValue(rawUser: Record<string, unknown>): unknown {
  if (typeof rawUser.isAdmin === 'boolean') {
    return rawUser.isAdmin ? 'admin' : 'user';
  }

  if (typeof rawUser.role === 'string') {
    return rawUser.role;
  }

  if (isRecord(rawUser.role)) {
    return rawUser.role.name ?? rawUser.role.code ?? rawUser.role.value;
  }

  if (Array.isArray(rawUser.roles)) {
    const firstRole = rawUser.roles.find((role) => typeof role === 'string' || isRecord(role));

    if (typeof firstRole === 'string') {
      return firstRole;
    }

    if (isRecord(firstRole)) {
      return firstRole.name ?? firstRole.code ?? firstRole.value;
    }
  }

  return rawUser.role;
}

function normalizeUserRole(role: unknown): AuthUser['role'] {
  if (typeof role !== 'string') {
    return 'user';
  }

  const normalizedRole = role.trim().toLowerCase();

  if (
    normalizedRole === 'admin' ||
    normalizedRole === 'administrator' ||
    normalizedRole === 'role_admin' ||
    normalizedRole === 'super_admin' ||
    normalizedRole === 'superadmin'
  ) {
    return 'admin';
  }

  if (
    normalizedRole === 'customer' ||
    normalizedRole === 'user' ||
    normalizedRole === 'member' ||
    normalizedRole === 'role_user'
  ) {
    return 'user';
  }

  return 'user';
}

function normalizeAuthUser(rawUser: unknown, payload?: unknown): AuthUser {
  if (!isRecord(rawUser)) {
    throw new ApiError('Khong doc duoc thong tin nguoi dung tu API.', 500, payload);
  }

  const user: AuthUser = {
    id: typeof rawUser.id === 'string' ? rawUser.id : String(rawUser.id ?? ''),
    fullName:
      (typeof rawUser.fullName === 'string' && rawUser.fullName) ||
      (typeof rawUser.name === 'string' && rawUser.name) ||
      '',
    email: typeof rawUser.email === 'string' ? rawUser.email : '',
    role: normalizeUserRole(extractRoleValue(rawUser)),
    createdAt:
      (typeof rawUser.createdAt === 'string' && rawUser.createdAt) ||
      new Date().toISOString(),
  };

  if (!user.id || !user.fullName || !user.email) {
    throw new ApiError('Thong tin nguoi dung tra ve khong day du.', 500, payload);
  }

  return user;
}

function normalizeAuthResponse(payload: unknown): AuthResponse {
  if (!isRecord(payload)) {
    throw new ApiError('Du lieu dang nhap khong hop le.', 500);
  }

  const nested = isRecord(payload.data) ? payload.data : undefined;
  const token =
    (typeof payload.token === 'string' && payload.token) ||
    (typeof payload.accessToken === 'string' && payload.accessToken) ||
    (nested && typeof nested.token === 'string' && nested.token) ||
    (nested && typeof nested.accessToken === 'string' && nested.accessToken) ||
    '';

  const rawUser =
    (isRecord(payload.user) && payload.user) ||
    (nested && isRecord(nested.user) && nested.user) ||
    (isRecord(payload.account) && payload.account) ||
    undefined;

  if (!token || !rawUser) {
    throw new ApiError('Khong doc duoc thong tin dang nhap tu API.', 500, payload);
  }

  return {
    token: token || undefined,
    user: normalizeAuthUser(rawUser, payload),
  };
}

export async function register(payload: { fullName: string; email: string; password: string }) {
  const response = await request<ApiSuccess & AuthResponseLike>('auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return {
    ...response,
    ...normalizeAuthResponse(response),
  };
}

export async function login(payload: { email: string; password: string }) {
  const response = await request<ApiSuccess & AuthResponseLike>('auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return {
    ...response,
    ...normalizeAuthResponse(response),
  };
}

export async function getCurrentUser() {
  const response = await request<ApiSuccess & { user: AuthUser }>('auth/me');
  return normalizeAuthUser(response.user, response);
}

export function logout() {
  return request<ApiSuccess>('auth/logout', {
    method: 'POST',
  });
}
