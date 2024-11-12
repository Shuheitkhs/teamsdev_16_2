"use client";

import supabase from "@/lib/Supabase/Client";

import { useCallback, useEffect, useState } from "react";
import Button from "./atom/Button";

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

  return (
    <header className="flex justify-between items-center p-4 bg-gray-300">
      <span className="text-2xl font-bold">LOGO</span>
      <div className="flex items-center space-x-4">
        <Button bgColor="black" size="small" textColor="white" rounded="full">
          Home
        </Button>
        <Button bgColor="black" size="small" textColor="white" rounded="full">
          Create
        </Button>
        {/* ログインしているかどうかによって表示を変える */}
        {showUserName === "" ? (
          <Button bgColor="gray" size="small" textColor="black" rounded="full">
            Sign In
          </Button>
        ) : (
          <div>email:{showUserName}</div>
        )}
      </div>
    </header>
  );
};

export default Header;
