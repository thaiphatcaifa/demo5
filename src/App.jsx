import React from 'react';
import { Routes, Route } from 'react-router-dom';

// ── Trang công khai ───────────────────────────────────────
import HomePage       from './pages/HomePage';
import VanHoaPage     from './pages/VanHoaPage';
import AmThucPage     from './pages/AmThucPage';
import DiaHinhPage    from './pages/DiaHinhPage';
import NhatKyPage     from './pages/NhatKyPage';
import PostDetailPage from './pages/PostDetailPage';
import BungalowPage   from './pages/BungalowPage';

// ── Trang quản trị ────────────────────────────────────────
import AdminLayout      from './pages/admin/AdminLayout';
import AdminDashboard   from './pages/admin/AdminDashboard';
import AdminLoginPage   from './pages/admin/AdminLoginPage';
import NhatKyListPage   from './pages/admin/NhatKyListPage';
import TaoMoiPage       from './pages/admin/TaoMoiPage';
import SuaPage          from './pages/admin/SuaPage';
import DatPhongPage     from './pages/admin/DatPhongPage';

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"                    element={<HomePage />} />
      <Route path="/van-hoa"             element={<VanHoaPage />} />
      <Route path="/am-thuc"             element={<AmThucPage />} />
      <Route path="/dia-hinh-thoi-tiet"  element={<DiaHinhPage />} />
      <Route path="/nhat-ky"             element={<NhatKyPage />} />
      <Route path="/nhat-ky/:id"         element={<PostDetailPage />} />
      <Route path="/bungalow"            element={<BungalowPage />} />

      {/* Admin — bọc trong AdminLayout (có sidebar + auth guard) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index                       element={<AdminDashboard />} />
        <Route path="login"                element={<AdminLoginPage />} />
        <Route path="nhat-ky"              element={<NhatKyListPage />} />
        <Route path="nhat-ky/tao-moi"     element={<TaoMoiPage />} />
        <Route path="nhat-ky/sua/:id"     element={<SuaPage />} />
        <Route path="dat-phong"             element={<DatPhongPage />} />
      </Route>
    </Routes>
  );
}
