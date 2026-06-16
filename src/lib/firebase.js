import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// =============================================================
//  BUỔI 5 — DÁN CẤU HÌNH FIREBASE CỦA RIÊNG BẠN VÀO ĐÂY
// -------------------------------------------------------------
//  Đây là phần TRỐNG. Mỗi thầy/cô sẽ tự tạo một dự án Firebase
//  riêng (xem file SETUP-FIREBASE.md), rồi COPY khối "firebaseConfig"
//  mà Firebase cấp cho mình và DÁN ĐÈ vào khối bên dưới.
//
//  Lấy ở đâu: Firebase Console -> ⚙️ Project settings -> mục
//  "Your apps" -> chọn app Web (</>) -> copy đoạn const firebaseConfig.
// =============================================================
const firebaseConfig = {
  apiKey: "DÁN_API_KEY_CỦA_BẠN",
  authDomain: "DÁN_AUTH_DOMAIN_CỦA_BẠN",
  projectId: "DÁN_PROJECT_ID_CỦA_BẠN",
  storageBucket: "DÁN_STORAGE_BUCKET_CỦA_BẠN",
  messagingSenderId: "DÁN_SENDER_ID_CỦA_BẠN",
  appId: "DÁN_APP_ID_CỦA_BẠN"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo và xuất Database (BẮT BUỘC PHẢI CÓ DÒNG NÀY)
export const db = getFirestore(app);
