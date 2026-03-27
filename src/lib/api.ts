'use client';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api';

type ApiSuccess = {
  success: true;
  message: string;
};

type ApiFailure = {
  success: false;
  message: string;
  details?: unknown;
};

export type ApiResponse<T> = (ApiSuccess & T) | ApiFailure;

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export type ProductImage = {
  id: string;
  imageUrl: string;
  altText: string;
  isPrimary: boolean;
  displayOrder: number;
};

export type ProductVariantOption = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  name: string;
  sku: string;
  price: string;
  comparePrice: string | null;
  stockQuantity: number;
  imageUrl: string | null;
  options: ProductVariantOption[];
};

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
};

export type ProductBrand = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  price: string;
  comparePrice: string | null;
  status: string;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  createdAt: string;
  updatedAt: string;
  category: ProductCategory | null;
  brand: ProductBrand | null;
  images: ProductImage[];
  variants: ProductVariant[];
};

export type ProductListResponse = {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  items: Product[];
};

export type ProductDetailResponse = {
  item: Product;
};

export type OrderAddress = {
  line1: string;
  line2: string | null;
  city: string;
  district: string;
  ward: string;
  postalCode: string;
  country: string;
};

export type OrderItem = {
  id: string;
  productId: string;
  variantId: string | null;
  productName: string;
  variantName: string | null;
  sku: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  shippingStatus: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  subtotal: string;
  shippingFee: string;
  taxAmount: string;
  discountAmount: string;
  totalAmount: string;
  paymentMethod: string;
  shippingMethod: string;
  notes: string | null;
  createdAt: string;
  items: OrderItem[];
};

export type OrderResponse = {
  order: Order;
};

export type ProductsQuery = {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryId?: string;
  brandId?: string;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
};

export type CreateOrderPayload = {
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddressLine1: string;
  shippingAddressLine2?: string;
  shippingCity: string;
  shippingDistrict: string;
  shippingWard: string;
  shippingPostalCode: string;
  shippingCountry: string;
  billingAddressLine1: string;
  billingAddressLine2?: string;
  billingCity: string;
  billingDistrict: string;
  billingWard: string;
  billingPostalCode: string;
  billingCountry: string;
  shippingFee: number;
  taxAmount: number;
  discountAmount: number;
  couponCode: string | null;
  paymentMethod: string;
  shippingMethod: string;
  notes?: string;
  items: Array<{
    productId: string;
    variantId?: string;
    quantity: number;
  }>;
};

class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

function buildUrl(path: string, query?: Record<string, string>) {
  const url = new URL(path, API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== '') {
        url.searchParams.set(key, value);
      }
    });
  }

  return url.toString();
}

async function request<T>(path: string, init?: RequestInit, query?: Record<string, string>): Promise<T> {
  const response = await fetch(buildUrl(path, query), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  const data = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !data.success) {
    throw new ApiError(data.message || 'Co loi xay ra khi goi API.', response.status, 'details' in data ? data.details : undefined);
  }

  return data as T;
}

export function formatCurrency(value: string | number) {
  const numericValue = typeof value === 'string' ? Number(value) : value;
  return `${new Intl.NumberFormat('vi-VN').format(numericValue)} d`;
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

export async function healthCheck() {
  return request<ApiSuccess>('health');
}

export async function register(payload: { fullName: string; email: string; password: string }) {
  return request<ApiSuccess & AuthResponse>('auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function login(payload: { email: string; password: string }) {
  return request<ApiSuccess & AuthResponse>('auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
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

export async function getProduct(identifier: string) {
  return request<ApiSuccess & ProductDetailResponse>(`products/${identifier}`);
}

export async function createOrder(payload: CreateOrderPayload) {
  return request<ApiSuccess & OrderResponse>('orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getOrder(identifier: string) {
  return request<ApiSuccess & OrderResponse>(`orders/${identifier}`);
}

