import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';

const ROOMS = [
  {
    id: 'don',
    name: 'Phòng Riêng',
    badge: 'Chỉ 3 phòng',            // Khan hiếm: tạo cảm giác cần đặt sớm
    price: 'Từ 400.000 VNĐ / đêm',
    desc: 'Phòng khép kín ấm cúng, vách gỗ thông mộc mạc giữa đại ngàn Mèo Vạc. Tối đa 2 khách — dành cho cặp đôi hoặc người tìm sự riêng tư trọn vẹn. Cả homestay chỉ có 3 phòng riêng. Giá linh hoạt theo bữa ăn: 400k chỉ phòng · 450k kèm bữa sáng · 750k trọn 3 bữa bản địa.',
    features: ['Khép kín, riêng tư', 'Phòng tắm riêng', 'Tối đa 2 khách', 'View núi đá yên tĩnh'],
    images: [
      '/images/13.png',
      '/images/14.png',
      '/images/15.png',
    ],
    reverse: false,
  },
  {
    id: 'dorm',
    name: 'Giường Dorm',
    badge: 'Không Giường Tầng',
    price: '120.000 VNĐ / giường',
    desc: 'Phòng chung rộng rãi với 20 giường đơn, ấm áp mà vẫn tinh tế. Chúng tôi nói "Không" với giường tầng — mỗi giường đều có không gian và sự riêng tư của riêng mình.',
    features: ['20 giường đơn rộng rãi', 'Tủ đựng đồ có khóa', 'WC chung sạch sẽ', 'Cộng đồng thân thiện'],
    images: [
      '/images/16.png',
      '/images/17.png',
      '/images/18.png',
    ],
    reverse: true,
  },
];

function RoomCarousel({ images, badge }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);

  const prev = () => setIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex(i => (i === images.length - 1 ? 0 : i + 1));

  const onTouchStart = e => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = e => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -40) next();
    else if (dx > 40) prev();
    touchStartX.current = null;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3] select-none"
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {badge && (
        <span className="absolute top-5 right-5 bg-forest-green text-white px-3 py-1.5 text-[10px] tracking-widest uppercase z-20 shadow-md rounded-sm">
          {badge}
        </span>
      )}
      <div className="relative w-full h-full">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Anh ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
          />
        ))}
      </div>
      <button onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/65 text-white rounded-full flex items-center justify-center transition-all z-10 active:scale-95"
        aria-label="Anh truoc">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/65 text-white rounded-full flex items-center justify-center transition-all z-10 active:scale-95"
        aria-label="Anh tiep">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-white w-5' : 'bg-white/50 w-2'}`}
            aria-label={`Anh ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function BungalowPage() {
  return (
    <div className="bg-off-white min-h-screen font-sans">
      <Navbar />

      <section className="relative min-h-[58vh] flex items-center justify-center bg-forest-dark text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center hero-kenburns opacity-50"
          style={{ backgroundImage: "url('/images/12.png')" }} />
        <div className="relative z-10 px-4">
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4 drop-shadow-xl text-cream">Các Hạng Phòng</h2>
          <p className="font-light tracking-widest uppercase text-sm opacity-90">Trở về với mộc mạc — Ôm trọn bình yên</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-20 px-6 space-y-24">
        {ROOMS.map(room => (
          <div key={room.id}
            className={`flex flex-col ${room.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-14`}>
            <div className="w-full md:w-1/2">
              <RoomCarousel images={room.images} badge={room.badge} />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-serif text-forest-green mb-3">{room.name}</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-6">{room.desc}</p>
              <ul className="space-y-2 mb-6">
                {room.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-forest-medium shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className="inline-block bg-off-white border border-forest-medium text-forest-medium font-semibold text-base px-5 py-2.5 rounded-sm">
                  {room.price}
                </span>
                <a href="/#dat-phong"
                  className="inline-flex items-center gap-2 bg-forest-medium text-white px-5 py-2.5 text-xs tracking-widest uppercase font-bold hover:bg-[#1E5225] active:scale-95 transition-all rounded-sm shadow-sm">
                  Đặt ngay
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
