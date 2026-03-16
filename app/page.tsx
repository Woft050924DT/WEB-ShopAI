export default function HomePage() {
  const featuredCategories = [
    'Điện thoại',
    'Laptop',
    'Phụ kiện',
    'Gia dụng',
    'Thời trang',
    'Làm đẹp',
  ];

  return (
    <div className="pb-8">
      <section
        className="relative h-[460px] md:h-[520px] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(10,35,88,0.72) 0%, rgba(10,35,88,0.35) 36%, rgba(10,35,88,0.18) 60%, rgba(10,35,88,0.08) 100%), url('https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Công Nghệ Đỉnh Cao</h1>
            <p className="mt-4 text-2xl md:text-3xl font-semibold">Samsung QLED 4K - Trải nghiệm hình ảnh vượt trội</p>
            <button className="mt-8 h-14 px-10 rounded-2xl bg-[#EF3D32] hover:bg-[#D83027] transition-colors text-white text-2xl md:text-xl font-bold">
              Mua ngay
            </button>
          </div>
        </div>
        <button className="absolute top-1/2 -translate-y-1/2 left-4 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white text-2xl grid place-items-center">
          ‹
        </button>
        <button className="absolute top-1/2 -translate-y-1/2 right-4 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white text-2xl grid place-items-center">
          ›
        </button>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="w-9 h-3 rounded-full bg-white" />
          <span className="w-3 h-3 rounded-full bg-white/65" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📦</span>
          <h2 className="text-4xl md:text-[36px] font-extrabold text-[#1F2937]">Danh mục nổi bật</h2>
        </div>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {featuredCategories.map((category) => (
            <button
              key={category}
              className="h-28 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow text-[#111827] text-lg font-semibold"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <button className="fixed right-6 bottom-6 w-16 h-16 rounded-full bg-[#EF3D32] text-white text-4xl shadow-lg hover:bg-[#D83027] transition-colors grid place-items-center">
        ◔
      </button>
    </div>
  );
}
