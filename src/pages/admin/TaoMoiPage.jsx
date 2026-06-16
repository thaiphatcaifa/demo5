import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import TiptapEditor from '../../components/TiptapEditor';

const TAGS = ['Chuyện Của Mùa', 'Góc Lữ Khách', 'Văn Hóa Bản Địa', 'Con Người', 'Hậu Trường'];

function Toast({ message, type, onClose }) {
  React.useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 ${type === 'error' ? 'bg-red-600' : 'bg-green-600'} text-white px-5 py-3.5 rounded-xl shadow-xl text-sm font-medium`}>
      {type === 'error'
        ? <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
        : <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
      }
      {message}
    </div>
  );
}

export default function TaoMoiPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState(TAGS[0]);
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [toast, setToast] = useState(null);
  const [titleError, setTitleError] = useState('');
  const [hasDraft, setHasDraft] = useState(() => !!localStorage.getItem('draft_new'));

  // Auto-save draft every 30s
  React.useEffect(() => {
    const save = () => {
      if (!title && !content) return;
      localStorage.setItem('draft_new', JSON.stringify({ title, tag, imageUrl, content }));
      setHasDraft(true);
    };
    const t = setInterval(save, 30000);
    return () => clearInterval(t);
  }, [title, tag, imageUrl, content]);

  // Restore draft on mount
  React.useEffect(() => {
    const draft = localStorage.getItem('draft_new');
    if (draft) {
      try {
        const d = JSON.parse(draft);
        if (d.title) setTitle(d.title);
        if (d.tag) setTag(d.tag);
        if (d.imageUrl) setImageUrl(d.imageUrl);
        if (d.content) setContent(d.content);
      } catch (_) {}
    }
  }, []);

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title.trim()) { setTitleError('Vui lòng nhập tiêu đề bài viết.'); return; }
    setIsPublishing(true);
    setTitleError('');
    try {
      await addDoc(collection(db, 'posts'), {
        title: title.trim(), tag, imageUrl, content,
        author: 'Admin',
        date: new Date().toLocaleDateString('vi-VN'),
        createdAt: Date.now(),
      });
      localStorage.removeItem('draft_new');
      setHasDraft(false);
      setToast({ message: 'Xuất bản thành công! Đang quay lại...', type: 'success' });
      setTimeout(() => navigate('/admin/nhat-ky'), 1500);
    } catch (err) {
      console.error('Lỗi khi đăng bài:', err);
      setToast({ message: 'Có lỗi xảy ra. Vui lòng kiểm tra kết nối mạng.', type: 'error' });
      setIsPublishing(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin/nhat-ky')}
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-forest-green hover:shadow-md transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Chắp bút câu chuyện mới</h1>
              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5">
              Nhật ký TÂM BẢN Homestay
              {hasDraft && <span className="text-amber-500 text-[10px] font-bold bg-amber-50 px-1.5 py-0.5 rounded">● Bản nháp</span>}
            </p>
            </div>
          </div>
          <button onClick={handlePublish} disabled={isPublishing}
            className="inline-flex items-center gap-2 bg-forest-green text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1E5225] disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-lg shadow-forest-dark/20">
            {isPublishing ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Đang lưu...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
                Xuất bản
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 space-y-8">
            <div>
              <input type="text" placeholder="Tiêu đề bài viết..." value={title}
                onChange={e => { setTitle(e.target.value); setTitleError(''); }}
                className="w-full text-3xl md:text-4xl font-serif text-forest-green font-bold placeholder-gray-200 border-none focus:ring-0 px-0 bg-transparent outline-none"
              />
              {titleError && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                  {titleError}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-8">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Chủ đề câu chuyện</label>
                <select value={tag} onChange={e => setTag(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-all text-gray-700">
                  {TAGS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Đường dẫn ảnh bìa (URL)</label>
                <input type="url" placeholder="https://images.unsplash.com/..." value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-all text-gray-700"
                />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Nội dung chi tiết</label>
              <TiptapEditor content={content} onChange={setContent} />
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </>
  );
}
