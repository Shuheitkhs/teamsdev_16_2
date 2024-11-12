// 画面サイズに応じてDOM操作するuseEffect
import { useEffect, useState } from "react";

const useWideScreen = () => {
  const [isWideScreen, setIsWideScreen] = useState(true);
  // 画面サイズに応じてDOM操作するuseEffect
  useEffect(() => {
    // 画面幅640以上でisWideScreenがtrueに
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 640);
    };
    // 初期サイズのチェック
    handleResize();
    // 画面幅の監視
    window.addEventListener("resize", handleResize);
    // クリーンアップ関数
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isWideScreen;
};

export default useWideScreen;
