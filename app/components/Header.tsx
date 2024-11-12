"use client";

import supabase from "@/lib/Supabase/Client";

import { useCallback, useEffect, useState } from "react";
import Button from "./atom/Button";
import useWideScreen from "../hooks/useWideScreen";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

const Header = () => {
  // ユーザー名を表示するためのstate
  const [showUserName, setShowUserName] = useState("");
  // セッションを取得するための関数
  const fetchSession = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("セッション取得でエラーが発生しました。", error.message);
        return;
      }
      // セッションがある場合にユーザー情報を取得
      if (data?.session) {
        const { user } = data.session;
        // 仮でauth.usersテーブルから直接emailを使用
        setShowUserName(user.email || "");
      }
    } catch (err) {
      console.error("エラーが発生しました。", err);
    }
  }, []);
  // コンポーネントがマウントされたときにセッションを取得
  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  // ハンバーガーメニューの表示/非表示を管理するstate
  const [isToggle, setIsToggle] = useState(false);
  const handleToggle = () => {
    setIsToggle(!isToggle);
  };
  // 画面サイズを感知するhooks
  const isWideScreen = useWideScreen();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-300">
      <span className="text-2xl font-bold">LOGO</span>
      {/* 画面サイズによって、ハンバーガーメニューの出し分け */}
      {isWideScreen === true ? (
        <div className="flex items-center space-x-4">
          <Link href="/">
            {" "}
            <Button
              bgColor="black"
              size="small"
              textColor="white"
              rounded="full"
            >
              Home
            </Button>
          </Link>
          <Link href="/write_view">
            <Button
              bgColor="black"
              size="small"
              textColor="white"
              rounded="full"
            >
              Create
            </Button>
          </Link>
          {/* ログインしているかどうかによって表示を変える */}
          {showUserName === "" ? (
            <Link href="/sign_in">
              <Button
                bgColor="gray"
                size="small"
                textColor="black"
                rounded="full"
              >
                Sign In
              </Button>
            </Link>
          ) : (
            <div>email:{showUserName}</div>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          {isToggle === false ? (
            <button onClick={handleToggle}>
              <MenuIcon fontSize="large" />
            </button>
          ) : (
            <button onClick={handleToggle} className="z-10">
              <CloseIcon fontSize="large" />
            </button>
          )}
          {isToggle && (
            <div className="flex flex-col rounded-lg p-3 z-0 absolute top-14 right-0 bg-gray-400">
              <Link href="/">
                <Button
                  bgColor="black"
                  size="small"
                  textColor="white"
                  rounded="full"
                >
                  Home
                </Button>
              </Link>
              <Link href="/write_view">
                <Button
                  bgColor="black"
                  size="small"
                  textColor="white"
                  rounded="full"
                >
                  Create
                </Button>
              </Link>
              {showUserName === "" ? (
                <Link href="/sign_in">
                  <Button
                    bgColor="gray"
                    size="small"
                    textColor="black"
                    rounded="full"
                  >
                    Sign In
                  </Button>
                </Link>
              ) : (
                <div>email:{showUserName}</div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
