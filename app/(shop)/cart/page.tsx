'use client';

import { useMemo, useState } from 'react';

type CartItem = {
  id: number;
  name: string;
  variant: string;
  price: number;
  originalPrice: number;
  quantity: number;
  selected: boolean;
  image: string;
};

const initialItems: CartItem[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB Titan Tu Nhien',
    variant: 'Mau: Titan Tu Nhien · Size: 256GB',
    price: 28990000,
    originalPrice: 34990000,
    quantity: 1,
    selected: true,
    image:
      "url('https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=900&q=80')",
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5 Tai Nghe Chong On',
    variant: 'Mau: Den · Size: One Size',
    price: 7490000,
    originalPrice: 9490000,
    quantity: 2,
    selected: true,
    image:
      "url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80')",
  },
  {
    id: 3,
    name: 'Ao Thun Nam Premium Cotton Oversize',
    variant: 'Mau: Trang · Size: M',
    price: 290000,
    originalPrice: 450000,
    quantity: 1,
    selected: false,
    image:
      "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80')",
  },
];

function formatCurrency(value: number) {
  return `${new Intl.NumberFormat('vi-VN').format(value)} đ`;
}

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [couponCode, setCouponCode] = useState('');

  const selectedCount = items.filter((item) => item.selected).length;
  const allSelected = items.length > 0 && items.every((item) => item.selected);

  const subtotal = useMemo(
    () => items.filter((item) => item.selected).reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const shippingFee = selectedCount > 0 ? 0 : 0;
  const total = subtotal + shippingFee;

  const toggleAll = () => {
    setItems((current) => current.map((item) => ({ ...item, selected: !allSelected })));
  };

  const toggleItem = (id: number) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const changeQuantity = (id: number, delta: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-[#F4F6FB]">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
        <div className="flex items-center gap-4 text-[#111827]">
          <button
            aria-label="Quay lai"
            className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18 9 12l6-6" />
            </svg>
          </button>
          <h1 className="text-3xl md:text-[38px] font-black tracking-tight">Gio hang ({items.length} san pham)</h1>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-[22px] border border-[#DDE3EE] bg-white px-4 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="h-5 w-5 rounded border-[#C8D0DD] accent-[#2563EB]"
              />
              <p className="text-base md:text-lg font-semibold text-[#111827]">
                Chon tat ca ({items.length} san pham)
              </p>
            </div>

            {items.map((item) => {
              const lineTotal = item.price * item.quantity;

              return (
                <article
                  key={item.id}
                  className="rounded-[24px] border border-[#DDE3EE] bg-white p-4 md:p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="flex items-start gap-4 min-w-0 flex-1">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleItem(item.id)}
                        className="mt-3 h-5 w-5 rounded border-[#C8D0DD] accent-[#2563EB]"
                      />

                      <div
                        className="h-20 w-20 shrink-0 rounded-2xl bg-cover bg-center"
                        style={{ backgroundImage: item.image }}
                      />

                      <div className="min-w-0">
                        <h2 className="text-lg md:text-[28px]/8 lg:text-xl font-semibold text-[#111827]">
                          {item.name}
                        </h2>
                        <p className="mt-2 text-sm md:text-base text-[#7A8699]">{item.variant}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="text-2xl md:text-[32px] lg:text-[18px] font-black text-[#EF3D32]">
                            {formatCurrency(item.price)}
                          </span>
                          <span className="text-sm md:text-lg lg:text-base text-[#8E99AB] line-through">
                            {formatCurrency(item.originalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 lg:justify-end">
                      <div className="inline-flex items-center overflow-hidden rounded-2xl border border-[#D6DDE8] bg-white">
                        <button
                          onClick={() => changeQuantity(item.id, -1)}
                          className="grid h-12 w-12 place-items-center text-xl font-bold text-[#111827] transition hover:bg-[#F3F6FB]"
                        >
                          -
                        </button>
                        <span className="grid h-12 w-12 place-items-center text-base font-semibold text-[#111827]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => changeQuantity(item.id, 1)}
                          className="grid h-12 w-12 place-items-center text-xl font-bold text-[#111827] transition hover:bg-[#F3F6FB]"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-lg font-black text-[#111827]">= {formatCurrency(lineTotal)}</p>

                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Xoa san pham"
                        className="grid h-11 w-11 place-items-center rounded-full text-[#7A8699] transition hover:bg-[#F3F6FB] hover:text-[#EF3D32]"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M4 7h16" />
                          <path d="M9 7V5.5h6V7" />
                          <path d="M7.5 7l.8 11h7.4l.8-11" />
                          <path d="M10 11v4.5" />
                          <path d="M14 11v4.5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}

            <section className="rounded-[24px] border border-[#DDE3EE] bg-white p-4 md:p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <div className="flex items-center gap-3 text-[#111827]">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#FFF4F2] text-[#EF3D32]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 13V8.5a2 2 0 0 0-.6-1.4l-2.5-2.5A2 2 0 0 0 15.5 4H7a2 2 0 0 0-2 2v6.2a2 2 0 0 0 .6 1.4l5.8 5.8a2 2 0 0 0 2.8 0l5-5a2 2 0 0 0 0-2.8L17 9.4" />
                    <circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <h2 className="text-xl font-bold">Ma giam gia</h2>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(event) => setCouponCode(event.target.value)}
                  placeholder="Nhap ma giam gia (thu: SALE10)"
                  className="h-14 flex-1 rounded-2xl border border-[#D6DDE8] bg-white px-4 text-base text-[#111827] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                />
                <button className="h-14 rounded-2xl bg-[#EF3D32] px-8 text-base font-bold text-white transition hover:bg-[#D83027]">
                  Ap dung
                </button>
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-[24px] border border-[#DDE3EE] bg-white p-5 md:p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] xl:sticky xl:top-24">
            <h2 className="text-[30px] md:text-[34px] xl:text-[20px] font-black text-[#111827]">Tom tat don hang</h2>

            <div className="mt-5 space-y-4 text-[#111827]">
              <div className="flex items-center justify-between gap-4 text-base md:text-lg xl:text-base">
                <span className="text-[#667085]">Tam tinh ({selectedCount} sp)</span>
                <span className="font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-base md:text-lg xl:text-base">
                <span className="text-[#667085]">Phi van chuyen</span>
                <span className="font-semibold text-[#16A34A]">{shippingFee === 0 ? 'Mien phi' : formatCurrency(shippingFee)}</span>
              </div>
            </div>

            <div className="my-5 h-px bg-[#E5E7EB]" />

            <div className="flex items-end justify-between gap-4">
              <span className="text-lg font-bold text-[#111827]">Tong cong</span>
              <span className="text-3xl md:text-4xl xl:text-[20px] font-black text-[#EF3D32]">{formatCurrency(total)}</span>
            </div>

            <button className="mt-6 h-14 w-full rounded-2xl bg-[#EF3D32] text-lg font-bold text-white shadow-[0_18px_40px_rgba(239,61,50,0.24)] transition hover:bg-[#D83027]">
              Tien hanh thanh toan
            </button>

            <button className="mt-3 h-12 w-full rounded-2xl border border-[#D6DDE8] bg-white text-base font-semibold text-[#2563EB] transition hover:bg-[#F7FAFF]">
              Tiep tuc mua sam
            </button>

            <div className="my-6 h-px bg-[#E5E7EB]" />

            <div className="flex flex-wrap gap-2">
              {['COD', 'Bank', 'MoMo', 'VNPay', 'PayPal'].map((method) => (
                <span
                  key={method}
                  className="rounded-lg bg-[#F3F4F6] px-3 py-1.5 text-xs font-semibold text-[#667085]"
                >
                  {method}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
