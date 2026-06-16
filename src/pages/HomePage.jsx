import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Navbar from '../components/Navbar';
import Reveal from '../components/Reveal';

// Section "Khám phá Mèo Vạc" — 4 điểm nhấn nội dung chính
const exploreCards = [
  {
    href: '/van-hoa',
    img: '/images/5.png',
    tag: 'Di sản văn hóa',
    title: 'Văn Hóa & Con Người',
    desc: 'Người H\'Mông, Lô Lô, Giáy — nghề dệt lanh, nhuộm chàm, phiên chợ và lễ hội bản địa.',
  },
  {
    href: '/am-thuc',
    img: '/images/6.png',
    tag: 'Ẩm thực bản địa',
    title: 'Hương Vị Đá & Lửa',
    desc: 'Mèn mén, thắng cố, gà đen H\'Mông, rượu ngô men lá — vị nguyên bản từ núi rừng.',
  },
  {
    href: '/dia-hinh-thoi-tiet',
    img: '/images/7.png',
    tag: 'UNESCO Geopark',
    title: 'Địa Hình & Thời Tiết',
    desc: 'Đèo Ma Pì Lèng, hẻm vực Tu Sản, cao nguyên đá 500 triệu tuổi và 4 mùa đặc sắc.',
  },
  {
    href: '/nhat-ky',
    img: '/images/8.png',
    tag: 'Nhật ký lữ khách',
    title: 'Nhật Ký TÂM BẢN',
    desc: 'Những mẩu chuyện nhỏ từ bản làng, ghi chép của người ở lại lâu hơn dự định.',
  },
];

// ── BookingSection (tách riêng để dùng useState) ─────────────────────────
function BookingSection() {
  const [form, setForm] = useState({
    name: '', phone: '', checkin: '', checkout: '', roomType: 'Phòng Riêng (400k/đêm)',
    guests: '1', meals: [], note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const MEALS = [
    'Bữa sáng: Mèn mén & Canh tẩu chúa (50k/suất)',
    'Bữa trưa: Mâm cơm bản tiêu chuẩn (150k/suất)',
    "Bữa tối: Lẩu Gà Đen H'Mông (150k/suất)",
  ];

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleMeal = (meal) => {
    setForm(f => ({
      ...f,
      meals: f.meals.includes(meal) ? f.meals.filter(m => m !== meal) : [...f.meals, meal],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Vui lòng nhập họ tên và số điện thoại.');
      return;
    }
    if (!form.checkin || !form.checkout) {
      setError('Vui lòng chọn ngày nhận và ngày trả phòng.');
      return;
    }
    if (form.checkin >= form.checkout) {
      setError('Ngày trả phòng phải sau ngày nhận phòng.');
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        ...form,
        status: 'new',
        createdAt: Date.now(),
        date: new Date().toLocaleDateString('vi-VN', { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Lỗi gửi đặt phòng:', err);
      setError('Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp qua điện thoại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls = "w-full border-b border-gray-300 py-2 focus:outline-none focus:border-forest-green text-ink transition-colors bg-transparent";

  return (
    <section id="dat-phong" className="max-w-6xl mx-auto pb-24 px-6">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">

        {/* Cột trái */}
        <div className="bg-forest-green text-white p-10 md:p-14 md:w-2/5 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 pointer-events-none" />
          <h3 className="text-3xl md:text-4xl font-serif mb-6 relative z-10">Lên lịch trình<br />của bạn</h3>
          <p className="font-light opacity-90 mb-10 leading-relaxed relative z-10">
            Hãy để TÂM BẢN chuẩn bị không gian nghỉ ngơi ấm áp và những mâm cơm bản địa nóng hổi chờ đón bạn sau chuyến đi dài.
          </p>
          <div className="space-y-4 font-light relative z-10">
            <p className="flex items-center gap-3"><span className="text-xl">📍</span> Thôn Bản Máy, Mèo Vạc, Hà Giang</p>
            <p className="flex items-center gap-3"><span className="text-xl">📞</span> 0987.xxx.xxx</p>
          </div>
        </div>

        {/* Cột phải: Form */}
        <div className="p-10 md:p-14 md:w-3/5">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h4 className="text-2xl font-serif text-forest-green mb-3">Gửi thành công!</h4>
              <p className="text-gray-500 font-light leading-relaxed max-w-sm">
                TÂM BẢN đã nhận được yêu cầu của bạn. Chúng tôi sẽ liên hệ xác nhận trong vòng 24 giờ.
              </p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', checkin: '', checkout: '', roomType: 'Phòng Riêng (400k/đêm)', guests: '1', meals: [], note: '' }); }}
                className="mt-8 text-sm text-forest-medium font-bold underline underline-offset-4 hover:text-forest-green transition-colors">
                Gửi yêu cầu khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7" noValidate>
              {error && (
                <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  {error}
                </div>
              )}

              {/* Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-gray-500 mb-2 uppercase tracking-widest font-semibold">Họ và tên *</label>
                  <input type="text" required value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="Nguyễn Văn A" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2 uppercase tracking-widest font-semibold">Số điện thoại *</label>
                  <input type="tel" required value={form.phone} onChange={e => set('phone', e.target.value)}
                    placeholder="0912 345 678" className={inputCls} />
                </div>
              </div>

              {/* Dates + Room */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs text-gray-500 mb-2 uppercase tracking-widest font-semibold">Ngày nhận *</label>
                  <input type="date" required value={form.checkin} onChange={e => set('checkin', e.target.value)}
                    className={inputCls + ' cursor-pointer'} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2 uppercase tracking-widest font-semibold">Ngày trả *</label>
                  <input type="date" required value={form.checkout} onChange={e => set('checkout', e.target.value)}
                    className={inputCls + ' cursor-pointer'} />
                </div>
                <div>
                  {/* Nhãn & giới hạn đổi theo loại chỗ ở: Phòng Riêng tối đa 2 khách, Giường Dorm tính theo số giường */}
                  <label className="block text-xs text-gray-500 mb-2 uppercase tracking-widest font-semibold">
                    {form.roomType.startsWith('Phòng Riêng') ? 'Số khách' : 'Số giường'}
                  </label>
                  <select value={form.guests} onChange={e => set('guests', e.target.value)} className={inputCls + ' cursor-pointer'}>
                    {(form.roomType.startsWith('Phòng Riêng') ? [1,2] : [1,2,3,4,5,6,7,8,9,10]).map(n => (
                      <option key={n} value={n}>{n} {form.roomType.startsWith('Phòng Riêng') ? 'khách' : 'giường'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Room type */}
              <div>
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-widest font-semibold">Loại chỗ ở</label>
                {/* Đổi loại sẽ reset số khách/giường về 1 để tránh vượt sức chứa */}
                <select value={form.roomType} onChange={e => setForm(f => ({ ...f, roomType: e.target.value, guests: '1' }))} className={inputCls + ' cursor-pointer'}>
                  <option>Phòng Riêng (400k/đêm)</option>
                  <option>Giường Dorm (120k/giường)</option>
                </select>
                {/* Gợi ý gói giá để khách dễ hình dung — chọn bữa ăn bên dưới sẽ cộng vào */}
                <p className="mt-2 text-[11px] text-gray-400 leading-relaxed">
                  Phòng Riêng: 400k chỉ phòng · 450k kèm bữa sáng · 750k trọn 3 bữa bản địa. Giường Dorm: 120k/giường. Chọn bữa ăn bên dưới để cộng vào giá.
                </p>
              </div>

              {/* Meals */}
              <div>
                <label className="block text-sm text-forest-green mb-4 uppercase tracking-widest font-bold">Đặt trước ẩm thực (Tùy chọn)</label>
                <div className="space-y-3 bg-off-white p-5 rounded-xl border border-gray-100">
                  {MEALS.map(meal => (
                    <label key={meal} className="flex items-center gap-4 cursor-pointer group">
                      <input type="checkbox" checked={form.meals.includes(meal)} onChange={() => toggleMeal(meal)}
                        className="w-4 h-4 text-forest-green rounded accent-forest-green shrink-0" />
                      <span className="text-gray-700 text-sm group-hover:text-forest-green transition-colors">{meal}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-widest font-semibold">Ghi chú đặc biệt</label>
                <textarea rows="2" value={form.note} onChange={e => set('note', e.target.value)}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-forest-green resize-none text-ink placeholder-gray-400 bg-transparent"
                  placeholder="Ví dụ: Tôi đi cùng trẻ em, tôi dị ứng với hành..." />
              </div>

              <button type="submit" disabled={isSubmitting}
                className="w-full bg-forest-medium text-white font-bold tracking-widest py-4 rounded-sm hover:bg-[#1E5225] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Đang gửi...
                  </>
                ) : 'GỬI YÊU CẦU ĐẶT PHÒNG'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}


export default function HomePage() {
  return (
    <div className="bg-off-white min-h-screen">
      <Navbar />

      {/* 1. Hero Section — full-bleed immersive */}
      <section className="relative w-full overflow-hidden" style={{ height: '100svh', minHeight: 560 }}>
        {/* Ảnh nền + phóng chậm (ken burns) */}
        <div className="absolute inset-0 bg-cover bg-center hero-kenburns" style={{ backgroundImage: "url('/images/4.png')" }} />
        {/* Lớp phủ gradient forest cho chữ nổi */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(30,82,37,0.55) 0%, rgba(30,82,37,0.22) 42%, rgba(30,82,37,0.85) 100%)' }} />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="reveal is-visible inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-forest-medium/85 border border-white/25">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white">UNESCO · Cao nguyên đá Đồng Văn</span>
          </div>
          <h1 className="font-serif font-bold text-cream drop-shadow-xl" style={{ fontSize: 'clamp(2.4rem, 7vw, 5.2rem)', lineHeight: 1.08, letterSpacing: '0.01em', maxWidth: 920 }}>
            CHẠM VÀO<br /><span style={{ color: '#8FD89B' }}>TRÁI TIM CỦA ĐÁ</span>
          </h1>
          <p className="mt-6 max-w-xl font-light" style={{ color: 'rgba(251,247,236,0.92)', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', lineHeight: 1.7 }}>
            Nghỉ ngơi giữa lòng đại ngàn H'Mông — nơi sự mộc mạc và tinh tế giao thoa, tại TÂM BẢN Homestay · Mèo Vạc · Hà Giang.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href="#dat-phong" className="px-8 py-3.5 rounded-full text-sm font-bold tracking-[0.05em] text-white bg-forest-medium hover:bg-forest-green hover:-translate-y-0.5 transition-all duration-200" style={{ boxShadow: '0 10px 30px -8px rgba(61,139,71,0.6)' }}>
              ĐẶT PHÒNG NGAY
            </a>
            <a href="#kham-pha" className="px-8 py-3.5 rounded-full text-sm font-semibold tracking-[0.05em] text-cream border-[1.5px] border-white/60 hover:border-white hover:bg-white/10 transition-all duration-200">
              KHÁM PHÁ MÈO VẠC
            </a>
          </div>
        </div>

        {/* Mũi tên cuộn xuống */}
        <a href="#kham-pha" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cream/70 hover:text-cream transition-colors">
          <span className="text-[10px] tracking-[0.3em] uppercase">Cuộn xuống</span>
          <svg className="w-5 h-5 animate-bob" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
        </a>
      </section>

      {/* Stats bar — nền forest-dark, số lớn sống động */}
      <section className="bg-forest-dark">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v: 'UNESCO', l: 'Công viên địa chất toàn cầu' },
            { v: '3 phòng', l: 'Phòng Riêng khép kín' },
            { v: '20 giường', l: 'Dorm không giường tầng' },
            { v: '10+', l: 'Dân tộc bản địa' },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 100} className="text-center">
              <div className="font-serif font-bold" style={{ color: '#8FD89B', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', letterSpacing: '0.03em' }}>{s.v}</div>
              <div className="mt-1 text-sm font-light" style={{ color: 'rgba(251,247,236,0.78)' }}>{s.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 2. Section Khám phá Mèo Vạc */}
      <section id="kham-pha" className="max-w-7xl mx-auto pt-24 pb-16 px-6">
        <Reveal className="text-center mb-14">
          <span className="text-forest-medium text-xs font-bold tracking-widest uppercase block mb-3">Huyện Mèo Vạc · Hà Giang</span>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-forest-green mb-4">Khám Phá Mèo Vạc</h3>
          <p className="text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            Vùng đất cực bắc Hà Giang — nơi đá và mây, con người và thiên nhiên cùng viết nên câu chuyện của đại ngàn.
          </p>
          <div className="w-16 h-0.5 bg-forest-medium mx-auto mt-8" />
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreCards.map((card, i) => (
            <Reveal key={card.href} delay={i * 80} className="h-full">
            <a
              href={card.href}
              className="lift group bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full"
            >
              <div className="overflow-hidden aspect-[4/3] relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500 z-10" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-forest-green px-3 py-1 text-[10px] font-bold tracking-widest uppercase z-20 rounded-sm shadow-sm">
                  {card.tag}
                </span>
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-lg font-serif text-forest-green mb-2 group-hover:text-forest-medium transition-colors">
                  {card.title}
                </h4>
                <p className="text-gray-500 font-light text-sm leading-relaxed flex-grow">{card.desc}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-forest-medium text-xs font-bold tracking-widest uppercase">Khám phá</span>
                  <span className="text-forest-medium text-sm">→</span>
                </div>
              </div>
            </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Divider văn hóa — ảnh nền #9 + lớp phủ tối để chữ trắng dễ đọc */}
      <section className="relative py-20 px-6 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/9.png')" }} />
        <div className="absolute inset-0 bg-forest-dark/75" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-lg md:text-xl font-serif italic leading-relaxed">
            "Sống trên những mỏm đá tai mèo cằn cỗi quanh năm sương mù bao phủ, người Mèo Vạc đã đúc kết ra một nền văn hóa phi thường — giàu màu sắc, tinh tế trong nghệ thuật và bất khuất trong lao động."
          </p>
          <div className="w-10 h-0.5 bg-white/40 mx-auto mt-6" />
        </div>
      </section>

      {/* 3. Danh Sách Bungalow */}
      <section className="max-w-7xl mx-auto pt-24 pb-12 px-6">
        <Reveal className="text-center mb-16">
          <span className="text-forest-medium text-xs font-bold tracking-widest uppercase block mb-3">TÂM BẢN Homestay</span>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-forest-green mb-4">Chốn Nghỉ Bình Yên</h3>
          <div className="w-20 h-0.5 bg-forest-medium mx-auto" />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Phòng Riêng */}
          <a href="/bungalow" className="lift group cursor-pointer bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-hidden aspect-[4/3] relative">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500 z-10" />
              <img
                src="/images/10.png"
                alt="Phòng Riêng"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
            </div>
            <div className="p-8 text-center">
              <h4 className="text-2xl font-serif text-forest-green mb-2">Phòng Riêng</h4>
              <p className="text-gray-500 mb-6 font-light">Khép kín · tối đa 2 khách · chỉ 3 phòng</p>
              <span className="text-forest-medium font-semibold text-lg tracking-wide border-b border-forest-medium pb-1">Từ 400.000 VNĐ / đêm</span>
            </div>
          </a>

          {/* Giường Dorm */}
          <a href="/bungalow" className="lift group cursor-pointer bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-hidden aspect-[4/3] relative">
              <span className="absolute top-6 left-6 bg-forest-green/90 backdrop-blur-sm text-white px-4 py-2 text-xs tracking-widest uppercase z-20 shadow-md rounded-sm">
                20 Giường Đơn
              </span>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500 z-10" />
              <img
                src="/images/11.png"
                alt="Giường Dorm"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
            </div>
            <div className="p-8 text-center">
              <h4 className="text-2xl font-serif text-forest-green mb-2">Giường Dorm</h4>
              <p className="text-gray-500 mb-6 font-light">Phòng chung ấm áp · không giường tầng</p>
              <span className="text-forest-medium font-semibold text-lg tracking-wide border-b border-forest-medium pb-1">120.000 VNĐ / giường</span>
            </div>
          </a>
        </div>
      </section>

      {/* 4. Form Đặt Phòng */}
      <BookingSection />

      {/* 5. Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <img src="/images/1.png" alt="TÂM BẢN Homestay" className="h-16 w-auto mb-3" />
            <p className="text-forest-medium text-xs font-light tracking-widest uppercase mb-4">Mèo Vạc · Hà Giang</p>
            <p className="text-gray-500 font-light leading-relaxed max-w-sm">
              Homestay giữa lòng đại ngàn H'Mông — cửa ngõ để bạn khám phá văn hóa, con người và cảnh quan huyện Mèo Vạc.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-6">Liên hệ</h4>
            <ul className="text-gray-500 font-light space-y-3 text-sm">
              <li>📍 Thôn Bản Máy, Mèo Vạc, Hà Giang</li>
              <li>📞 090 xxx xxxx</li>
              <li>✉️ hello@tamban.vn</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-6">Khám phá</h4>
            <ul className="text-gray-500 font-light space-y-3 text-sm">
              <li><a href="/van-hoa" className="hover:text-forest-green transition-colors">Văn hóa & Con người</a></li>
              <li><a href="/am-thuc" className="hover:text-forest-green transition-colors">Ẩm thực</a></li>
              <li><a href="/dia-hinh-thoi-tiet" className="hover:text-forest-green transition-colors">Địa hình & Thời tiết</a></li>
              <li><a href="/nhat-ky" className="hover:text-forest-green transition-colors">Nhật ký TÂM BẢN</a></li>
              <li><a href="/bungalow" className="hover:text-forest-green transition-colors">Phòng & Giường</a></li>
              <li>
                <a href="/admin/login" className="text-gray-300 hover:text-forest-green flex items-center gap-2 transition-colors">
                  <span className="text-[10px]">●</span> Quản trị viên
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-50 pt-8 text-center">
          <p className="text-gray-400 text-xs font-light">© 2025 TÂM BẢN Homestay · Mèo Vạc · Hà Giang. All rights reserved.</p>
        </div>
      </footer>

      {/* Nút Zalo */}
      <div className="fixed bottom-8 right-8 z-50">
        <button suppressHydrationWarning title="Chat Zalo" className="w-16 h-16 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white font-bold text-2xl hover:-translate-y-2 hover:shadow-blue-500/50 transition-all duration-300">
          Z
        </button>
      </div>
    </div>
  );
}
