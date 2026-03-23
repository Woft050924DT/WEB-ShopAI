const featuredCategories = [
  { name: 'Dien thoai', label: 'Dien thoai', count: '245 sp', icon: 'phone' },
  { name: 'Laptop', label: 'Laptop', count: '128 sp', icon: 'laptop' },
  { name: 'Thoi trang', label: 'Thoi trang', count: '892 sp', icon: 'fashion' },
  { name: 'Nha cua', label: 'Nha cua', count: '456 sp', icon: 'home' },
  { name: 'Am thanh', label: 'Am thanh', count: '167 sp', icon: 'audio' },
  { name: 'Dong ho', label: 'Dong ho', count: '89 sp', icon: 'watch' },
];

const flashSaleProducts = [
  {
    name: 'OnePlus Nord',
    discount: '-17%',
    price: '7.490.000 VND',
    originalPrice: '8.990.000 VND',
    image:
      "url('https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=900&q=80')",
  },
  {
    name: 'Samsung S24 Ultra',
    discount: '-19%',
    price: '24.990.000 VND',
    originalPrice: '30.990.000 VND',
    image:
      "url('https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80')",
  },
  {
    name: 'Tai nghe Noise Cancelling',
    discount: '-21%',
    price: '2.190.000 VND',
    originalPrice: '2.790.000 VND',
    image:
      "url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80')",
  },
  {
    name: 'Noi that toi gian',
    discount: '-27%',
    price: '4.590.000 VND',
    originalPrice: '6.290.000 VND',
    image:
      "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80')",
  },
  {
    name: 'Camera hanh dong',
    discount: '-36%',
    price: '5.390.000 VND',
    originalPrice: '8.490.000 VND',
    image:
      "url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80')",
  },
];

function CategoryIcon({ type }: { type: string }) {
  if (type === 'phone') {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#4A63E7]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="7" y="2.8" width="10" height="18.4" rx="2.5" />
        <path d="M10 5.8h4" />
        <path d="M11.25 18.2h1.5" />
      </svg>
    );
  }

  if (type === 'laptop') {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#46B5FF]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="4.5" width="14" height="10" rx="1.8" />
        <path d="M3.5 17.5h17" />
        <path d="M7.5 17.5l1 2h7l1-2" />
      </svg>
    );
  }

  if (type === 'fashion') {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#4A63E7]" fill="currentColor">
        <path d="M9.2 4.2c.8 1.2 1.6 1.8 2.8 1.8s2-.6 2.8-1.8l2.7 2-1.8 4.3-1.5-.4V20H9.8V10.1l-1.5.4-1.8-4.3 2.7-2Z" />
      </svg>
    );
  }

  if (type === 'home') {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#FF8A4C]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3.8 10.5 12 4l8.2 6.5" />
        <path d="M6.2 9.8V20h11.6V9.8" />
        <path d="M10 20v-5.5h4V20" />
      </svg>
    );
  }

  if (type === 'audio') {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#9B8AFB]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6.5 13.5V12a5.5 5.5 0 1 1 11 0v1.5" />
        <rect x="4" y="12.5" width="4" height="7" rx="1.4" />
        <rect x="16" y="12.5" width="4" height="7" rx="1.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#5468FF]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="13" r="6.2" />
      <path d="M12 9v4l2.5 1.5" />
      <path d="M9 3.5h6" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="pb-12">
      <section
        className="relative isolate overflow-hidden min-h-[420px] md:min-h-[520px] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(5,16,39,0.86) 0%, rgba(10,20,43,0.55) 35%, rgba(20,55,104,0.24) 65%, rgba(30,87,153,0.12) 100%), url('https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 min-h-[420px] md:min-h-[520px] flex items-center">
          <div className="max-w-2xl text-white pt-10 pb-16">
            <span className="inline-flex items-center rounded-full bg-white/12 px-4 py-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase backdrop-blur">
              Premium launch
            </span>
            <h1 className="mt-6 text-5xl md:text-7xl font-black leading-[0.95] tracking-tight">
              iPhone 15
              <br />
              Pro Max
            </h1>
            <p className="mt-5 max-w-xl text-lg md:text-2xl text-white/90 font-medium">
              Titan. Manh me. Dot pha voi uu dai giam den 17% trong tuan le mo ban.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="h-14 px-8 rounded-2xl bg-[#EF3D32] hover:bg-[#D83027] text-white text-lg font-bold shadow-[0_18px_40px_rgba(239,61,50,0.35)] transition-all">
                Kham pha
              </button>
              <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur">
                <p className="text-sm text-white/70">Chi tu</p>
                <p className="text-2xl font-extrabold">28.990.000 VND</p>
              </div>
            </div>
          </div>
        </div>

        <button className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-[#374151]/70 text-white text-2xl backdrop-blur transition hover:bg-[#4B5563]">
          {'<'}
        </button>
        <button className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-[#60A5FA]/70 text-white text-2xl backdrop-blur transition hover:bg-[#3B82F6]">
          {'>'}
        </button>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
          <span className="h-2.5 w-6 rounded-full bg-white" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pt-8">
        <div className="rounded-[32px] bg-[#F3F5FA] p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-[#EF3D32] shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m4 8 8-4 8 4-8 4-8-4Z" />
                <path d="M4 8v8l8 4 8-4V8" />
                <path d="M12 12v8" />
              </svg>
            </span>
            <h2 className="text-[28px] md:text-[38px] leading-none font-black text-[#202533]">
              Danh muc noi bat
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
            {featuredCategories.map((category) => (
              <button
                key={category.name}
                className="group rounded-[22px] border border-[#DDE3EE] bg-white px-4 py-6 text-center shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#F6F8FC] text-3xl">
                  <CategoryIcon type={category.icon} />
                </div>
                <p className="mt-4 text-lg font-bold text-[#1F2937]">{category.label}</p>
                <p className="mt-1 text-sm text-[#7A8699]">{category.count}</p>
              </button>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-[#EF3D32] shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M13.2 2 6.7 12h4.1L9.9 22l7.4-10.8h-4.2L13.2 2Z" />
                </svg>
              </span>
              <h2 className="text-[28px] md:text-[36px] leading-none font-black text-[#202533]">
                Flash Sale
              </h2>
              <div className="inline-flex items-center rounded-full bg-[#EF3D32] px-4 py-2 text-sm font-bold text-white shadow-[0_10px_24px_rgba(239,61,50,0.24)]">
                05:23:41
              </div>
            </div>

            <button className="self-start text-base font-semibold text-[#1F6FE5] transition hover:text-[#0F5BCC]">
              Xem tat ca {'->'}
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {flashSaleProducts.map((product) => (
              <article
                key={product.name}
                className="overflow-hidden rounded-[22px] bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)] transition-transform hover:-translate-y-1"
              >
                <div
                  className="relative h-[250px] bg-cover bg-center"
                  style={{ backgroundImage: product.image }}
                >
                  <span className="absolute left-3 top-3 rounded-full bg-[#EF3D32] px-3 py-1 text-sm font-bold text-white">
                    {product.discount}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#1F2937]">{product.name}</h3>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xl font-black text-[#EF3D32]">{product.price}</p>
                      <p className="text-sm text-[#98A2B3] line-through">{product.originalPrice}</p>
                    </div>
                    <button className="rounded-xl bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1F2937]">
                      Mua ngay
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <button className="fixed bottom-5 right-5 grid h-16 w-16 place-items-center rounded-full bg-[#EF3D32] text-3xl text-white shadow-[0_20px_40px_rgba(239,61,50,0.35)] transition hover:scale-105 hover:bg-[#D83027]">
        ?
      </button>
    </div>
  );
}
