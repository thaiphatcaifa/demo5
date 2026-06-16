import React from 'react';
import Navbar from '../components/Navbar';

// ============================================================
// Dữ liệu dân tộc tại Mèo Vạc
// ============================================================
const ethnicGroups = [
  {
    name: "Người H'Mông",
    pct: "~70%",
    color: "bg-forest-light text-forest-green",
    desc:
      "Chủ nhân của những mỏm đá tai mèo, người H'Mông mang trên mình trang phục thêu tay rực rỡ nhất vùng Đông Bắc. Phụ nữ H'Mông có thể mất 5–7 năm để hoàn thiện một bộ váy thêu cho ngày cưới. Họ sống trong các ngôi nhà trình tường đất, canh tác ngô trên hốc đá và là cộng đồng gìn giữ nghi lễ khèn bè lâu đời nhất.",
    img: "/images/20.png",
  },
  {
    name: "Người Lô Lô",
    pct: "~8%",
    color: "bg-red-50 text-red-700",
    desc:
      "Định cư lâu đời ở Lũng Cú và Mèo Vạc, người Lô Lô nổi tiếng với nghệ thuật ghép vải nhiều màu sắc và nghi lễ đánh trống đồng linh thiêng. Họ lưu giữ truyền thống cúng tổ tiên bằng tiếng Lô Lô cổ và là chủ nhân của những điệu múa trống đồng chỉ xuất hiện trong các nghi lễ năm mới.",
    img: "/images/21.png",
  },
  {
    name: "Người Giáy",
    pct: "~7%",
    color: "bg-amber-50 text-amber-800",
    desc:
      "Người Giáy thường định cư ở các thung lũng ven sông Nho Quế, nơi điều kiện canh tác lúa nước thuận lợi hơn. Họ nổi tiếng với nghề dệt lụa thủ công và ẩm thực tinh tế, đặc biệt là các món chế biến từ cá sông và rau rừng. Trang phục phụ nữ Giáy có đặc trưng bởi họa tiết hoa văn hình học tinh xảo.",
    img: "/images/22.png",
  },
  {
    name: "Người Tày & Dân tộc khác",
    pct: "~15%",
    color: "bg-green-50 text-green-800",
    desc:
      "Người Tày mang đến Mèo Vạc kho tàng dân ca phong phú và kiến trúc nhà sàn độc đáo. Cùng với các dân tộc Dao, Hán, Nùng… họ tạo nên bức tranh đa sắc màu văn hóa, nơi tiếng nói, trang phục và phong tục tập quán của hơn chục dân tộc cùng tồn tại và giao thoa hàng thế kỷ.",
    img: "/images/23.png",
  },
];

// ============================================================
// Dữ liệu nghề lao động truyền thống
// ============================================================
const crafts = [
  {
    icon: "🌾",
    title: "Canh tác đá — Sức sống trên đá tai mèo",
    desc:
      "Hàng trăm năm qua, người H'Mông đã dùng đôi tay trần bóc từng tảng đá, đổ đất màu từ vùng thấp lên tạo thành những ô đất nhỏ trên sườn núi dốc đứng. Trong mỗi hốc đá tưởng như chỉ có thể nuôi rêu xanh đó, họ trồng ngô, đậu, mạch đen. Đây là biểu tượng mạnh mẽ nhất của tinh thần chinh phục thiên nhiên.",
    img: "/images/24.png",
  },
  {
    icon: "🧵",
    title: "Dệt lanh — Câu chuyện của từng sợi chỉ",
    desc:
      "Nghề dệt lanh là linh hồn của người phụ nữ H'Mông. Từ cây lanh trồng trên nương, họ tự tay thu hoạch, tước vỏ, xe sợi trên xa quay gỗ đến khi thành tấm vải thô. Tấm vải được nhuộm chàm, vẽ sáp ong tạo hoa văn rồi thêu thêm bằng chỉ màu. Mỗi bộ váy lanh hoàn chỉnh là tác phẩm nghệ thuật mất vài tháng đến vài năm.",
    img: "/images/25.png",
  },
  {
    icon: "🫙",
    title: "Nhuộm chàm — Màu xanh của đại ngàn",
    desc:
      "Cây chàm được trồng trên rẫy, thu hoạch rồi ủ lên men trong chum nước lớn để tạo thành thuốc nhuộm. Người phụ nữ H'Mông nhúng vải lanh vào chum chàm nhiều lần, phơi khô rồi lại nhúng — lặp đi lặp lại đến khi vải chuyển sang màu xanh đen đặc trưng, bóng mượt và bền màu theo năm tháng. Kỹ thuật nhuộm chàm là bí quyết gia truyền.",
    img: "/images/26.png",
  },
  {
    icon: "🛒",
    title: "Chợ phiên Mèo Vạc — Nơi văn hóa gặp gỡ",
    desc:
      "Phiên chợ Mèo Vạc họp vào mỗi sáng Chủ Nhật là sự kiện văn hóa lớn nhất vùng. Từ tờ mờ sáng, người dân các bản làng đeo gùi đi bộ hàng giờ xuống núi để mua bán, gặp gỡ bạn bè. Sắc màu váy thêu rực rỡ, tiếng khèn, tiếng nói nhiều thứ tiếng, mùi thắng cố nghi ngút, sản phẩm thủ công bày trên mặt đất — đó là phiên chợ không thể lẫn lộn.",
    img: "/images/27.png",
  },
];

// ============================================================
// Lễ hội
// ============================================================
const festivals = [
  {
    name: "Tết Nào Pê Chầu",
    time: "Tháng Chạp âm lịch",
    desc: "Tết cổ truyền của người H'Mông diễn ra trước Tết Nguyên Đán 1 tháng. Đây là thời điểm các gia đình sum vầy, cúng tổ tiên, giã bánh dày và tổ chức hội thi bắn nỏ, đánh cù, ném còn.",
  },
  {
    name: "Hội Gầu Tào",
    time: "Mùng 2–4 Tết Nguyên Đán",
    desc: "Lễ hội xuống núi lớn nhất của người H'Mông, tổ chức để tạ ơn thần linh và cầu mong sức khỏe, mùa màng tươi tốt. Nét đặc sắc là màn biểu diễn khèn bè, múa ô và hát giao duyên.",
  },
  {
    name: "Chợ Tình Khâu Vai",
    time: "27 tháng 3 âm lịch",
    desc: "Phiên chợ tình huyền thoại diễn ra một lần mỗi năm — nơi những đôi lứa không thành duyên gặp lại nhau để tâm tình. Ngày nay, chợ Khâu Vai là sự kiện du lịch văn hóa đặc sắc thu hút hàng nghìn du khách.",
  },
  {
    name: "Lễ Cúng Thần Rừng",
    time: "Đầu tháng 2 âm lịch",
    desc: "Người Lô Lô và một số nhóm H'Mông tổ chức lễ cúng rừng thiêng đầu năm, cầu cho rừng núi bình an, mưa thuận gió hòa. Đây là nghi lễ thể hiện mối quan hệ gắn bó sâu sắc giữa con người và thiên nhiên vùng cao.",
  },
];

export default function VanHoaPage() {
  return (
    <div className="bg-off-white min-h-screen font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen min-h-[560px] flex items-center justify-center text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center hero-kenburns"
          style={{ backgroundImage: "url('/images/19.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/75 via-forest-dark/30 to-forest-dark/90" />
        <div className="relative z-10 px-6 max-w-3xl">
          <p className="text-xs tracking-[0.4em] uppercase mb-4 opacity-80 font-light">Mèo Vạc · Hà Giang</p>
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-xl text-cream">
            Con Người Của Đá
          </h2>
          <p className="text-base md:text-lg font-light tracking-wide opacity-90 leading-relaxed">
            Nơi hơn chục dân tộc anh em cùng viết nên câu chuyện về sức sống, sắc màu và bản lĩnh con người vùng cao.
          </p>
        </div>
      </section>

      {/* Lời giới thiệu */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h3 className="text-3xl font-serif text-forest-green mb-6">Mèo Vạc — Nơi Sắc Tộc Giao Thoa</h3>
        <p className="text-gray-600 font-light leading-relaxed text-lg mb-6">
          Nằm ở cực bắc của Hà Giang, huyện Mèo Vạc là vùng đất biên giới nơi hơn 18 dân tộc anh em cùng sinh sống trên những mỏm đá tai mèo cằn cỗi. Trong điều kiện thiên nhiên khắc nghiệt, người dân nơi đây đã đúc kết một nền văn hóa phi thường — giàu màu sắc, tinh tế trong nghệ thuật và bất khuất trong lao động.
        </p>
        <p className="text-gray-600 font-light leading-relaxed text-lg">
          Mỗi bộ váy thêu, mỗi chum rượu ngô, mỗi tiếng khèn vang lên giữa đại ngàn là một trang sử sống của vùng đất này.
        </p>
        <div className="w-16 h-0.5 bg-forest-medium mx-auto mt-10" />
      </section>

      {/* Các dân tộc */}
      <section className="max-w-7xl mx-auto pb-20 px-6">
        <div className="text-center mb-14">
          <h3 className="text-3xl font-serif text-forest-green mb-3">Những Dân Tộc Làm Nên Mèo Vạc</h3>
          <div className="w-16 h-0.5 bg-forest-medium mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {ethnicGroups.map((group) => (
            <div key={group.name} className="lift bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 group">
              <div className="overflow-hidden aspect-[16/9]">
                <img
                  src={group.img}
                  alt={group.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <h4 className="text-2xl font-serif text-forest-green">{group.name}</h4>
                  <span className={`text-xs font-bold tracking-widest px-3 py-1 rounded-full ${group.color}`}>
                    {group.pct}
                  </span>
                </div>
                <p className="text-gray-600 font-light leading-relaxed">{group.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Con người & Lao động */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-forest-medium text-xs font-bold tracking-widest uppercase block mb-3">Di sản phi vật thể</span>
            <h3 className="text-3xl font-serif text-forest-green mb-3">Nghề Truyền Thống & Lao Động</h3>
            <div className="w-16 h-0.5 bg-forest-medium mx-auto" />
          </div>

          <div className="space-y-20">
            {crafts.map((craft, i) => (
              <div
                key={craft.title}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
              >
                <div className="w-full md:w-1/2 overflow-hidden rounded-2xl aspect-[4/3] shadow-lg">
                  <img
                    src={craft.img}
                    alt={craft.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <span className="text-3xl mb-4 block">{craft.icon}</span>
                  <h4 className="text-2xl font-serif text-forest-green mb-4">{craft.title}</h4>
                  <p className="text-gray-600 font-light leading-relaxed">{craft.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lễ hội */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <div className="text-center mb-14">
          <span className="text-forest-medium text-xs font-bold tracking-widest uppercase block mb-3">Nhịp sống văn hóa</span>
          <h3 className="text-3xl font-serif text-forest-green mb-3">Lễ Hội & Nghi Lễ</h3>
          <div className="w-16 h-0.5 bg-forest-medium mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {festivals.map((fest) => (
            <div key={fest.name} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-xl font-serif text-forest-green">{fest.name}</h4>
                <span className="text-forest-medium text-xs font-bold tracking-wide bg-amber-50 px-3 py-1.5 rounded-full shrink-0 ml-4 text-center leading-tight">
                  {fest.time}
                </span>
              </div>
              <p className="text-gray-600 font-light leading-relaxed">{fest.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-green text-white py-16 text-center px-6">
        <h3 className="text-2xl font-serif mb-4">Trải nghiệm văn hóa tại TÂM BẢN</h3>
        <p className="font-light opacity-90 max-w-2xl mx-auto mb-8 leading-relaxed">
          Chúng tôi có thể sắp xếp cho bạn những buổi tham quan bản làng, tham dự phiên chợ phiên và giao lưu văn nghệ cùng bà con dân tộc ngay trong chuyến lưu trú.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/#dat-phong" className="inline-block bg-white text-forest-green px-8 py-3 font-bold text-sm tracking-widest hover:bg-off-white transition-all duration-300 rounded-sm">
            ĐẶT PHÒNG NGAY
          </a>
          <a href="/dia-hinh-thoi-tiet" className="inline-block border border-white text-white px-8 py-3 font-bold text-sm tracking-widest hover:bg-white/10 transition-all duration-300 rounded-sm">
            ĐỊA HÌNH & THỜI TIẾT →
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
