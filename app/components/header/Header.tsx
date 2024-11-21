"use client";

import useWideScreen from "../../hooks/useWideScreen";
import MobileViewHeader from "./MobileViewHeader";
import WideViewHeader from "./WideViewHeader";

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
