import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const STATUS_MAP = {
  new:       { label: 'Mới', cls: 'bg-amber-100 text-amber-700 border-amber-200' },
  confirmed: { label: 'Đã xác nhận', cls: 'bg-blue-100 text-blue-700 border-blue-200' },
  done:      { label: 'Hoàn thành', cls: 'bg-green-100 text-green-700 border-green-200' },
  cancelled: { label: 'Đã hủy', cls: 'bg-gray-100 text-gray-500 border-gray-200' },
};

function SkeletonRow() {
  return (
    <tr>
      {[1,2,3,4,5].map(i => (
        <td key={i} className="px-5 py-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${60 + i * 10}%` }} />
        </td>
      ))}
    </tr>
  );
}

function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 ${type === 'error' ? 'bg-red-600' : 'bg-green-600'} text-white px-5 py-3.5 rounded-xl shadow-xl text-sm font-medium`}>
      {type === 'error'
        ? <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
        : <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
      }
      {message}
    </div>
  );
}

function DetailModal({ booking, onClose, onStatusChange }) {
  if (!booking) return null;
  const s = STATUS_MAP[booking.status] || STATUS_MAP.new;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{booking.name}</h3>
            <p className="text-sm text-gray-400 mt-0.5">{booking.date}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <Row icon="📞" label="Điện thoại" val={booking.phone} />
          <Row icon="🛏️" label="Phòng" val={booking.roomType} />
          <Row icon="👥" label="Số khách" val={`${booking.guests} khách`} />
          <Row icon="📅" label="Nhận phòng" val={booking.checkin} />
          <Row icon="📅" label="Trả phòng" val={booking.checkout} />
          {booking.meals && booking.meals.length > 0 && (
            <div className="flex gap-3">
              <span className="text-base shrink-0">🍽️</span>
              <div>
                <p className="text-gray-400 font-medium mb-1">Ẩm thực đặt trước</p>
                <ul className="space-y-0.5">
                  {booking.meals.map(m => <li key={m} className="text-gray-700">• {m}</li>)}
                </ul>
              </div>
            </div>
          )}
          {booking.note && <Row icon="📝" label="Ghi chú" val={booking.note} />}
        </div>

        <div className="mt-6 border-t border-gray-100 pt-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Cập nhật trạng thái</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(STATUS_MAP).map(([key, { label, cls }]) => (
              <button key={key} onClick={() => onStatusChange(booking.id, key)}
                className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${booking.status === key ? cls + ' ring-2 ring-offset-1 ring-current' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, val }) {
  return (
    <div className="flex gap-3">
      <span className="text-base shrink-0">{icon}</span>
      <div>
        <p className="text-gray-400 font-medium">{label}</p>
        <p className="text-gray-800">{val}</p>
      </div>
    </div>
  );
}

export default function DatPhongPage() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetch = async () => {
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
      setToast({ message: 'Không thể tải danh sách đặt phòng.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  // Mark as read when opened
  const handleOpen = async (b) => {
    setSelected(b);
    if (b.status === 'new') {
      try {
        await updateDoc(doc(db, 'bookings', b.id), { status: 'confirmed' });
        setBookings(prev => prev.map(x => x.id === b.id ? { ...x, status: 'confirmed' } : x));
        setSelected({ ...b, status: 'confirmed' });
      } catch (_) {}
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
      setBookings(prev => prev.map(x => x.id === id ? { ...x, status } : x));
      setSelected(prev => prev && prev.id === id ? { ...prev, status } : prev);
      setToast({ message: 'Cập nhật trạng thái thành công.', type: 'success' });
    } catch (err) {
      setToast({ message: 'Có lỗi xảy ra.', type: 'error' });
    }
  };

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);
  const newCount = bookings.filter(b => b.status === 'new').length;

  return (
    <>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
              Quản lý Đặt phòng
              {newCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                  {newCount}
                </span>
              )}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {isLoading ? 'Đang tải...' : `${bookings.length} yêu cầu · ${newCount} chưa đọc`}
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[['all', 'Tất cả'], ['new', 'Mới'], ['confirmed', 'Đã xác nhận'], ['done', 'Hoàn thành'], ['cancelled', 'Đã hủy']].map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${filter === key ? 'bg-forest-green text-white border-forest-green' : 'bg-white text-gray-500 border-gray-200 hover:border-forest-green hover:text-forest-green'}`}>
              {label}
              {key === 'new' && newCount > 0 && (
                <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{newCount}</span>
              )}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Mobile cards */}
          {!isLoading && filtered.length > 0 && (
            <div className="sm:hidden divide-y divide-gray-100">
              {filtered.map(b => {
                const s = STATUS_MAP[b.status] || STATUS_MAP.new;
                return (
                  <button key={b.id} onClick={() => handleOpen(b)}
                    className={`w-full px-5 py-4 flex items-start justify-between gap-3 text-left hover:bg-gray-50 transition-colors ${b.status === 'new' ? 'bg-amber-50' : ''}`}>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 text-sm">{b.name}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{b.phone} · {b.checkin} → {b.checkout}</p>
                      <p className="text-gray-500 text-xs mt-0.5 truncate">{b.roomType}</p>
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${s.cls}`}>{s.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Desktop table */}
          <table className="w-full text-left hidden sm:table">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-5 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Khách hàng</th>
                <th className="px-5 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Phòng</th>
                <th className="px-5 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Ngày ở</th>
                <th className="px-5 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Ngày gửi</th>
                <th className="px-5 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                : filtered.length === 0
                  ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-16 text-center text-gray-400">
                        Không có yêu cầu đặt phòng nào.
                      </td>
                    </tr>
                  )
                  : filtered.map(b => {
                    const s = STATUS_MAP[b.status] || STATUS_MAP.new;
                    return (
                      <tr key={b.id} onClick={() => handleOpen(b)}
                        className={`hover:bg-gray-50 transition-colors cursor-pointer ${b.status === 'new' ? 'bg-amber-50/50' : ''}`}>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-gray-800 text-sm">{b.name}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{b.phone}</p>
                        </td>
                        <td className="px-5 py-4 text-gray-600 text-sm">{b.roomType}</td>
                        <td className="px-5 py-4 text-gray-500 text-sm">{b.checkin} → {b.checkout}</td>
                        <td className="px-5 py-4 text-gray-400 text-sm">{b.date}</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${s.cls}`}>{s.label}</span>
                        </td>
                      </tr>
                    );
                  })
              }
            </tbody>
          </table>
        </div>
      </div>

      <DetailModal booking={selected} onClose={() => setSelected(null)} onStatusChange={handleStatusChange} />
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </>
  );
}
