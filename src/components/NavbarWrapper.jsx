"use client";
import dynamic from 'next/dynamic';

// Dùng ssr: false để tránh hydration mismatch với Navbar (useState vs usePathname)
// Wrapper này là Client Component nên được phép dùng ssr: false
const Navbar = dynamic(() => import('./Navbar'), { ssr: false });

export default function NavbarWrapper() {
  return <Navbar />;
}
