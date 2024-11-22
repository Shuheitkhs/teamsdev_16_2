"use client";

import useWideScreen from "../../hooks/useWideScreen";
import WideViewHeader from "@/app/components/header/WideViewHeader";
import MobileViewHeader from "@/app/components/header/MobileViewHeader";

const Header = () => {
  // 画面サイズを感知するhooks
  const isWideScreen = useWideScreen();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-300">
      <span className="text-2xl font-bold">LOGO</span>
      {/* 画面サイズによって、ボタンの出し分け */}
      {isWideScreen === true ? <WideViewHeader /> : <MobileViewHeader />}
    </header>
  );
};

export default Header;
