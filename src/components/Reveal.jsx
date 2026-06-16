import React, { useRef, useEffect, useState } from 'react';

// Bọc nội dung để hiện dần (fade-up) khi cuộn tới — tạo cảm giác "sống động".
// delay: trễ animation (ms) để các phần tử hiện so le. as: đổi thẻ bọc (mặc định div).
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setSeen(true); io.disconnect(); }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${seen ? 'is-visible' : ''} ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
