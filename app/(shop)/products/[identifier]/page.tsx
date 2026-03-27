'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatCurrency, getProduct, normalizeApiError, type Product, type ProductVariant } from '@/src/lib/api';
import { upsertCartItem } from '@/src/lib/storage';

function getDefaultVariant(product: Product) {
  return product.variants[0];
}

export default function ProductDetailPage() {
  const params = useParams<{ identifier: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [variant, setVariant] = useState<ProductVariant | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    const fetchProduct = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await getProduct(params.identifier);

        if (!cancelled) {
          setProduct(response.item);
          setVariant(getDefaultVariant(response.item));
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

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [params.identifier]);

  const activePrice = variant?.price ?? product?.price ?? '0';
  const activeComparePrice = variant?.comparePrice ?? product?.comparePrice;
  const activeImage = variant?.imageUrl ?? product?.images.find((image) => image.isPrimary)?.imageUrl ?? product?.images[0]?.imageUrl ?? '';

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    upsertCartItem(product, variant, quantity);
    setSuccessMessage('Da them san pham vao gio hang.');
  };

  return (
    <div className="bg-[#F4F6FB]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {loading ? <p className="text-sm text-[#667085]">Dang tai chi tiet san pham...</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        {product ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_460px]">
            <div className="overflow-hidden rounded-[28px] border border-[#DDE3EE] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
              <div className="relative aspect-square bg-[#F8FAFC]">
                {activeImage ? (
                  <Image src={activeImage} alt={product.name} fill className="object-cover" unoptimized />
                ) : (
                  <div className="grid h-full place-items-center text-sm text-[#98A2B3]">Khong co anh</div>
                )}
              </div>

              {product.images.length > 1 ? (
                <div className="grid grid-cols-4 gap-3 p-5">
                  {product.images.slice(0, 4).map((image) => (
                    <div key={image.id} className="relative overflow-hidden rounded-2xl border border-[#E7ECF3] bg-[#F8FAFC]">
                      <Image src={image.imageUrl} alt={image.altText} width={160} height={96} className="h-24 w-full object-cover" unoptimized />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <section className="rounded-[28px] border border-[#DDE3EE] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
              <button onClick={() => router.back()} className="text-sm font-semibold text-[#2563EB]">
                Quay lai
              </button>
              <h1 className="mt-4 text-3xl font-black text-[#111827]">{product.name}</h1>
              <p className="mt-2 text-sm text-[#667085]">{product.shortDescription || product.description}</p>

              <div className="mt-5 flex items-end gap-3">
                <p className="text-4xl font-black text-[#EF3D32]">{formatCurrency(activePrice)}</p>
                {activeComparePrice ? <p className="text-lg text-[#98A2B3] line-through">{formatCurrency(activeComparePrice)}</p> : null}
              </div>

              <div className="mt-6 grid gap-4 rounded-[22px] bg-[#F8FAFC] p-4 text-sm text-[#667085]">
                <p>SKU: {variant?.sku ?? product.sku}</p>
                <p>Danh muc: {product.category?.name ?? 'Dang cap nhat'}</p>
                <p>Thuong hieu: {product.brand?.name ?? 'Dang cap nhat'}</p>
              </div>

              {product.variants.length ? (
                <div className="mt-6">
                  <p className="text-sm font-bold text-[#111827]">Phien ban</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {product.variants.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setVariant(item)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                          variant?.id === item.id
                            ? 'border-[#EF3D32] bg-[#FFF5F4] text-[#EF3D32]'
                            : 'border-[#D6DDE8] text-[#111827]'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-6">
                <p className="text-sm font-bold text-[#111827]">So luong</p>
                <div className="mt-3 inline-flex items-center overflow-hidden rounded-2xl border border-[#D6DDE8] bg-white">
                  <button
                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                    className="grid h-12 w-12 place-items-center text-xl font-bold text-[#111827]"
                  >
                    -
                  </button>
                  <span className="grid h-12 w-12 place-items-center text-base font-semibold text-[#111827]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((current) => current + 1)}
                    className="grid h-12 w-12 place-items-center text-xl font-bold text-[#111827]"
                  >
                    +
                  </button>
                </div>
              </div>

              {successMessage ? <p className="mt-4 text-sm text-[#16A34A]">{successMessage}</p> : null}

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={handleAddToCart}
                  className="h-12 rounded-2xl border border-[#D6DDE8] bg-white font-semibold text-[#111827]"
                >
                  Them vao gio
                </button>
                <button
                  onClick={() => {
                    handleAddToCart();
                    router.push('/cart');
                  }}
                  className="h-12 rounded-2xl bg-[#EF3D32] font-bold text-white"
                >
                  Mua ngay
                </button>
              </div>

              <div className="mt-8 border-t border-[#E7ECF3] pt-6">
                <h2 className="text-xl font-black text-[#111827]">Mo ta</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#667085]">{product.description || 'Dang cap nhat mo ta chi tiet.'}</p>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </div>
  );
}
