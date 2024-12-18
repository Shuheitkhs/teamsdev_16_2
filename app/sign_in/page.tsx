"use client";
import { useState } from "react";
import Button from "../components/atom/Button";
import supabase from "@/lib/Supabase/Client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // emailのインプット管理ハンドラー
  const inputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  // passwordのインプット管理ハンドラー
  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  // サインインのハンドラー
  const handleSignIn = async (e: React.FormEvent) => {
    // サインイン処理
    e.preventDefault();
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (signInError) {
        throw signInError;
      }
      console.log("サインイン成功");
      router.push("/home");
    } catch (signInError) {
      if (signInError instanceof Error) {
        alert(`エラーが発生しました: ${signInError.message}`);
      } else {
        alert("エラーが発生しました");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold underline py-5">Sign In</h1>
      <form className="flex flex-col items-center">
        {/* Emailのインプット */}
        <div>
          <p className="text-gray-800">Email</p>
          <input
            type="email"
            placeholder="Enter your Email"
            className="bg-gray-200 shadow border-2 border-gray-400 appearance-none rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            onChange={inputEmail}
            value={email}
          />
        </div>
        {/* パスワードのインプット */}
        <div className="py-5">
          <p className="text-gray-800">Password</p>
          <input
            type="password"
            placeholder="Enter your Password"
            className="bg-gray-200 shadow border-2 border-gray-400 appearance-none rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            onChange={inputPassword}
            value={password}
          />
        </div>
        {/* サインインボタン */}
        <Button
          size="small"
          bgColor="blue"
          rounded="full"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </form>
      {/* サインアップへのリンク */}
      <div className="flex items-center mt-4">
        <span>Don&apos;t have an account?</span>
        <Link href="/sign_up">
          <span className="text-blue-500 ml-1 hover:border-b-2 border-blue-700 hover:text-blue-700">
            Sign Up
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
