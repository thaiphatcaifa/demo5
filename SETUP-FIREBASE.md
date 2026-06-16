# BUỔI 5 — Thiết lập Firebase & Deploy (Tâm Bản Homestay)

> Bản copy này đã **gỡ sạch cấu hình Firebase cũ**. File `src/lib/firebase.js`
> đang để TRỐNG (toàn chữ `DÁN_..._CỦA_BẠN`). Mỗi thầy/cô tự tạo một dự án
> Firebase **riêng**, đặt luật bảo mật, rồi dán cấu hình vào — làm theo các bước dưới.
>
> ⚠️ **Lưu ý quan trọng — project này KHÁC demo của giáo án.**
> App Tâm Bản đầy đủ **không dùng `destinations`** và **không có `data.js`**.
> Nội dung các trang (Văn hóa, Ẩm thực, Địa hình, Bungalow) viết cứng trong từng
> file trang. Dữ liệu sống qua Firebase chỉ gồm **2 kho (collection)**:
>
> - `bookings` — khách đặt phòng (Trang chủ GHI vào, khu Admin ĐỌC ra)
> - `posts` — bài Nhật Ký / blog (Admin TẠO/SỬA/XÓA, trang công khai ĐỌC)
>
> Hai kho này **tự sinh ra** khi có dữ liệu đầu tiên — không cần tạo tay.

---

## BƯỚC 0 — Cài thư viện & chạy thử (1 lần đầu)

Mở terminal ngay trong thư mục `TamBan-Homestay` này:

```bash
npm install        # tải toàn bộ thư viện (có sẵn cả "firebase")
npm run dev        # chạy web ở máy: mở http://localhost:5173
```

Web mở được nhưng **chưa có dữ liệu sống** — đặt phòng / nhật ký sẽ báo lỗi đỏ ở
Console vì `firebase.js` còn trống. Bình thường, sửa ở Bước 1–5.

> Đăng nhập khu Admin (demo): `admin` / `123456`. Đây chỉ là mật khẩu tập luyện
> (lưu ở localStorage, KHÔNG phải Firebase Auth) — đổi sau khi dùng thật.

---

## BƯỚC 1 — Tạo dự án Firebase

1. Vào **https://console.firebase.google.com** → đăng nhập bằng Gmail.
2. Bấm **Add project / Tạo dự án** → đặt tên (vd `tamban-cua-toi`) → Continue.
3. Google Analytics: **tắt** cho đơn giản (đỡ phải tạo thêm tài khoản Analytics,
   không cần cho dự án này) → **Create project** → đợi ~30 giây.

## BƯỚC 2 — Bật Firestore Database (chế độ production)

1. Menu trái → **Build → Firestore Database** → **Create database**.
2. Chọn **Start in production mode** (khóa mặc định — an toàn, ta tự mở đúng quyền ở Bước 3).
3. Location gần: `asia-southeast1` → **Enable**.

> *Vì sao production, không phải test mode:* test mode mở cho ai cũng đọc/ghi mọi
> kho trong 30 ngày — tiện nhưng là lỗ hổng. Production khóa hết rồi ta mở đúng
> chỗ cần, đây mới là cách làm thật.

## BƯỚC 3 — Đặt Security Rules cho `bookings` và `posts`

Console → **Firestore → tab Rules** → xóa nội dung cũ, dán khối dưới → **Publish**.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Đặt phòng: khách GỬI được (create) và Admin ĐỌC được (read);
    // chặn sửa/xóa từ bên ngoài
    match /bookings/{id} {
      allow read, create: if true;
      allow update, delete: if false;
    }

    // Nhật ký: ai cũng ĐỌC; cho GHI ở mức lớp học
    match /posts/{id} {
      allow read: if true;
      allow write: if true;   // An toàn THẬT: if request.auth != null (Firebase Auth)
    }

    // Mọi kho khác: chặn hết
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

> App này đăng nhập Admin bằng localStorage (không phải Firebase Auth), nên luật
> chưa thể phân biệt admin thật. Vì vậy `posts` tạm để `allow write: if true`.
> Bước nâng cao (Buổi 6 / sau): bật **Firebase Auth** rồi đổi thành
> `allow write: if request.auth != null` để chỉ người đăng nhập mới ghi được.

> Muốn nhanh: dùng **vibe code** — đưa `npx repomix` cho Gemini kèm Prompt D4
> ("viết Security Rules production: bookings cho gửi+đọc, posts cho đọc+ghi mức
> lớp học, còn lại chặn hết"), Gemini trả về full nội dung để dán vào tab Rules.

## BƯỚC 4 — Lấy cấu hình (config) của dự án

1. Bấm **⚙️ Project settings** (góc trên menu trái).
2. Kéo xuống **Your apps** → bấm icon **Web `</>`**.
3. Đặt nickname (vd `web`) → **Register app** (KHÔNG cần bật Hosting).
4. Firebase hiện khối `const firebaseConfig = { ... }` — **đây là thứ cần copy.**

## BƯỚC 5 — Dán config vào `src/lib/firebase.js`

Mở `src/lib/firebase.js`, thay nguyên khối `firebaseConfig` đang trống bằng khối
Firebase vừa cấp:

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

Lưu lại. Nếu `npm run dev` còn chạy, web tự nạp lại.

## BƯỚC 6 — Kiểm tra dữ liệu sống

1. Ra **Trang chủ** → điền form **đặt phòng** → gửi.
2. Console → Firestore → kho **`bookings`** tự xuất hiện với bản ghi vừa gửi.
   Vào khu Admin (`admin`/`123456`) sẽ thấy đơn đó.
3. **Admin → Nhật Ký → Tạo mới** → đăng 1 bài → kho **`posts`** xuất hiện,
   trang Nhật Ký công khai hiển thị bài.

Thấy được = Firebase đã kết nối thành công. 🎉

> Nếu đặt phòng / đăng bài báo lỗi **"Missing or insufficient permissions"** →
> Rules ở Bước 3 chưa Publish hoặc sai tên kho. Kiểm tra lại tab Rules.

---

## BƯỚC 7 — Build & Deploy lên Netlify

```bash
npm run build      # đóng gói → tạo thư mục dist/
```

### Cách nhanh — Netlify Drop
1. Vào **https://app.netlify.com/drop**
2. Kéo nguyên thư mục **`dist/`** thả vào → nhận URL `....netlify.app`.
3. Mở URL trên điện thoại để thấy web thật.

### Cách chuyên nghiệp — GitHub (CI/CD): **GitHub trước, Netlify sau**
1. Kiểm tra `.gitignore` đã loại `node_modules/`, `dist/`, `repomix-output.*`, `.env*`.
2. Đưa code lên GitHub (GitHub Desktop hoặc lệnh):
   ```bash
   git init
   git branch -M main
   git add .
   git status                 # KHÔNG được thấy node_modules / dist
   git commit -m "Ban dau"
   git remote add origin https://github.com/<tai-khoan>/<ten-repo>.git
   git push -u origin main
   ```
3. Netlify → **Add new site → Import from GitHub** → chọn repo. Build command
   `npm run build`, publish `dist` (đã có sẵn trong `netlify.toml`) → Deploy.
4. Từ nay mỗi lần `git push`, Netlify **tự build & cập nhật**. Kèm HTTPS + CDN miễn phí.

> Lỗi 404 khi F5 ở trang con đã được xử lý sẵn bằng `public/_redirects` +
> `netlify.toml`. Không cần làm gì thêm.

---

## Tóm tắt 1 dòng
`npm install` → tạo Firebase + Firestore (**production mode**) → **đặt Rules cho
`bookings`/`posts`** → dán config vào `firebase.js` → thử đặt phòng/đăng bài →
`npm run build` → deploy Netlify (Drop hoặc GitHub CI/CD).
