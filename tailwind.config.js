/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        //カラーでWF上の色を呼び出しやすく設定
        blue: "#18A0FB",
        black: "#383838",
        red: "#FF3131",
        gray: "#C9C9C9",
        white: "#FFFFFF",
        // 必要なら便宜設定できるように用意
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
