'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { createOrder, formatCurrency, normalizeApiError } from '@/src/lib/api';
import { addStoredOrder, getStoredAddress, getStoredAuth, getStoredCart, setStoredCart, type StoredAddress, type StoredCartItem } from '@/src/lib/storage';

function getDisplayPrice(item: StoredCartItem) {
  return item.productSnapshot.variantPrice ?? item.productSnapshot.price;
}

function getDisplayComparePrice(item: StoredCartItem) {
  return item.productSnapshot.variantComparePrice ?? item.productSnapshot.comparePrice;
}

export default function CartPage() {
  const [items, setItems] = useState<StoredCartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [address, setAddress] = useState<StoredAddress>(getStoredAddress());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setItems(getStoredCart());
    setAddress(getStoredAddress());
    setLoading(false);
  }, []);

  const selectedItems = items.filter((item) => item.selected);
  const selectedCount = selectedItems.length;
  const allSelected = items.length > 0 && items.every((item) => item.selected);

  const subtotal = useMemo(
    () => selectedItems.reduce((sum, item) => sum + Number(getDisplayPrice(item)) * item.quantity, 0),
    [selectedItems]
  );

  const shippingFee = selectedCount > 0 ? 30000 : 0;
  const total = subtotal + shippingFee;

  const syncItems = (nextItems: StoredCartItem[]) => {
    setItems(nextItems);
    setStoredCart(nextItems);
  };

  const toggleAll = () => {
    syncItems(items.map((item) => ({ ...item, selected: !allSelected })));
  };

  const toggleItem = (productId: string, variantId?: string) => {
    syncItems(
      items.map((item) =>
        item.productId === productId && (item.variantId ?? '') === (variantId ?? '')
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };

  const changeQuantity = (productId: string, variantId: string | undefined, delta: number) => {
    syncItems(
      items.map((item) =>
        item.productId === productId && (item.variantId ?? '') === (variantId ?? '')
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (productId: string, variantId?: string) => {
    syncItems(items.filter((item) => !(item.productId === productId && (item.variantId ?? '') === (variantId ?? ''))));
  };

  const handleCheckout = async () => {
    setError('');
    setSuccessMessage('');

    if (!selectedItems.length) {
      setError('Vui long chon it nhat 1 san pham.');
      return;
    }

    if (!address.fullName || !address.email || !address.phone || !address.line1 || !address.city || !address.district || !address.ward) {
      setError('Vui long cap nhat day du thong tin giao hang trong trang dia chi.');
      return;
    }

    setSubmitting(true);

    try {
      const auth = getStoredAuth();
      const response = await createOrder({
        userId: auth?.user.id,
        customerName: address.fullName,
        customerEmail: address.email,
        customerPhone: address.phone,
        shippingAddressLine1: address.line1,
        shippingAddressLine2: address.line2,
        shippingCity: address.city,
        shippingDistrict: address.district,
        shippingWard: address.ward,
        shippingPostalCode: address.postalCode,
        shippingCountry: address.country,
        billingAddressLine1: address.line1,
        billingAddressLine2: address.line2,
        billingCity: address.city,
        billingDistrict: address.district,
        billingWard: address.ward,
        billingPostalCode: address.postalCode,
        billingCountry: address.country,
        shippingFee,
        taxAmount: 0,
        discountAmount: 0,
        couponCode: couponCode || null,
        paymentMethod: 'cod',
        shippingMethod: 'standard',
        notes: address.notes,
        items: selectedItems.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      });

      addStoredOrder(response.order);
      const remainingItems = items.filter((item) => !item.selected);
      syncItems(remainingItems);
      setSuccessMessage(`Tao don hang thanh cong: ${response.order.orderNumber}`);
    } catch (err) {
      setError(normalizeApiError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F4F6FB]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <div className="flex items-center justify-between gap-4 text-[#111827]">
          <h1 className="text-3xl font-black tracking-tight md:text-[38px]">Gio hang ({items.length} san pham)</h1>
          <Link href="/account/address" className="text-sm font-semibold text-[#2563EB]">
            Cap nhat dia chi
          </Link>
        </div>

        {loading ? <p className="mt-8 text-sm text-[#667085]">Dang tai gio hang...</p> : null}
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        {successMessage ? <p className="mt-4 text-sm text-[#16A34A]">{successMessage}</p> : null}

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-[22px] border border-[#DDE3EE] bg-white px-4 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <input type="checkbox" checked={allSelected} onChange={toggleAll} className="h-5 w-5 rounded border-[#C8D0DD] accent-[#2563EB]" />
              <p className="text-base font-semibold text-[#111827] md:text-lg">Chon tat ca ({items.length} san pham)</p>
            </div>

            {items.map((item) => {
              const lineTotal = Number(getDisplayPrice(item)) * item.quantity;

              return (
                <article
                  key={`${item.productId}-${item.variantId ?? 'default'}`}
                  className="rounded-[24px] border border-[#DDE3EE] bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] md:p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="flex min-w-0 flex-1 items-start gap-4">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleItem(item.productId, item.variantId)}
                        className="mt-3 h-5 w-5 rounded border-[#C8D0DD] accent-[#2563EB]"
                      />

                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#F8FAFC]">
                        {item.productSnapshot.imageUrl ? (
                          <Image src={item.productSnapshot.imageUrl} alt={item.productSnapshot.name} fill className="object-cover" unoptimized />
                        ) : null}
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-lg font-semibold text-[#111827] md:text-xl">{item.productSnapshot.name}</h2>
                        <p className="mt-2 text-sm text-[#7A8699]">{item.productSnapshot.variantName || item.productSnapshot.shortDescription}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="text-2xl font-black text-[#EF3D32]">{formatCurrency(getDisplayPrice(item))}</span>
                          {getDisplayComparePrice(item) ? (
                            <span className="text-sm text-[#8E99AB] line-through">{formatCurrency(getDisplayComparePrice(item) as string)}</span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 lg:justify-end">
                      <div className="inline-flex items-center overflow-hidden rounded-2xl border border-[#D6DDE8] bg-white">
                        <button
                          onClick={() => changeQuantity(item.productId, item.variantId, -1)}
                          className="grid h-12 w-12 place-items-center text-xl font-bold text-[#111827] transition hover:bg-[#F3F6FB]"
                        >
                          -
                        </button>
                        <span className="grid h-12 w-12 place-items-center text-base font-semibold text-[#111827]">{item.quantity}</span>
                        <button
                          onClick={() => changeQuantity(item.productId, item.variantId, 1)}
                          className="grid h-12 w-12 place-items-center text-xl font-bold text-[#111827] transition hover:bg-[#F3F6FB]"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-lg font-black text-[#111827]">= {formatCurrency(lineTotal)}</p>

                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        aria-label="Xoa san pham"
                        className="grid h-11 w-11 place-items-center rounded-full text-[#7A8699] transition hover:bg-[#F3F6FB] hover:text-[#EF3D32]"
                      >
                        X
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}

            {!items.length ? (
              <div className="rounded-[24px] border border-dashed border-[#D6DDE8] bg-white p-8 text-sm text-[#667085]">
                Gio hang dang trong. Vao <Link href="/products" className="font-semibold text-[#2563EB]">danh sach san pham</Link> de mua sam.
              </div>
            ) : null}

            <section className="rounded-[24px] border border-[#DDE3EE] bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] md:p-5">
              <div className="flex items-center gap-3 text-[#111827]">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#FFF4F2] text-[#EF3D32]">%</span>
                <h2 className="text-xl font-bold">Ma giam gia</h2>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(event) => setCouponCode(event.target.value)}
                  placeholder="Nhap ma giam gia"
                  className="h-14 flex-1 rounded-2xl border border-[#D6DDE8] bg-white px-4 text-base text-[#111827] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                />
                <button className="h-14 rounded-2xl bg-[#EF3D32] px-8 text-base font-bold text-white transition hover:bg-[#D83027]">
                  Ap dung
                </button>
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-[24px] border border-[#DDE3EE] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] md:p-6 xl:sticky xl:top-24">
            <h2 className="text-[30px] font-black text-[#111827] xl:text-[20px]">Tom tat don hang</h2>

            <div className="mt-5 space-y-4 text-[#111827]">
              <div className="flex items-center justify-between gap-4 text-base xl:text-base">
                <span className="text-[#667085]">Tam tinh ({selectedCount} sp)</span>
                <span className="font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-base xl:text-base">
                <span className="text-[#667085]">Phi van chuyen</span>
                <span className="font-semibold">{shippingFee ? formatCurrency(shippingFee) : '0 d'}</span>
              </div>
            </div>

            <div className="my-5 h-px bg-[#E5E7EB]" />

            <div className="space-y-2 rounded-2xl bg-[#F8FAFC] p-4 text-sm text-[#667085]">
              <p className="font-semibold text-[#111827]">{address.fullName || 'Chua co nguoi nhan'}</p>
              <p>{address.phone || 'Chua co so dien thoai'}</p>
              <p>{address.line1 ? `${address.line1}, ${address.ward}, ${address.district}, ${address.city}` : 'Chua co dia chi giao hang'}</p>
            </div>

            <div className="my-5 h-px bg-[#E5E7EB]" />

            <div className="flex items-end justify-between gap-4">
              <span className="text-lg font-bold text-[#111827]">Tong cong</span>
              <span className="text-3xl font-black text-[#EF3D32] xl:text-[20px]">{formatCurrency(total)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={submitting || !items.length}
              className="mt-6 h-14 w-full rounded-2xl bg-[#EF3D32] text-lg font-bold text-white shadow-[0_18px_40px_rgba(239,61,50,0.24)] transition hover:bg-[#D83027] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? 'Dang tao don...' : 'Tien hanh thanh toan'}
            </button>

            <Link
              href="/products"
              className="mt-3 flex h-12 w-full items-center justify-center rounded-2xl border border-[#D6DDE8] bg-white text-base font-semibold text-[#2563EB] transition hover:bg-[#F7FAFF]"
            >
              Tiep tuc mua sam
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
