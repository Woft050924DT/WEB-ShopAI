'use client';

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
};

export type AuthResponse = {
  token?: string;
  user: AuthUser;
};

export type AuthResponseLike = Partial<AuthResponse> & {
  accessToken?: string;
  data?: Partial<AuthResponseLike>;
  account?: Partial<AuthUser>;
};
