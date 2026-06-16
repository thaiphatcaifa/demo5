import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Outlet, NavLink } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const NAV_ITEMS = [
  {
    to: '/admin', end: true, label: 'Bảng điều khiển', adminOnly: false,
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>,
  },
  {
    to: '/admin/dat-phong', label: 'Đặt phòng', adminOnly: false, badge: true,
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
  },
  {
    to: '/admin/nhat-ky', label: 'Quản lý Nhật ký', adminOnly: true,
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
  },
  {
    to: '/admin/bungalow', label: 'Cấu hình Phòng', adminOnly: true,
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>,
  },
  {
    to: '/admin/nhan-su', label: 'Quản lý Nhân sự', adminOnly: true,
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  },
  {
    to: '/admin/ho-tro', label: 'Lịch hỗ trợ khách', adminOnly: false,
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
  },
];

export default function AdminLayout() {
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [newBookingCount, setNewBookingCount] = useState(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (!savedRole && pathname !== '/admin/login') {
      navigate('/admin/login');
    } else {
      setRole(savedRole);
      setIsLoading(false);
    }
  }, [pathname]);

  useEffect(() => { setMobileSidebarOpen(false); }, [pathname]);

  // Poll for new bookings every 30s
  useEffect(() => {
    if (!role) return;
    const fetchBadge = async () => {
      try {
        const q = query(collection(db, 'bookings'), where('status', '==', 'new'));
        const snap = await getDocs(q);
        setNewBookingCount(snap.size);
      } catch (_) {}
    };
    fetchBadge();
    const interval = setInterval(fetchBadge, 30000);
    return () => clearInterval(interval);
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/admin/login');
  };

  if (pathname === '/admin/login') return <Outlet />;
  if (isLoading) return <div className="min-h-screen bg-gray-50" />;

  const roleBadge = role === 'super_admin'
    ? { label: 'Super Admin', cls: 'bg-amber-100 text-amber-800' }
    : { label: 'Nhan vien', cls: 'bg-blue-100 text-blue-800' };

  const visibleNav = NAV_ITEMS.filter(item => !item.adminOnly || role === 'super_admin');

  const SidebarContent = () => (
    <aside className="w-64 bg-forest-green text-white flex flex-col h-full">
      <div className="px-6 pt-8 pb-6 border-b border-white/10">
        <h2 className="text-xl font-serif font-bold tracking-widest">TAM BAN</h2>
        <span className="text-[10px] text-white/50 uppercase tracking-widest">Admin Panel</span>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
            {role === 'super_admin' ? 'A' : 'S'}
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${roleBadge.cls}`}>
            {roleBadge.label}
          </span>
        </div>
      </div>

      <nav className="flex-grow px-4 py-5 space-y-1 overflow-y-auto">
        {visibleNav.map(item => (
          <NavLink key={item.to} to={item.to} end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive ? 'bg-white text-forest-green shadow-sm' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }>
            {({ isActive }) => (
              <>
                <span className={isActive ? 'text-forest-green' : 'text-white/60'}>{item.icon}</span>
                <span className="flex-grow">{item.label}</span>
                {item.badge && newBookingCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">
                    {newBookingCount}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-5 border-t border-white/10">
        <button onClick={handleLogout}
          className="flex items-center gap-2 text-xs text-white/50 hover:text-white uppercase font-bold tracking-widest transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Dang xuat
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Desktop sidebar */}
      <div className="hidden md:flex sticky top-0 h-screen">
        <SidebarContent />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileSidebarOpen(false)} />
          <div className="relative w-64 h-full">
            <SidebarContent />
          </div>
        </div>
      )}

      <div className="flex-grow flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-40">
          <button onClick={() => setMobileSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-forest-green rounded-lg hover:bg-gray-50 transition-colors relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            {newBookingCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">
                {newBookingCount}
              </span>
            )}
          </button>
          <span className="font-serif font-bold text-forest-green tracking-widest text-lg">TAM BAN</span>
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${roleBadge.cls}`}>{roleBadge.label}</span>
        </div>

        <main className="flex-grow p-6 md:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
