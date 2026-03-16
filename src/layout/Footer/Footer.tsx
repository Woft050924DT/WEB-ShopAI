'use client';

import React from 'react';

const Footer = () => {
  const helpLinks = ['Trung tâm trợ giúp', 'Chính sách đổi trả', 'Theo dõi đơn hàng', 'Phương thức thanh toán'];
  const accountLinks = ['Đăng nhập', 'Đăng ký', 'Đơn hàng của tôi', 'Danh sách yêu thích'];
  const payments = ['COD', 'Bank', 'MoMo', 'VNPay'];

  return (
    <footer className="bg-[#212121] text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-[#E53935] rounded-lg grid place-items-center text-white">⚡</div>
              <span className="text-white font-bold">VietShop</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Mua sắm thông minh, tiết kiệm tối đa với hàng ngàn sản phẩm chính hãng.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Hỗ trợ khách hàng</h4>
            <ul className="space-y-1.5 text-sm text-gray-400">
              {helpLinks.map((item) => (
                <li key={item} className="hover:text-white cursor-pointer transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Tài khoản</h4>
            <ul className="space-y-1.5 text-sm text-gray-400">
              {accountLinks.map((item) => (
                <li key={item} className="hover:text-white cursor-pointer transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Liên hệ</h4>
            <ul className="space-y-1.5 text-sm text-gray-400">
              <li>📞 1800 1234 (Miễn phí)</li>
              <li>✉️ support@vietshop.vn</li>
              <li>⏰ 8:00 - 22:00 (T2 - CN)</li>
            </ul>
            <div className="flex gap-3 mt-4">
              {['f', 'ig', 'yt'].map((label) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-8 h-8 bg-white/10 rounded-full grid place-items-center hover:bg-[#E53935] transition-colors"
                >
                  <span className="text-white text-xs">{label.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2024 VietShop. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-3">
            {payments.map((method) => (
              <span key={method} className="text-xs bg-white/10 px-2 py-1 rounded font-medium text-gray-300">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
