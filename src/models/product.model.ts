'use client';

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

export type ProductsQuery = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  categoryId?: string;
  brandId?: string;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
};
