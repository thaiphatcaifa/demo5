import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import { db } from '../lib/firebase';

function PostSkeleton() {
  return (
    <div className="bg-off-white min-h-screen font-sans animate-pulse">
      <Navbar />
      {/* Hero skeleton */}
      <div className="h-[55vh] bg-gray-300" />
      {/* Content skeleton */}
      <div className="max-w-3xl mx-auto py-20 px-6 space-y-4">
        {[100, 90, 75, 85, 60].map((w, i) => (
          <div key={i} className={`h-4 bg-gray-200 rounded`} style={{ width: `${w}%` }} />
        ))}
        <div className="h-60 bg-gray-200 rounded-2xl mt-8" />
        {[80, 70, 90, 55].map((w, i) => (
          <div key={i} className={`h-4 bg-gray-200 rounded`} style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

export default function PostDetailPage() {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const snap = await getDoc(doc(db, 'posts', postId));
        if (snap.exists()) {
          setPost({ id: snap.id, ...snap.data() });
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Lỗi tải bài viết:', err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  if (isLoading) return <PostSkeleton />;

  if (notFound) {
    return (
      <div className="bg-off-white min-h-screen font-sans">
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
          <svg className="w-16 h-16 text-gray-200 mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h2 className="text-2xl font-serif text-forest-green mb-3">Bài viết không tồn tại</h2>
          <p className="text-gray-500 text-sm mb-7 max-w-sm">Mẩu chuyện này có thể đã được gỡ xuống hoặc chưa từng được đăng tải.</p>
          <button
            onClick={() => navigate('/nhat-ky')}
            className="inline-flex items-center gap-2 bg-forest-green text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#1E5225] transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
            Trở về Nhật ký
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-off-white min-h-screen font-sans">
      <Navbar />

      {/* Hero image */}
      <section className="relative h-[55vh] md:h-[65vh] flex items-end justify-center pb-14">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${post.imageUrl || "/images/34.png"}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 text-center max-w-4xl px-6">
          <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-sm mb-5 inline-block">
            {post.tag}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-5 drop-shadow-md leading-tight">
            {post.title}
          </h2>
          <p className="text-gray-300 font-light tracking-widest text-sm">{post.date}</p>
        </div>
      </section>

      {/* Back button */}
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <button
          onClick={() => navigate('/nhat-ky')}
          className="inline-flex items-center gap-2 text-sm text-forest-medium hover:text-forest-green font-bold transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Trở về Nhật ký
        </button>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto py-10 px-6 md:px-8">
        <div
          className="prose prose-stone md:prose-lg max-w-none prose-img:rounded-2xl prose-img:shadow-xl prose-headings:font-serif prose-headings:text-forest-green prose-a:text-forest-medium prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-forest-green text-white flex items-center justify-center font-serif text-2xl italic shrink-0">T</div>
          <div>
            <p className="font-bold text-forest-green text-sm tracking-widest uppercase">Chủ nhà TÂM BẢN</p>
            <p className="text-gray-400 text-sm font-light">Người kể chuyện từ Mèo Vạc, Hà Giang</p>
          </div>
        </div>
      </article>
    </div>
  );
}
