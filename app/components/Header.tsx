"use client";

import supabase from "@/lib/Supabase/Client";
import React, { useCallback, useEffect, useState } from "react";

const Header = () => {
  const [showUserName, setShowUserName] = useState("");

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
    <header>
      <span>LOGO</span>
      <button>Home</button>
      <button>Create</button>
      <button>Sign In</button>
      <div>email:{showUserName}</div>
    </header>
  );
};

export default Header;
