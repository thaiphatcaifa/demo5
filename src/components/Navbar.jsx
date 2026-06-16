import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const navLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/van-hoa', label: 'Văn hóa & Con người' },
  { href: '/am-thuc', label: 'Ẩm thực' },
  { href: '/dia-hinh-thoi-tiet', label: 'Địa hình & Thời tiết' },
  { href: '/nhat-ky', label: 'Nhật ký TÂM BẢN' },
  { href: '/bungalow', label: 'Phòng & Giường' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Cuộn quá 30px → navbar chuyển sang nền đặc (trước đó trong suốt, đè lên hero)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // "solid" = navbar nền đặc (đã cuộn HOẶC menu mobile đang mở)
  const solid = scrolled || mobileOpen;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex justify-between items-center">
          {/* Logo — lọc trắng khi trong suốt trên hero, xanh khi nền trắng */}
          <a href="/" className="shrink-0">
            <img
              src="/images/1.png"
              alt="TÂM BẢN Homestay"
              className="w-auto transition-all duration-300"
              style={{
                height: solid ? '2.75rem' : '3.25rem',
                filter: solid ? 'none' : 'brightness(0) invert(1)',
              }}
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-6 text-[12.5px] tracking-wide">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              const base = solid
                ? (active ? 'text-forest-green font-semibold' : 'text-gray-600 hover:text-forest-green')
                : (active ? 'text-white font-semibold' : 'text-white/80 hover:text-white');
              return (
                <a key={href} href={href} className={`relative pb-0.5 whitespace-nowrap transition-colors duration-200 group ${base}`}>
                  {label}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ${
                    solid ? 'bg-forest-green' : 'bg-white'
                  } ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              );
            })}
          </div>

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-2 md:gap-3">
            <a href="/#dat-phong"
              className={`px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-[11px] tracking-widest font-bold rounded-full active:scale-95 transition-all duration-200 shrink-0 ${
                solid
                  ? 'bg-forest-green text-white hover:bg-forest-dark shadow-sm'
                  : 'bg-white/15 text-white border border-white/60 backdrop-blur-sm hover:bg-white/25'
              }`}
            >
              ĐẶT PHÒNG
            </a>
            <button
              onClick={() => setMobileOpen(v => !v)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${solid ? 'text-gray-700 hover:text-forest-green' : 'text-white'}`}
              aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-3 space-y-1 bg-white">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                  pathname === href
                    ? 'bg-forest-green/5 text-forest-green border-l-2 border-forest-green'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-forest-green hover:pl-5'
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
