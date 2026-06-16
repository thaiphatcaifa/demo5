import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ====================================================================
//  HƯỚNG DẪN THIẾT LẬP CẤU HÌNH FIREBASE CỦA RIÊNG BẠN
// --------------------------------------------------------------------
//  Hãy thay thế toàn bộ các chuỗi giữ chỗ "DÁN_..." bằng các giá trị 
//  thực tế được cấp từ Firebase Console của bạn.
//
//  Cách lấy cấu hình:
//  1. Vào Firebase Console (https://console.firebase.google.com).
//  2. Bấm vào biểu tượng Bánh răng (⚙️ Settings) -> Project settings.
//  3. Cuộn xuống phần "Your apps" -> Chọn ứng dụng Web (biểu tượng </>)
//  4. Copy các chuỗi giá trị tương ứng trong khối `firebaseConfig`.
// ====================================================================
const firebaseConfig = {
  apiKey: "AIzaSyBZv67MmWMHSardast27MWV7p5GJkB9PiI",
  authDomain: "meovacweb.firebaseapp.com",
  projectId: "meovacweb",
  storageBucket: "meovacweb.firebasestorage.app",
  messagingSenderId: "286774009484",
  appId: "1:286774009484:web:4fb6f6ce054f9c3b93e5a9"
};

// Khởi tạo ứng dụng Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo và xuất thực thể Firestore Database với tên 'db'
export const db = getFirestore(app);