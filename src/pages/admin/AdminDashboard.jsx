import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'buổi sáng';
  if (h < 18) return 'buổi chiều';
  return 'buổi tối';
}

const QUICK_LINKS = [
  {
    to: '/admin/nhat-ky/tao-moi',
    label: 'Viết bài mới',
    desc: 'Đăng mẩu chuyện lên Nhật ký TÂM BẢN',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
      </svg>
    ),
    color: 'bg-forest-light text-forest-green',
    adminOnly: true,
  },
  {
    to: '/admin/nhat-ky',
    label: 'Quản lý Nhật ký',
    desc: 'Xem, sửa và xóa bài viết đã đăng',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>
    ),
    color: 'bg-blue-50 text-blue-700',
    adminOnly: true,
  },
  {
    to: '/',
    label: 'Xem trang chủ',
    desc: 'Mở website du lịch TÂM BẢN',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
      </svg>
    ),
    color: 'bg-amber-50 text-amber-700',
    adminOnly: false,
    external: true,
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (!savedRole) {
      navigate('/admin/login');
      return;
    }
    setRole(savedRole);
  }, []);

  const displayName = role === 'super_admin' ? 'Quản lý' : 'Lễ tân';

  return (
    <div>
      {/* Welcome header */}
      <header className="mb-10">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
          Chào {getGreeting()}, {displayName}! 👋
        </h3>
        <p className="text-gray-400 mt-1 text-sm">Đây là tổng quan hệ thống TÂM BẢN Homestay hôm nay.</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Lượt xem bài viết</p>
              <h4 className="text-3xl font-bold text-gray-800">1,250</h4>
              <p className="text-green-500 text-xs mt-2 font-medium">↑ 12% so với tuần trước</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Phòng Hot nhất</p>
              <h4 className="text-xl font-bold text-gray-800">Phòng Riêng</h4>
              <p className="text-forest-green text-xs mt-2 italic font-medium">Chiếm 65% lượt hỏi</p>
            </div>
            <div className="w-10 h-10 bg-forest-light rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Nhật ký mới nhất</p>
              <h4 className="text-base font-bold text-gray-800 italic truncate max-w-[150px]">"Mùa sương giăng..."</h4>
              <p className="text-gray-400 text-xs mt-2">Đăng bởi Quản lý</p>
            </div>
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Thao tác nhanh</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {QUICK_LINKS
            .filter(link => !link.adminOnly || role === 'super_admin')
            .map(link => (
              <button
                key={link.to}
                onClick={() => navigate(link.to)}
                className="bg-white border border-gray-100 rounded-2xl p-5 text-left hover:shadow-md hover:border-gray-200 active:scale-[0.98] transition-all duration-200 flex items-start gap-4"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${link.color}`}>
                  {link.icon}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{link.label}</p>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{link.desc}</p>
                </div>
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );
}
