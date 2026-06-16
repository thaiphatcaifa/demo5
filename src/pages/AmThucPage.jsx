import React from 'react';
import Navbar from '../components/Navbar';

export default function AmThucPage() {
  return (
    <div className="bg-off-white min-h-screen font-sans">
      <Navbar />

      {/* Banner Tiêu đề Trang */}
      <section className="relative min-h-[66vh] flex items-center justify-center bg-forest-dark text-white text-center overflow-hidden">
         <div className="absolute inset-0 bg-cover bg-center hero-kenburns opacity-55" style={{ backgroundImage: "url('/images/35.png')" }}></div>
         <div className="relative z-10 px-4">
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-xl text-cream">Vị Của Đá & Lửa</h2>
            <p className="font-light tracking-widest uppercase text-sm md:text-base opacity-90">Hành trình khám phá di sản ẩm thực người H'Mông</p>
         </div>
      </section>

      {/* Lời tựa văn hóa */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h3 className="text-3xl font-serif text-forest-green mb-6">Nơi đất cằn nở hoa</h3>
        <p className="text-gray-600 font-light leading-relaxed text-lg">
          Sống trên những mỏm đá tai mèo cằn cỗi quanh năm sương mù bao phủ, người H'Mông đã đúc kết ra một nền ẩm thực vô cùng đặc biệt. Không cầu kỳ gia vị, không hoa mỹ trong cách bày biện, ẩm thực nơi đây chinh phục người lữ khách bằng chính sự mộc mạc, hoang dã và vị ngọt nguyên bản từ núi rừng.
        </p>
        <div className="w-16 h-0.5 bg-forest-medium mx-auto mt-10"></div>
      </section>

      {/* Các Đặc Sản H'Mông (Storytelling) */}
      <section className="max-w-6xl mx-auto pb-24 px-6 space-y-20">
        
        {/* Đặc sản 1: Mèn Mén */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 overflow-hidden rounded-xl aspect-[4/3] shadow-md">
            <img src="/images/36.png" alt="Ngô và Mèn Mén" className="w-full h-full object-cover hover:scale-105 transition duration-700"/>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-forest-medium text-sm font-bold tracking-widest uppercase mb-2 block">Linh hồn của đá</span>
            <h4 className="text-3xl font-serif text-forest-green mb-4">Mèn Mén & Canh Tẩu Chúa</h4>
            <p className="text-gray-600 font-light mb-6 leading-relaxed">
              Nếu người Kinh coi cơm gạo là chính, thì với người H'Mông, hạt ngô mới là nguồn sống. Ngô tẻ được phơi khô, tẽ hạt, dùng cối đá xay thủ công nhiều lần rồi đem đồ (hấp) chín trên chảo gang. Mèn mén có vị ngọt bùi, hơi khô nên luôn được ăn kèm với bát canh "tẩu chúa" (canh rau cải đắng nấu nhạt) để làm dịu đi cái khô ráp, tạo nên một sự cân bằng tuyệt hảo.
            </p>
          </div>
        </div>

        {/* Đặc sản 2: Thắng Cố */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="w-full md:w-1/2 overflow-hidden rounded-xl aspect-[4/3] shadow-md">
            <img src="/images/37.png" alt="Nồi Thắng Cố" className="w-full h-full object-cover hover:scale-105 transition duration-700"/>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-forest-medium text-sm font-bold tracking-widest uppercase mb-2 block">Hương vị của chợ phiên</span>
            <h4 className="text-3xl font-serif text-forest-green mb-4">Chảo Thắng Cố Ngựa</h4>
            <p className="text-gray-600 font-light mb-6 leading-relaxed">
              Sẽ là một thiếu sót lớn nếu đến vùng cao mà chưa nếm thử Thắng Cố. Khởi nguyên là món ăn làm từ thịt và lục phủ ngũ tạng của ngựa, đun sôi sùng sục trong chảo gang khổng lồ cùng hơn 12 loại gia vị thảo mộc bản địa. Múc một bát Thắng Cố nóng hổi giữa chợ phiên lộng gió, thêm chút tương ớt Mường Khương, bạn sẽ hiểu thế nào là cái thú của đàn ông bản cao.
            </p>
          </div>
        </div>

        {/* Đặc sản 3: Gà Đen & Thịt Treo */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 overflow-hidden rounded-xl aspect-[4/3] shadow-md">
            <img src="/images/38.png" alt="Gà đen và thịt hun khói" className="w-full h-full object-cover hover:scale-105 transition duration-700"/>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-forest-medium text-sm font-bold tracking-widest uppercase mb-2 block">Thức quà thết đãi khách quý</span>
            <h4 className="text-3xl font-serif text-forest-green mb-4">Gà Đen & Lợn Treo Gác Bếp</h4>
            <p className="text-gray-600 font-light mb-6 leading-relaxed">
              Giống gà đen H'Mông được chăn thả tự nhiên, thịt vô cùng săn chắc, hầm cùng thuốc bắc tạo ra thứ nước dùng thanh ngọt. Bên cạnh đó, những dải thịt lợn bản ướp mắc khén, hạt dổi treo lơ lửng trên gác bếp hong khói củi ròng rã nhiều tháng trời là món mồi nhậu "tốn rượu" nhất mỗi khi có khách đến thăm nhà.
            </p>
          </div>
        </div>

        {/* Đặc sản 4: Bánh Tam Giác Mạch */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="w-full md:w-1/2 overflow-hidden rounded-xl aspect-[4/3] shadow-md">
            <img src="/images/39.png" alt="Bánh Tam Giác Mạch" className="w-full h-full object-cover hover:scale-105 transition duration-700"/>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-forest-medium text-sm font-bold tracking-widest uppercase mb-2 block">Kết tinh của hoa đá</span>
            <h4 className="text-3xl font-serif text-forest-green mb-4">Bánh Tam Giác Mạch</h4>
            <p className="text-gray-600 font-light mb-6 leading-relaxed">
              Sau những vụ mùa hoa nở rực rỡ, hạt tam giác mạch được thu hoạch, xay nhuyễn mịn để làm bánh. Chiếc bánh được nhào nặn thủ công, nướng chín trên bếp than hồng mang màu tím nhạt đặc trưng. Vị bánh bùi bùi, xốp nhẹ, thoang thoảng mùi ngai ngái của cỏ dại, ăn một miếng là thấy cả mùa thu cao nguyên.
            </p>
          </div>
        </div>

        {/* Đặc sản 5: Bánh Dày Giã Tay (Thêm mới cho Lễ Hội) */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 overflow-hidden rounded-xl aspect-[4/3] shadow-md">
            <img src="/images/40.png" alt="Bánh Dày Giã Tay" className="w-full h-full object-cover hover:scale-105 transition duration-700"/>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-forest-medium text-sm font-bold tracking-widest uppercase mb-2 block">Linh vật của Lễ Tết</span>
            <h4 className="text-3xl font-serif text-forest-green mb-4">Bánh Dày Giã Tay (Pé Plẩu)</h4>
            <p className="text-gray-600 font-light mb-6 leading-relaxed">
              Nếu người Kinh có bánh chưng, thì linh hồn trong mâm cỗ Tết Nào Pê Chầu và lễ hội Gầu Tào của người H'Mông chính là chiếc bánh dày. Gạo nếp nương thơm lừng được đồ chín, những thanh niên trai tráng khỏe mạnh nhất bản sẽ dùng chày gỗ giã liên tục lúc xôi còn bốc khói. Chiếc bánh tròn trịa tượng trưng cho mặt trời, mặt trăng và ước vọng về một năm no ấm.
            </p>
          </div>
        </div>

        {/* Đặc sản 6: Rượu Ngô */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="w-full md:w-1/2 overflow-hidden rounded-xl aspect-[4/3] shadow-md">
            <img src="/images/41.png" alt="Rượu Ngô Men Lá" className="w-full h-full object-cover hover:scale-105 transition duration-700"/>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-forest-medium text-sm font-bold tracking-widest uppercase mb-2 block">Men say đại ngàn</span>
            <h4 className="text-3xl font-serif text-forest-green mb-4">Rượu Ngô Men Lá</h4>
            <p className="text-gray-600 font-light mb-6 leading-relaxed">
              Rượu được ủ từ thứ ngô tẻ hạt dẻo trồng trên núi đá, lên men bằng hơn 20 loại lá rừng bí truyền. Thứ chất lỏng trong vắt này có vị cay nồng nhưng hậu ngọt, uống bao nhiêu cũng chỉ lâng lâng chứ không hề nhức đầu. Nâng bát rượu ngô, hát điệu khèn bè, đó chính là bản sắc rực rỡ nhất của vùng cao.
            </p>
          </div>
        </div>

        {/* Đặc sản 7: Trà Shan Tuyết */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 overflow-hidden rounded-xl aspect-[4/3] shadow-md">
            <img src="/images/42.png" alt="Trà Shan Tuyết" className="w-full h-full object-cover hover:scale-105 transition duration-700"/>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-forest-medium text-sm font-bold tracking-widest uppercase mb-2 block">Sự tĩnh lặng của sương mai</span>
            <h4 className="text-3xl font-serif text-forest-green mb-4">Trà Cổ Thụ Shan Tuyết</h4>
            <p className="text-gray-600 font-light mb-6 leading-relaxed">
              Khác với sự nồng nhiệt của rượu ngô, Trà cổ thụ Shan Tuyết là thức uống của những sớm mai tĩnh lặng. Từng búp trà ngậm sương được hái từ những gốc cây rêu phong hàng trăm năm tuổi vươn mình giữa đỉnh mây mù. Trà pha ra có nước màu vàng óng, đọng lại vị ngọt thanh sâu lắng, mang đến sự thư thái tuyệt đối cho tâm hồn lữ khách.
            </p>
          </div>
        </div>

      </section>

      {/* Lời mời mọc khéo léo */}
      <section className="bg-forest-green text-white py-16 text-center px-6">
         <h3 className="text-2xl font-serif mb-4">Thưởng thức tại TÂM BẢN</h3>
         <p className="font-light opacity-90 max-w-2xl mx-auto mb-8">
           Khi đặt phòng tại TÂM BẢN, bạn có thể yêu cầu chúng tôi chuẩn bị trước những mâm cơm mang đậm dấu ấn văn hóa này để trải nghiệm trọn vẹn hương vị vùng cao.
         </p>
         <a href="/" className="inline-block bg-white text-forest-green px-8 py-3 font-bold text-sm tracking-widest hover:bg-off-white transition-all duration-300 rounded-sm">
           VỀ TRANG CHỦ ĐẶT PHÒNG
         </a>
      </section>
    </div>
  );
}