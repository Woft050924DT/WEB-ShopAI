'use client';

import type { AuthUser } from '@/src/models/auth.model';
import type { Order } from '@/src/models/order.model';
import type { Product, ProductVariant } from '@/src/models/product.model';

const KEYS = {
  auth: 'vietshop_auth',
  cart: 'vietshop_cart',
  address: 'vietshop_address',
  orders: 'vietshop_orders',
};

export type StoredAuth = {
  user: AuthUser;
  token?: string;
};

export type StoredCartItem = {
  productId: string;
  variantId?: string;
  quantity: number;
  selected: boolean;
  productSnapshot: {
    id: string;
    name: string;
    slug: string;
    price: string;
    comparePrice: string | null;
    imageUrl: string | null;
    shortDescription: string;
    sku: string;
    variantName?: string;
    variantPrice?: string;
    variantComparePrice?: string | null;
    variantSku?: string;
  };
};

export type StoredAddress = {
  fullName: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  district: string;
  ward: string;
  postalCode: string;
  country: string;
  notes: string;
};

function isBrowser() {
  return typeof window !== 'undefined';
}

function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) {
    return fallback;
  }

  const rawValue = window.localStorage.getItem(key);

  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event('vietshop-storage'));
}

export function getStoredAuth() {
  const auth = readJson<StoredAuth | null>(KEYS.auth, null);

  if (!auth?.user) {
    return null;
  }

  return auth;
}

export function setStoredAuth(value: StoredAuth) {
  writeJson(KEYS.auth, value);
}

export function getStoredToken() {
  return getStoredAuth()?.token;
}

export function clearStoredAuth() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(KEYS.auth);
  window.dispatchEvent(new Event('vietshop-storage'));
}

export function clearStoredAddress() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(KEYS.address);
  window.dispatchEvent(new Event('vietshop-storage'));
}

export function clearSessionStorage() {
  clearStoredAuth();
  clearStoredAddress();
}

export function getStoredCart() {
  return readJson<StoredCartItem[]>(KEYS.cart, []);
}

export function setStoredCart(items: StoredCartItem[]) {
  writeJson(KEYS.cart, items);
}

export function upsertCartItem(product: Product, variant?: ProductVariant, quantity = 1) {
  const currentItems = getStoredCart();
  const existingIndex = currentItems.findIndex(
    (item) => item.productId === product.id && (item.variantId ?? '') === (variant?.id ?? '')
  );

  const nextItem: StoredCartItem = {
    productId: product.id,
    variantId: variant?.id,
    quantity,
    selected: true,
    productSnapshot: {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      comparePrice: product.comparePrice,
      imageUrl: variant?.imageUrl ?? product.images.find((image) => image.isPrimary)?.imageUrl ?? product.images[0]?.imageUrl ?? null,
      shortDescription: product.shortDescription,
      sku: product.sku,
      variantName: variant?.name,
      variantPrice: variant?.price,
      variantComparePrice: variant?.comparePrice,
      variantSku: variant?.sku,
    },
  };

  if (existingIndex >= 0) {
    currentItems[existingIndex] = {
      ...currentItems[existingIndex],
      quantity: currentItems[existingIndex].quantity + quantity,
      selected: true,
      productSnapshot: nextItem.productSnapshot,
    };
  } else {
    currentItems.push(nextItem);
  }

  setStoredCart(currentItems);
  return currentItems;
}

export function getStoredAddress() {
  return readJson<StoredAddress>(KEYS.address, {
    fullName: '',
    email: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    district: '',
    ward: '',
    postalCode: '',
    country: 'Vietnam',
    notes: '',
  });
}

export function setStoredAddress(address: StoredAddress) {
  writeJson(KEYS.address, address);
}

export function getStoredOrders() {
  return readJson<Order[]>(KEYS.orders, []);
}

export function addStoredOrder(order: Order) {
  const currentOrders = getStoredOrders().filter((item) => item.id !== order.id);
  currentOrders.unshift(order);
  writeJson(KEYS.orders, currentOrders.slice(0, 10));
}
