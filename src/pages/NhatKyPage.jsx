import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import { db } from '../lib/firebase';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 flex flex-col">
      <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
      <div className="p-6 space-y-3 flex-grow">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
        <div className="h-5 bg-gray-200 rounded animate-pulse w-5/6" />
        <div className="h-5 bg-gray-200 rounded animate-pulse w-4/6" />
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-gray-100 rounded animate-pulse" />
          <div className="h-3 bg-gray-100 rounded animate-pulse w-4/5" />
        </div>
      </div>
      <div className="px-6 pb-6 pt-2 border-t border-gray-100">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
      </div>
    </div>
  );
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export default function NhatKyPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Lỗi tải bài viết:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-off-white min-h-screen font-sans">
      <Navbar />

      <section className="relative min-h-[60vh] flex items-center justify-center bg-forest-dark text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center hero-kenburns opacity-50"
          style={{ backgroundImage: "url('/images/33.png')" }} />
        <div className="relative z-10 px-4">
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-xl text-cream">Nhật ký TÂM BẢN</h2>
          <p className="font-light tracking-widest uppercase text-sm md:text-base opacity-90">Nơi lưu giữ những mẩu chuyện nhỏ giữa đại ngàn</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-20 px-6">
        {error && (
          <div className="text-center py-20">
            <svg className="w-14 h-14 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <p className="text-gray-500 font-medium">Không thể tải bài viết. Vui lòng kiểm tra kết nối mạng.</p>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!isLoading && !error && posts.length === 0 && (
          <div className="text-center py-24">
            <svg className="w-16 h-16 text-gray-200 mx-auto mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            <p className="text-gray-500 font-serif text-xl italic">Chưa có mẩu chuyện nào được kể...</p>
            <p className="text-gray-400 text-sm mt-2">Hãy quay lại sau nhé!</p>
          </div>
        )}

        {!isLoading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <Link key={post.id} to={`/nhat-ky/${post.id}`}
                className="lift bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 group flex flex-col">
                <div className="overflow-hidden aspect-[4/3] relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500 z-10" />
                  <img
                    src={post.imageUrl || '/images/34.png'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-forest-green px-3 py-1 text-xs font-bold tracking-widest uppercase z-20 rounded-sm shadow-sm">
                    {post.tag}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-gray-400 text-xs font-light mb-2.5 block">{post.date}</span>
                  <h3 className="text-xl font-serif text-forest-green mb-3 group-hover:text-forest-medium transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-3 flex-grow">
                    {stripHtml(post.content).substring(0, 120) || 'Đang cập nhật nội dung...'}
                    {stripHtml(post.content).length > 120 ? '...' : ''}
                  </p>
                </div>
                <div className="px-6 pb-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-forest-medium text-xs font-bold tracking-widest uppercase">Đọc tiếp</span>
                  <svg className="w-4 h-4 text-forest-medium group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
