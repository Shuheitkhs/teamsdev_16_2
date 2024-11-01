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
        bblue: "#18A0FB",
        bblack: "#383838",
        bred: "#FF3131",
        bgray: "#C9C9C9",
        bwhite: "#FFFFFF",
        // 必要なら便宜設定できるように用意
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
