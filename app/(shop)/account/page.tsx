const stats = [
  { label: 'Tong don', value: '24', tone: 'text-[#2563EB]', icon: 'box' },
  { label: 'Cho xu ly', value: '2', tone: 'text-[#F59E0B]', icon: 'hourglass' },
  { label: 'Da chi tieu', value: '45.680.000 d', tone: 'text-[#EF3D32]', icon: 'money' },
  { label: 'Da danh gia', value: '18', tone: 'text-[#16A34A]', icon: 'star' },
];

const recentOrders = [
  { code: '#DH2024001', date: '2024-01-15', products: '3 san pham', total: '29.580.000 d', status: 'Da giao', statusTone: 'bg-[#DCFCE7] text-[#16A34A]' },
  { code: '#DH2024002', date: '2024-01-16', products: '1 san pham', total: '7.490.000 d', status: 'Dang xu ly', statusTone: 'bg-[#DBEAFE] text-[#2563EB]' },
  { code: '#DH2024003', date: '2024-01-16', products: '2 san pham', total: '52.990.000 d', status: 'Dang giao', statusTone: 'bg-[#E0E7FF] text-[#4F46E5]' },
  { code: '#DH2024004', date: '2024-01-17', products: '5 san pham', total: '4.350.000 d', status: 'Cho xu ly', statusTone: 'bg-[#FEF3C7] text-[#D97706]' },
  { code: '#DH2024005', date: '2024-01-17', products: '1 san pham', total: '290.000 d', status: 'Da huy', statusTone: 'bg-[#FEE2E2] text-[#DC2626]' },
];

const notifications = [
  {
    title: 'Don hang dang giao',
    description: 'Don hang #DH2024003 da duoc giao den buu cuc.',
    time: '2 gio truoc',
    icon: 'box',
  },
  {
    title: 'Khuyen mai dac biet',
    description: 'Flash Sale cuoi tuan, giam den 50% hang ngan san pham.',
    time: '5 gio truoc',
    icon: 'gift',
  },
  {
    title: 'Danh gia san pham',
    description: 'Hay danh gia san pham ban da mua de nhan diem thuong.',
    time: '1 ngay truoc',
    icon: 'star',
  },
];

const menuItems = [
  { label: 'Tong quan', active: true, icon: 'grid' },
  { label: 'Don hang', badge: '2', icon: 'bag' },
  { label: 'Dia chi', icon: 'pin' },
  { label: 'Danh gia', icon: 'star-outline' },
  { label: 'Thong bao', badge: '5', icon: 'bell' },
  { label: 'Voucher', icon: 'ticket' },
  { label: 'Doi mat khau', icon: 'lock' },
  { label: 'Dang xuat', danger: true, icon: 'logout' },
];

function MenuIcon({ type, active = false, danger = false }: { type: string; active?: boolean; danger?: boolean }) {
  const color = danger ? '#EF3D32' : active ? '#EF3D32' : '#111827';

  if (type === 'grid') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={color} strokeWidth="1.8">
        <rect x="4" y="4" width="6" height="6" rx="1.4" />
        <rect x="14" y="4" width="6" height="6" rx="1.4" />
        <rect x="4" y="14" width="6" height="6" rx="1.4" />
        <rect x="14" y="14" width="6" height="6" rx="1.4" />
      </svg>
    );
  }

  if (type === 'bag') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={color} strokeWidth="1.8">
        <path d="M6.5 8.5h11l-.8 10a2 2 0 0 1-2 1.8H9.3a2 2 0 0 1-2-1.8l-.8-10Z" />
        <path d="M9 9V7a3 3 0 1 1 6 0v2" />
      </svg>
    );
  }

  if (type === 'pin') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={color} strokeWidth="1.8">
        <path d="M12 20s6-5.5 6-10a6 6 0 1 0-12 0c0 4.5 6 10 6 10Z" />
        <circle cx="12" cy="10" r="2.2" />
      </svg>
    );
  }

  if (type === 'star-outline') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={color} strokeWidth="1.8">
        <path d="m12 3.8 2.5 5.1 5.6.8-4 3.9 1 5.5-5.1-2.7-5.1 2.7 1-5.5-4-3.9 5.6-.8L12 3.8Z" />
      </svg>
    );
  }

  if (type === 'bell') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={color} strokeWidth="1.8">
        <path d="M6.5 16.5h11l-1.2-1.8V11a4.3 4.3 0 1 0-8.6 0v3.7L6.5 16.5Z" />
        <path d="M10 18.5a2 2 0 0 0 4 0" />
      </svg>
    );
  }

  if (type === 'ticket') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={color} strokeWidth="1.8">
        <path d="M4 9a2 2 0 0 0 0 6v3h16v-3a2 2 0 0 1 0-6V6H4v3Z" />
        <path d="M12 6v12" />
      </svg>
    );
  }

  if (type === 'lock') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={color} strokeWidth="1.8">
        <rect x="5.5" y="11" width="13" height="9" rx="2" />
        <path d="M8.5 11V8.5a3.5 3.5 0 1 1 7 0V11" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M9 7 5 12l4 5" />
      <path d="M5 12h10a4 4 0 0 0 0-8" />
    </svg>
  );
}

function StatIcon({ type }: { type: string }) {
  if (type === 'box') return <span className="text-xl">📦</span>;
  if (type === 'hourglass') return <span className="text-xl">⏳</span>;
  if (type === 'money') return <span className="text-xl">💰</span>;
  return <span className="text-xl">⭐</span>;
}

function NotificationIcon({ type }: { type: string }) {
  if (type === 'box') return <span className="text-lg">📦</span>;
  if (type === 'gift') return <span className="text-lg">🎉</span>;
  return <span className="text-lg">⭐</span>;
}

export default function AccountPage() {
  return (
    <div className="bg-[#F4F6FB]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-[24px] border border-[#DDE3EE] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <div className="border-b border-[#E7ECF3] px-6 py-7 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#2563EB] text-lg font-black text-white">
                NA
              </div>
              <h2 className="mt-4 text-2xl font-black text-[#111827]">Nguyen Van An</h2>
              <p className="mt-1 text-sm text-[#667085]">an.nguyen@gmail.com</p>
            </div>

            <nav className="py-3">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition ${
                    item.active ? 'border-r-2 border-[#EF3D32] bg-[#FFF5F4]' : 'hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <MenuIcon type={item.icon} active={item.active} danger={item.danger} />
                    <span className={`font-medium ${item.danger ? 'text-[#EF3D32]' : item.active ? 'text-[#EF3D32]' : 'text-[#111827]'}`}>
                      {item.label}
                    </span>
                  </span>
                  {item.badge ? (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#EF3D32] px-1 text-[11px] font-bold text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              ))}
            </nav>
          </aside>

          <section className="space-y-6">
            <div className="rounded-[24px] bg-gradient-to-r from-[#1F66C1] to-[#2E83E6] px-6 py-6 text-white shadow-[0_18px_50px_rgba(37,99,235,0.22)]">
              <h1 className="text-3xl md:text-[34px] font-black">Xin chao, An! 👋</h1>
              <p className="mt-2 text-base text-white/80">Thanh vien tu Thang 3, 2022</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-[22px] border border-[#DDE3EE] bg-white px-5 py-5 text-center shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex justify-center">
                    <StatIcon type={stat.icon} />
                  </div>
                  <p className={`mt-3 text-3xl font-black ${stat.tone}`}>{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-[#667085]">{stat.label}</p>
                </article>
              ))}
            </div>

            <section className="overflow-hidden rounded-[24px] border border-[#DDE3EE] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <div className="flex items-center justify-between gap-4 border-b border-[#E7ECF3] px-5 py-4">
                <h2 className="text-2xl font-black text-[#111827]">Don hang gan day</h2>
                <button className="text-sm font-semibold text-[#2563EB]">Xem tat ca {'>'}</button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead className="bg-[#F8FAFC] text-sm text-[#667085]">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Ma don</th>
                      <th className="px-5 py-3 font-semibold">Ngay</th>
                      <th className="px-5 py-3 font-semibold">San pham</th>
                      <th className="px-5 py-3 font-semibold">Tong tien</th>
                      <th className="px-5 py-3 font-semibold">Trang thai</th>
                      <th className="px-5 py-3 font-semibold" />
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.code} className="border-t border-[#EEF2F7] text-sm text-[#111827]">
                        <td className="px-5 py-4 font-semibold text-[#2563EB]">{order.code}</td>
                        <td className="px-5 py-4 text-[#667085]">{order.date}</td>
                        <td className="px-5 py-4 text-[#667085]">{order.products}</td>
                        <td className="px-5 py-4 font-semibold">{order.total}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${order.statusTone}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button className="text-sm font-semibold text-[#2563EB]">Xem</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-[24px] border border-[#DDE3EE] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <h2 className="text-2xl font-black text-[#111827]">Thong bao gan day</h2>

              <div className="mt-5 space-y-4">
                {notifications.map((notification) => (
                  <article
                    key={notification.title}
                    className="flex items-start justify-between gap-4 rounded-[20px] bg-[#F7FAFF] px-4 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white">
                        <NotificationIcon type={notification.icon} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#111827]">{notification.title}</h3>
                        <p className="mt-1 text-sm text-[#667085]">{notification.description}</p>
                        <p className="mt-2 text-sm text-[#98A2B3]">{notification.time}</p>
                      </div>
                    </div>
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#EF3D32]" />
                  </article>
                ))}
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}
