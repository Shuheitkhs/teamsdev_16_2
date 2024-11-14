"use client";
import { ReactNode, useState } from "react";
import Button from "../components/atom/Button";
import supabase from "@/lib/Supabase/Client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "@/tyeps";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useFormでバリデーションチェック
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signIn>({ mode: "onChange" });

  // emailのインプット管理ハンドラー   
  const inputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // passwordのインプット管理ハンドラー  
  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // サインインのハンドラー
  const handleSignIn = async (signInData: signIn) => {
    // サインイン処理
    // e.preventDefault();  useFromを使用するため不要
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
      });
      if (signInError) {
        throw signInError;
      }
      console.log("サインイン成功");
      router.push("/");
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
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit((signInData)=>handleSignIn(signInData))}
      >
        {/* Emailのインプット */}
        <div>
          <p className="text-gray-800">Email</p>
          <input
            {...register("email", {
              required: "Emailが入力されていません", //空白だった時のエラーメッセージ
              pattern: {
                value:
                  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/, //メールアドレスの正規表現
                message: "正しく入力してください",
              },
            })}
            type="email"
            placeholder="Enter your Email"
            className="bg-gray-200 shadow border-2 border-gray-400 appearance-none rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            onChange={inputEmail}  
            value={email}
          />
          <p className="text-red-500">{errors.email?.message as ReactNode}</p>
        </div>
        {/* パスワードのインプット */}
        <div className="py-5">
          <p className="text-gray-800">Password</p>
          <input
            {...register("password", {
              required: "パスワードを入力してください", //空白だった時のエラーメッセージ
            })}
            type="password"
            placeholder="Enter your Password"
            className="bg-gray-200 shadow border-2 border-gray-400 appearance-none rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            onChange={inputPassword}
            value={password}
          />
        <p className='text-red-500'>{errors.password?.message}</p>
        </div>
        {/* サインインボタン */}
        <Button
          size="small"
          bgColor="blue"
          rounded="full"
          // onClick={handleSignIn}    useFormでonsubmitにしたため不要
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
