import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';

function SkeletonRow() {
  return (
    <tr>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-3 bg-gray-100 rounded animate-pulse w-1/3 mt-1.5" />
      </td>
      <td className="px-6 py-4"><div className="h-5 bg-gray-200 rounded-full animate-pulse w-20" /></td>
      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded animate-pulse w-24" /></td>
      <td className="px-6 py-4 text-right"><div className="h-4 bg-gray-200 rounded animate-pulse w-16 ml-auto" /></td>
    </tr>
  );
}

function DeleteModal({ post, onConfirm, onCancel, isDeleting }) {
  if (!post) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 text-center">Xóa bài viết?</h3>
        <p className="text-sm text-gray-500 text-center mt-2 leading-relaxed">
          Bài <span className="font-semibold text-gray-700">"{post.title}"</span> sẽ bị xóa vĩnh viễn.
        </p>
        <div className="flex gap-3 mt-6">
          <button onClick={onCancel} disabled={isDeleting}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">
            Hủy
          </button>
          <button onClick={onConfirm} disabled={isDeleting}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2">
            {isDeleting ? (
              <>
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Đang xóa...
              </>
            ) : 'Xóa vĩnh viễn'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
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

export default function NhatKyListPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Lỗi khi tải:', err);
      setToast({ message: 'Không thể tải danh sách bài viết.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'posts', deleteTarget.id));
      setPosts(prev => prev.filter(p => p.id !== deleteTarget.id));
      setToast({ message: 'Đã xóa bài viết thành công.', type: 'success' });
    } catch (err) {
      console.error('Lỗi khi xóa:', err);
      setToast({ message: 'Không thể xóa. Vui lòng thử lại.', type: 'error' });
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Nhật ký</h1>
            <p className="text-sm text-gray-400 mt-0.5">{isLoading ? 'Đang tải...' : `${posts.length} bài viết`}</p>
          </div>
          <button onClick={() => navigate('/admin/nhat-ky/tao-moi')}
            className="inline-flex items-center gap-2 bg-forest-medium text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1E5225] active:scale-[0.98] transition-all shadow-md shadow-[#3D8B47]/20">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
            </svg>
            Viết bài mới
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Mobile card list */}
          {!isLoading && posts.length > 0 && (
            <div className="sm:hidden divide-y divide-gray-100">
              {posts.map(post => (
                <div key={post.id} className="px-5 py-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 text-sm truncate">{post.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[11px]">{post.tag}</span>
                      <span className="text-gray-400 text-xs">{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button onClick={() => navigate(`/admin/nhat-ky/sua/${post.id}`)} className="text-forest-medium hover:text-forest-dark text-xs font-bold">Sửa</button>
                    <button onClick={() => setDeleteTarget(post)} className="text-red-400 hover:text-red-600 text-xs font-bold">Xóa</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Desktop table */}
          <table className="w-full text-left hidden sm:table">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Tiêu đề</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Chủ đề</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Ngày đăng</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                : posts.length === 0
                  ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-16 text-center">
                        <svg className="w-12 h-12 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        <p className="text-gray-400 font-medium">Chưa có bài viết nào</p>
                      </td>
                    </tr>
                  )
                  : posts.map(post => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800 max-w-xs">
                        <p className="truncate">{post.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-forest-light text-forest-dark px-3 py-1 rounded-full text-xs font-medium">{post.tag}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{post.date}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-4">
                          <button onClick={() => navigate(`/admin/nhat-ky/sua/${post.id}`)} className="text-forest-medium hover:text-forest-dark text-sm font-bold">Sửa</button>
                          <button onClick={() => setDeleteTarget(post)} className="text-red-400 hover:text-red-600 text-sm font-bold">Xóa</button>
                        </div>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal post={deleteTarget} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} isDeleting={isDeleting} />
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </>
  );
}
