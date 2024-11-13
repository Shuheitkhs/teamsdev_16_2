"use client";

import supabase from "@/lib/Supabase/Client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Button from "../atom/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";

const UserIcon = () => {
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

  // ユーザーアイコンの表示/非表示を管理するstate
  const [openToggle, setOpenToggle] = useState(false);
  // ユーザーアイコンの表示/非表示を切り替える関数
  const handleToggle = () => {
    setOpenToggle(!openToggle);
  };

  return (
    <div>
      {showUserName === "" ? (
        <div>
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
        </div>
      ) : (
        <div>
          {openToggle ? (
            <>
              <div className="relative">
                <button
                  onClick={handleToggle}
                  className="cursor-pointer z-20 relative"
                >
                  <CloseIcon fontSize="large" />
                </button>
                <div className="flex flex-col items-center rounded-lg p-3 z-50 absolute top-14 right-0 bg-gray-400">
                  <Button
                    bgColor="red"
                    size="small"
                    textColor="white"
                    rounded="full"
                  >
                    Logout
                  </Button>
                  <div>email: {showUserName}</div>
                </div>
              </div>
            </>
          ) : (
            <button onClick={handleToggle} className="cursor-pointer">
              <AccountCircleIcon fontSize="large" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserIcon;
