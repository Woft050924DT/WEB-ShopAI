'use client';

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
