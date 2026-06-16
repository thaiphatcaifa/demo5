/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Palette Be Able VN — Forest Green (đồng bộ với @theme trong globals.css)
      colors: {
        'forest-green': '#2B6830',  // Chủ đạo
        'forest-dark': '#1E5225',   // Section/footer/đậm
        'forest-medium': '#3D8B47', // Accent, hover, badge
        'forest-light': '#E8F4EC',  // Nền card nhạt
        'off-white': '#F2F8F4',     // Nền trang
        'ink': '#2C2C2C',           // Text chính
      },
      fontFamily: {
        serif: ['Be Vietnam Pro', 'sans-serif'],
        sans: ['Be Vietnam Pro', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
