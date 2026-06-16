# BUỔI 5 — Thiết lập Firebase & Deploy (Tâm Bản Homestay)

> Bản copy này đã **gỡ sạch cấu hình Firebase cũ**. File `src/lib/firebase.js`
> hiện đang để TRỐNG (toàn chữ `DÁN_..._CỦA_BẠN`). Mỗi thầy/cô sẽ tự tạo một
> dự án Firebase **riêng của mình** rồi dán cấu hình vào — làm theo các bước dưới.
>
> App này dùng **2 kho dữ liệu (collection)** trên Firestore:
> - `bookings` — khách đặt phòng (Trang chủ GHI vào, khu Admin ĐỌC ra)
> - `posts` — bài Nhật Ký / blog (Admin TẠO, trang công khai ĐỌC)
>
> Hai kho này **tự sinh ra** khi có dữ liệu đầu tiên — không cần tạo tay.

---

## BƯỚC 0 — Cài thư viện & chạy thử (1 lần đầu)

Mở terminal ngay trong thư mục `TamBan-Homestay` này:

```bash
npm install        # tải toàn bộ thư viện (có sẵn cả "firebase")
npm run dev        # chạy web ở máy: mở http://localhost:5173
```

Lúc này web mở được nhưng **chưa có dữ liệu sống** — đặt phòng / nhật ký sẽ báo
lỗi đỏ ở Console vì `firebase.js` còn trống. Đó là điều bình thường, ta sửa ở Bước 1–3.

> Đăng nhập khu Admin (demo): `admin` / `123456`. Đây chỉ là mật khẩu tập luyện,
> không liên quan Firebase — đổi sau khi deploy thật.

---

## BƯỚC 1 — Tạo dự án Firebase

1. Vào **https://console.firebase.google.com** → đăng nhập bằng Gmail.
2. Bấm **Add project / Tạo dự án** → đặt tên (vd `tamban-cua-toi`) → Continue.
3. Phần Google Analytics: bấm tắt cho đơn giản → **Create project** → đợi ~30 giây.

## BƯỚC 2 — Bật Firestore Database (kho dữ liệu)

1. Menu trái → **Build → Firestore Database** → **Create database**.
2. Chọn **Start in test mode** (cho phép đọc/ghi tự do để học — sẽ siết lại sau).
3. Chọn location gần (vd `asia-southeast1`) → **Enable**.

> *Test mode là gì:* tạm mở cửa kho cho ai cũng đọc/ghi trong ~30 ngày, đủ để
> học và demo. Khi lên thật sẽ đặt luật bảo mật chặt hơn (Buổi 6 / nâng cao).

## BƯỚC 3 — Lấy cấu hình (config) của dự án

1. Bấm **⚙️ (Project settings)** ở góc trên menu trái.
2. Kéo xuống mục **Your apps** → bấm icon **Web `</>`**.
3. Đặt nickname (vd `web`) → **Register app** (KHÔNG cần bật Hosting).
4. Firebase hiện ra một khối `const firebaseConfig = { ... }` — **đây là thứ cần copy.**

## BƯỚC 4 — Dán config vào `src/lib/firebase.js`

Mở file `src/lib/firebase.js`. Thay nguyên khối `firebaseConfig` đang để trống
bằng khối Firebase vừa cấp cho bạn. Kết quả trông như:

```js
const firebaseConfig = {
  apiKey: "AIzaSy....(của bạn)",
  authDomain: "tamban-cua-toi.firebaseapp.com",
  projectId: "tamban-cua-toi",
  storageBucket: "tamban-cua-toi.firebasestorage.app",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef...."
};
```

Lưu lại. Nếu `npm run dev` còn đang chạy, web tự nạp lại.

## BƯỚC 5 — Kiểm tra dữ liệu sống đã chạy

1. Ra **Trang chủ** → điền form **đặt phòng** → gửi.
2. Quay lại Firebase Console → Firestore → bạn sẽ thấy kho **`bookings`** tự xuất hiện
   với 1 bản ghi vừa gửi. → Vào khu Admin (`admin`/`123456`) sẽ thấy đơn đó.
3. Vào **Admin → Nhật Ký → Tạo mới** → đăng 1 bài → kho **`posts`** xuất hiện,
   trang Nhật Ký công khai hiển thị bài.

Thấy được = Firebase đã kết nối thành công. 🎉

---

## BƯỚC 6 — Build & Deploy lên Netlify (đưa web lên Internet)

**Build** = đóng gói bản tối ưu cho người dùng:

```bash
npm run build      # tạo ra thư mục dist/
```

### Cách nhanh — Netlify Drop (cho người mới)
1. Vào **https://app.netlify.com/drop**
2. Kéo nguyên thư mục **`dist/`** thả vào → nhận ngay URL `....netlify.app`.
3. Mở URL đó trên điện thoại để thấy web thật chạy online.

### Cách chuyên nghiệp — nối GitHub (CI/CD)
1. Đẩy thư mục dự án này lên một repo GitHub.
2. Netlify → **Add new site → Import from GitHub** → chọn repo.
3. Build command `npm run build`, publish directory `dist` (đã có sẵn trong
   file `netlify.toml`). Bấm Deploy.
4. Từ nay mỗi lần `git push`, Netlify **tự build & cập nhật** web — đó là **CI/CD**.
   Netlify cũng tự cấp **HTTPS** (ổ khóa bảo mật) và phân phối qua **CDN** (tải nhanh).

---

## Tóm tắt 1 dòng
`npm install` → tạo Firebase + Firestore (test mode) → dán config vào `firebase.js`
→ thử đặt phòng/đăng bài → `npm run build` → kéo `dist/` lên Netlify.
