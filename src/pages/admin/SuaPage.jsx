import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import TiptapEditor from '../../components/TiptapEditor';

const TAGS = ['Chuyện Của Mùa', 'Góc Lữ Khách', 'Văn Hóa Bản Địa', 'Con Người', 'Hậu Trường'];

function Toast({ message, type, onClose }) {
  useEffect(() => {
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

export default function SuaPage() {
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [tag, setTag] = useState(TAGS[0]);
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [toast, setToast] = useState(null);
  const [titleError, setTitleError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'posts', postId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const d = snap.data();
          setTitle(d.title || '');
          setTag(d.tag || TAGS[0]);
          setImageUrl(d.imageUrl || '');
          setContent(d.content || '');
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Lỗi tải dữ liệu:', err);
        setToast({ message: 'Không thể tải bài viết. Vui lòng thử lại.', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError('Vui lòng nhập tiêu đề bài viết.');
      return;
    }
    setIsUpdating(true);
    setTitleError('');
    try {
      await updateDoc(doc(db, 'posts', postId), {
        title: title.trim(),
        tag,
        imageUrl,
        content,
      });
      setToast({ message: 'Cập nhật thành công! Đang quay lại...', type: 'success' });
      setTimeout(() => navigate('/admin/nhat-ky'), 1500);
    } catch (err) {
      console.error('Lỗi khi cập nhật:', err);
      setToast({ message: 'Có lỗi xảy ra. Vui lòng thử lại.', type: 'error' });
      setIsUpdating(false);
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 bg-gray-200 rounded animate-pulse w-48" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-6">
          <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
            <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
          </div>
          <div className="h-64 bg-gray-100 rounded-xl animate-pulse pt-6 border-t border-gray-100" />
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h2 className="text-lg font-bold text-gray-700">Không tìm thấy bài viết</h2>
        <p className="text-gray-400 text-sm mt-2">Bài viết này có thể đã bị xóa hoặc không tồn tại.</p>
        <button
          onClick={() => navigate('/admin/nhat-ky')}
          className="mt-6 inline-flex items-center gap-2 bg-forest-green text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1E5225] transition-all"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/nhat-ky')}
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-forest-green hover:shadow-md transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Chỉnh sửa câu chuyện</h1>
              <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{title}</p>
            </div>
          </div>
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="inline-flex items-center gap-2 bg-forest-green text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1E5225] disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-lg shadow-forest-dark/20"
          >
            {isUpdating ? (
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                </svg>
                Lưu thay đổi
              </>
            )}
          </button>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Title */}
            <div>
              <input
                type="text"
                placeholder="Tiêu đề bài viết..."
                value={title}
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

            {/* Meta fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-8">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Chủ đề câu chuyện</label>
                <select
                  value={tag}
                  onChange={e => setTag(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-all text-gray-700"
                >
                  {TAGS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Đường dẫn ảnh bìa (URL)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-all text-gray-700"
                />
              </div>
            </div>

            {/* Content editor */}
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
