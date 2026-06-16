import React from 'react';
import Navbar from '../components/Navbar';

// ============================================================
// Dữ liệu địa hình
// ============================================================
const landmarks = [
  {
    name: "Đèo Ma Pì Lèng",
    tag: "Tứ Đại Đỉnh Đèo",
    tagColor: "bg-forest-green text-white",
    elevation: "~1.200m",
    desc:
      "Ma Pì Lèng — tiếng H'Mông có nghĩa là 'Sống Mũi Ngựa' — là một trong bốn đại đỉnh đèo huyền thoại của Việt Nam (cùng Ô Quy Hồ, Khau Phạ, Pha Đin). Con đèo dài 20km uốn lượn trên vách đá dựng đứng bên sườn núi Mã Pí Lèng, nhìn xuống vực thẳm sông Nho Quế xanh biếc sâu hàng trăm mét. Đây là đoạn đường được coi là nguy hiểm và đẹp nhất trên Quốc lộ 4C.",
    img: "/images/29.png",
  },
  {
    name: "Hẻm Vực Tu Sản & Sông Nho Quế",
    tag: "Sâu nhất Đông Nam Á",
    tagColor: "bg-blue-700 text-white",
    elevation: "~700m chiều sâu",
    desc:
      "Chạy dưới chân đèo Ma Pì Lèng, sông Nho Quế tạo ra hẻm vực Tu Sản — vực đá vôi sâu nhất Đông Nam Á với chiều sâu lên đến 700 mét so với mặt đường. Dòng nước màu xanh ngọc bích lấp lánh giữa hai vách đá dựng đứng, chỉ có thể tiếp cận bằng thuyền hoặc nhìn từ trên cao. Đây là điểm chụp ảnh ngoạn mục bậc nhất Hà Giang.",
    img: "/images/30.png",
  },
  {
    name: "Cao Nguyên Đá Đồng Văn",
    tag: "UNESCO Global Geopark",
    tagColor: "bg-green-700 text-white",
    elevation: "900–1.600m",
    desc:
      "Được UNESCO công nhận là Công viên Địa chất Toàn cầu năm 2010, Cao nguyên Đá Đồng Văn trải rộng hơn 2.350 km² bao gồm 4 huyện Quản Bạ, Yên Minh, Đồng Văn và Mèo Vạc. Địa hình karst đá vôi hình thành từ 400–600 triệu năm trước, với những khối đá tai mèo nhọn hoắt trải dài bất tận tạo nên cảnh quan không nơi nào trên Trái đất có được.",
    img: "/images/31.png",
  },
  {
    name: "Thung Lũng & Các Điểm Nhìn",
    tag: "Toàn cảnh đại ngàn",
    tagColor: "bg-amber-700 text-white",
    elevation: "Nhiều độ cao",
    desc:
      "Ngoài những điểm nổi tiếng, Mèo Vạc còn ẩn chứa vô số góc nhìn tuyệt đẹp: thung lũng Sủng Là với cánh đồng tam giác mạch rực hồng tháng 10, bản Pả Vi với ngôi nhà cổ trình tường trăm năm, hay đơn giản là một đoạn đường núi vắng người buổi sớm mai sương giăng — đó đã là thiên đường của người yêu thiên nhiên.",
    img: "/images/32.png",
  },
];

// ============================================================
// Dữ liệu 4 mùa
// ============================================================
const seasons = [
  {
    season: "Mùa Xuân",
    months: "Tháng 2 – 4",
    temp: "12 – 20°C",
    icon: "🌸",
    highlight: "Hoa đào, lê trắng và tam giác mạch đầu mùa nở khắp sườn núi",
    desc: "Đây là mùa đẹp nhất để ghé thăm các bản làng. Không khí trong lành, se lạnh nhẹ. Hoa đào đỏ thắm, hoa lê trắng tinh khôi và những cánh đồng tam giác mạch hồng đầu mùa tạo nên khung cảnh thiên đường. Người H'Mông trong trang phục rực rỡ đổ xuống chợ phiên — đây là thời điểm văn hóa sôi động nhất năm.",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    textColor: "text-pink-800",
    recommend: true,
  },
  {
    season: "Mùa Hè",
    months: "Tháng 5 – 8",
    temp: "20 – 28°C",
    icon: "🌿",
    highlight: "Ruộng bậc thang xanh mướt, thác nước đầy, không khí mát mẻ",
    desc: "Dù là mùa mưa, Mèo Vạc không oi bức như miền xuôi nhờ độ cao trên 1.000m. Mưa thường đến nhanh và đi nhanh vào buổi chiều. Bù lại, núi rừng xanh tươi đến tuyệt vời — ruộng bậc thang trên sườn đá xanh mướt như nhung, suối thác đầy nước, không khí trong lành mát mẻ. Thích hợp cho những ai yêu thiên nhiên hoang dã.",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-800",
    recommend: false,
  },
  {
    season: "Mùa Thu",
    months: "Tháng 9 – 11",
    temp: "15 – 24°C",
    icon: "🌾",
    highlight: "Mùa hoa tam giác mạch đẹp nhất & mùa gặt lúa nương vàng óng",
    desc: "Tháng 10 – 11 là đỉnh điểm mùa hoa tam giác mạch — những cánh đồng trải dài một màu tím hồng mộng mơ giữa đá xám, tạo ra cảnh sắc độc nhất vô nhị không thể tìm thấy ở đâu trên đất Việt. Đây cũng là mùa gặt lúa nương, khi những thửa ruộng bậc thang chuyển vàng rực rỡ. Thời tiết mát mẻ, trời trong xanh — mùa lý tưởng nhất để du lịch.",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-800",
    recommend: true,
  },
  {
    season: "Mùa Đông",
    months: "Tháng 12 – 1",
    temp: "3 – 15°C",
    icon: "❄️",
    highlight: "Sương mù huyền ảo, đôi khi có băng giá & tuyết rơi hiếm hoi",
    desc: "Mùa đông Mèo Vạc có thể rất lạnh, nhiệt độ đêm xuống dưới 5°C, đôi khi đến 0–2°C. Sương mù dày đặc bao phủ núi non tạo cảnh quan huyền ảo như cõi mộng. Những năm thời tiết đặc biệt lạnh, tuyết rơi mỏng trên đỉnh núi là khoảnh khắc hiếm hoi vô cùng quý giá. Du khách cần chuẩn bị áo ấm dày nhưng sẽ được trải nghiệm khung cảnh núi rừng đông giá cực kỳ ấn tượng.",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-800",
    recommend: false,
  },
];

// ============================================================
// Lưu ý khi du lịch
// ============================================================
const travelTips = [
  { icon: "👕", tip: "Luôn mang theo áo ấm, kể cả vào mùa hè — buổi tối vùng cao se lạnh bất ngờ." },
  { icon: "🥾", tip: "Giày đế bám tốt là bắt buộc. Đá tai mèo rất sắc và trơn khi ướt." },
  { icon: "🌞", tip: "Tia UV ở độ cao 1.000m+ rất mạnh. Kem chống nắng SPF 50+ và mũ rộng vành là cần thiết." },
  { icon: "💧", tip: "Mang theo nước đầy đủ. Không phải điểm tham quan nào cũng có dịch vụ." },
  { icon: "📱", tip: "Sóng điện thoại ở nhiều đoạn đèo và bản làng rất yếu hoặc mất sóng hoàn toàn." },
  { icon: "⛽", tip: "Đổ đầy xăng tại thị trấn Mèo Vạc trước khi đi xa. Trạm xăng thưa thớt trên núi." },
];

export default function DiaHinhThoiTietPage() {
  return (
    <div className="bg-off-white min-h-screen font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen min-h-[560px] flex items-center justify-center text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center hero-kenburns"
          style={{ backgroundImage: "url('/images/28.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/75 via-forest-dark/30 to-forest-dark/90" />
        <div className="relative z-10 px-6 max-w-3xl">
          <p className="text-xs tracking-[0.4em] uppercase mb-4 opacity-80 font-light">Địa lý · Khí hậu · Cảnh quan</p>
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-xl text-cream">
            Vùng Đất Của Đá & Mây
          </h2>
          <p className="text-base md:text-lg font-light tracking-wide opacity-90 leading-relaxed">
            Cao nguyên đá Đồng Văn — nơi những mỏm đá 500 triệu tuổi vươn lên giữa trời và mây, tạo nên cảnh quan địa chất độc nhất hành tinh.
          </p>
        </div>
      </section>

      {/* Tổng quan địa hình */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h3 className="text-3xl font-serif text-forest-green mb-6">Địa Hình Mèo Vạc</h3>
        <p className="text-gray-600 font-light leading-relaxed text-lg mb-4">
          Mèo Vạc nằm trên Cao nguyên Đá Đồng Văn ở độ cao trung bình 900–1.600m so với mực nước biển. Địa hình chủ yếu là đá vôi karst với những vách núi dựng đứng, hẻm vực sâu thẳm và những thung lũng hẹp ẩn mình giữa bốn bề là đá tai mèo — loại đá có tuổi đời lên đến 400–600 triệu năm.
        </p>
        <p className="text-gray-600 font-light leading-relaxed text-lg">
          Chính địa hình cực kỳ phức tạp và hiểm trở này đã vừa cô lập, vừa tôi luyện tinh thần kiên cường của người dân bản địa, đồng thời tạo nên vẻ đẹp hùng vĩ không nơi nào có thể sánh được.
        </p>
        <div className="grid grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <p className="text-3xl font-serif font-bold text-forest-green mb-1">900–1.600m</p>
            <p className="text-gray-500 text-sm font-light">Độ cao trung bình</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <p className="text-3xl font-serif font-bold text-forest-green mb-1">~700m</p>
            <p className="text-gray-500 text-sm font-light">Chiều sâu hẻm vực Tu Sản</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <p className="text-3xl font-serif font-bold text-forest-green mb-1">2010</p>
            <p className="text-gray-500 text-sm font-light">UNESCO Geopark</p>
          </div>
        </div>
      </section>

      {/* Các điểm địa hình nổi bật */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-forest-medium text-xs font-bold tracking-widest uppercase block mb-3">Kỳ quan thiên nhiên</span>
            <h3 className="text-3xl font-serif text-forest-green mb-3">Những Điểm Đến Không Thể Bỏ Qua</h3>
            <div className="w-16 h-0.5 bg-forest-medium mx-auto" />
          </div>

          <div className="space-y-20">
            {landmarks.map((lm, i) => (
              <div
                key={lm.name}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
              >
                <div className="w-full md:w-1/2 overflow-hidden rounded-2xl aspect-[4/3] shadow-lg relative">
                  <span className={`absolute top-5 left-5 z-10 px-4 py-1.5 text-xs font-bold tracking-widest rounded-sm shadow ${lm.tagColor}`}>
                    {lm.tag}
                  </span>
                  <img
                    src={lm.img}
                    alt={lm.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <div className="text-forest-medium text-sm font-bold tracking-widest uppercase mb-2">Độ cao: {lm.elevation}</div>
                  <h4 className="text-3xl font-serif text-forest-green mb-4">{lm.name}</h4>
                  <p className="text-gray-600 font-light leading-relaxed">{lm.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thời tiết 4 mùa */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="text-center mb-14">
          <span className="text-forest-medium text-xs font-bold tracking-widest uppercase block mb-3">Lịch du lịch</span>
          <h3 className="text-3xl font-serif text-forest-green mb-3">Thời Tiết & Bốn Mùa Mèo Vạc</h3>
          <div className="w-16 h-0.5 bg-forest-medium mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {seasons.map((s) => (
            <div
              key={s.season}
              className={`rounded-2xl p-8 border-2 ${s.bgColor} ${s.borderColor} relative overflow-hidden`}
            >
              {s.recommend && (
                <span className="absolute top-4 right-4 bg-forest-medium text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full">
                  ✓ ĐỀ XUẤT
                </span>
              )}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{s.icon}</span>
                <div>
                  <h4 className={`text-xl font-serif font-bold ${s.textColor}`}>{s.season}</h4>
                  <p className="text-gray-500 text-sm font-light">{s.months} · {s.temp}</p>
                </div>
              </div>
              <p className={`text-sm font-bold mb-3 ${s.textColor}`}>{s.highlight}</p>
              <p className="text-gray-600 font-light leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Tóm tắt thời điểm lý tưởng */}
        <div className="mt-12 bg-forest-green text-white rounded-2xl p-10 text-center">
          <h4 className="text-2xl font-serif mb-4">Thời Điểm Lý Tưởng Nhất</h4>
          <p className="font-light opacity-90 leading-relaxed max-w-3xl mx-auto">
            <strong className="font-bold">Tháng 3 – 4:</strong> Hoa đào, hoa lê, tam giác mạch đầu mùa — thiên nhiên bừng sáng sau đông giá. &nbsp;·&nbsp;
            <strong className="font-bold">Tháng 10 – 11:</strong> Hoa tam giác mạch tím hồng đẹp nhất năm, trời trong, thời tiết mát mẻ hoàn hảo.
          </p>
        </div>
      </section>

      {/* Lưu ý du lịch */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif text-forest-green mb-3">Lưu Ý Khi Du Lịch Mèo Vạc</h3>
            <div className="w-16 h-0.5 bg-forest-medium mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelTips.map((tip) => (
              <div key={tip.tip} className="flex items-start gap-4 bg-off-white rounded-xl p-6 border border-gray-100">
                <span className="text-2xl shrink-0">{tip.icon}</span>
                <p className="text-gray-600 font-light text-sm leading-relaxed">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-green text-white py-16 text-center px-6">
        <h3 className="text-2xl font-serif mb-4">Sẵn sàng chinh phục Mèo Vạc?</h3>
        <p className="font-light opacity-90 max-w-2xl mx-auto mb-8 leading-relaxed">
          TÂM BẢN Homestay là điểm dừng chân lý tưởng để bạn khám phá toàn bộ vẻ đẹp của huyện Mèo Vạc — từ đèo Ma Pì Lèng đến phiên chợ văn hóa cuối tuần.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/#dat-phong" className="inline-block bg-white text-forest-green px-8 py-3 font-bold text-sm tracking-widest hover:bg-off-white transition-all duration-300 rounded-sm">
            ĐẶT PHÒNG NGAY
          </a>
          <a href="/van-hoa" className="inline-block border border-white text-white px-8 py-3 font-bold text-sm tracking-widest hover:bg-white/10 transition-all duration-300 rounded-sm">
            VĂN HÓA & CON NGƯỜI →
          </a>
        </div>
      </section>

      {/* Footer đơn giản */}
      <footer className="bg-white border-t border-gray-100 py-8 text-center px-6">
        <p className="text-gray-400 text-xs font-light">© 2025 TÂM BẢN Homestay · Mèo Vạc · Hà Giang</p>
      </footer>
    </div>
  );
}
