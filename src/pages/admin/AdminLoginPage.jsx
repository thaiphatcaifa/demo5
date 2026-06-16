import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Vui lòng điền đầy đủ tài khoản và mật khẩu.');
      return;
    }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600));
    if (username === 'admin' && password === '123456') {
      localStorage.setItem('userRole', 'super_admin');
      navigate('/admin');
    } else if (username === 'staff' && password === '123456') {
      localStorage.setItem('userRole', 'staff');
      navigate('/admin');
    } else {
      setError('Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-forest-light flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden">
          <div className="bg-forest-green px-10 pt-10 pb-8 text-center">
            <h1 className="text-3xl font-serif font-bold text-white tracking-widest">TÂM BẢN</h1>
            <p className="text-white/60 text-xs mt-2 uppercase tracking-widest">Hệ thống quản trị nội bộ</p>
          </div>
          <div className="px-10 py-8">
            <form onSubmit={handleLogin} className="space-y-5" noValidate>
              {error && (
                <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl" role="alert">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  {error}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tài khoản</label>
                <input
                  type="text"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={e => { setUsername(e.target.value); setError(''); }}
                  placeholder="Nhập tên đăng nhập..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green/25 focus:border-forest-green transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mật khẩu</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green/25 focus:border-forest-green transition-all pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPw ? 'An mat khau' : 'Hien mat khau'}
                  >
                    {showPw
                      ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                      : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    }
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-forest-green text-white py-3.5 rounded-xl font-bold text-sm tracking-widest hover:bg-[#1E5225] disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-200 shadow-lg shadow-forest-dark/20 mt-2"
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Dang xac thuc...
                  </>
                ) : 'DANG NHAP'}
              </button>
            </form>
            <p className="text-center text-gray-400 text-xs mt-7 italic">
              Chi danh cho nhan vien TAM BAN Homestay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
