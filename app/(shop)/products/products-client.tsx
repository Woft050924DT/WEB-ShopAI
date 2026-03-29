'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Product } from '@/src/models/product.model';
import { normalizeApiError } from '@/src/services/api-client.service';
import { formatCurrency, getProducts } from '@/src/services/product.service';

function getProductImage(product: Product) {
  return product.images.find((image) => image.isPrimary)?.imageUrl ?? product.images[0]?.imageUrl ?? '';
}

export default function ProductsClient({ initialSearch, initialFeatured }: { initialSearch: string; initialFeatured: boolean }) {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await getProducts({
          page,
          pageSize: 12,
          status: 'active',
          search: initialSearch || undefined,
          featured: initialFeatured || undefined,
        });

        if (!cancelled) {
          setItems(response.items);
          setTotalPages(response.pagination.totalPages || 1);
        }
      } catch (err) {
        if (!cancelled) {
          setError(normalizeApiError(err));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [initialFeatured, initialSearch, page]);

  useEffect(() => {
    setPage(1);
  }, [initialFeatured, initialSearch]);

  return (
    <div className="bg-[#F4F6FB]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <div className="flex flex-col gap-3 border-b border-[#E7ECF3] pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-black text-[#111827]">San pham</h1>
              <p className="mt-2 text-sm text-[#667085]">
                {initialSearch ? `Ket qua cho "${initialSearch}"` : initialFeatured ? 'Danh sach san pham noi bat' : 'Tat ca san pham'}
              </p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] px-4 py-3 text-sm text-[#667085]">
              Trang {page}/{totalPages}
            </div>
          </div>

          {loading ? <p className="py-10 text-sm text-[#667085]">Dang tai san pham...</p> : null}
          {error ? <p className="py-10 text-sm text-red-600">{error}</p> : null}

          {!loading && !error ? (
            <>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((product) => {
                  const imageUrl = getProductImage(product);

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug || product.id}`}
                      className="overflow-hidden rounded-[24px] border border-[#DDE3EE] bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1"
                    >
                      <div className="relative h-56 bg-[#F8FAFC]">
                        {imageUrl ? (
                          <Image src={imageUrl} alt={product.name} fill className="object-cover" unoptimized />
                        ) : (
                          <div className="grid h-full place-items-center text-sm text-[#98A2B3]">Khong co anh</div>
                        )}
                      </div>

                      <div className="space-y-3 p-5">
                        <div className="flex flex-wrap gap-2 text-xs font-bold">
                          {product.featured ? <span className="rounded-full bg-[#FFF5F4] px-3 py-1 text-[#EF3D32]">Noi bat</span> : null}
                          {product.newArrival ? <span className="rounded-full bg-[#EEF6FF] px-3 py-1 text-[#2563EB]">Moi</span> : null}
                          {product.bestSeller ? <span className="rounded-full bg-[#ECFDF3] px-3 py-1 text-[#16A34A]">Ban chay</span> : null}
                        </div>

                        <div>
                          <h2 className="text-lg font-bold text-[#111827]">{product.name}</h2>
                          <p className="mt-1 text-sm text-[#667085]">{product.shortDescription || product.brand?.name || 'San pham VietShop'}</p>
                        </div>

                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <p className="text-2xl font-black text-[#EF3D32]">{formatCurrency(product.price)}</p>
                            {product.comparePrice ? (
                              <p className="text-sm text-[#98A2B3] line-through">{formatCurrency(product.comparePrice)}</p>
                            ) : null}
                          </div>
                          <span className="text-sm font-semibold text-[#2563EB]">Xem chi tiet</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {!items.length ? <p className="py-10 text-sm text-[#667085]">Khong tim thay san pham phu hop.</p> : null}

              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page <= 1}
                  className="rounded-xl border border-[#D6DDE8] px-4 py-2 text-sm font-semibold text-[#111827] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Truoc
                </button>
                <button
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={page >= totalPages}
                  className="rounded-xl bg-[#EF3D32] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Sau
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
