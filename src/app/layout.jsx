import './globals.css'

export const metadata = {
  title: 'Mèo Vạc · Hà Giang | TÂM BẢN Homestay',
  description: 'Khám phá văn hóa, con người, ẩm thực và cảnh quan hùng vĩ huyện Mèo Vạc - Hà Giang. Nghỉ tại TÂM BẢN Homestay giữa lòng đại ngàn H\'Mông.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-off-white text-ink">
        {children}
      </body>
    </html>
  )
}