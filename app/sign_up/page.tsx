"use client";
import { SignUpData } from "@/Types";
import React, { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import supabase from "@/lib/Supabase/Client";
import  Button from "../components/atom/Button";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();
  //useFormを使ってバリデーションのチェック
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({ mode: "onChange" });
  const [signUpError, setSignUpError] = useState("");

  const clickSignUp = async (signUpData: SignUpData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
      });
      console.log(data, "ユーザ登録に成功しました");
      if (error) {
        throw error;
      }
    } catch (error: any) {
      if (error.message == "User already registered") {
        setSignUpError("すでに登録されているユーザです");
        return;
      } else {
        console.log("すでに登録はされていません");
      }
      console.log(error, "ユーザ登録に失敗しました");
      return;
    }
    router.push("/sign_in");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold underline py-5">Sign Up</h1>
      <form onSubmit={handleSubmit((signUpData) => clickSignUp(signUpData))} 
            className="flex flex-col items-center">
        <p className="text-red-500">{signUpError}</p>
        <div className="py-5">
          <p className="text-gray-800">Name</p>
          {/* Nameのバリデーションをチェックしエラーメッセージを表示 */}
          <input
            type="text"
            placeholder="Enter your Name"
            className="bg-gray-200 shadow border-2 border-gray-400 appearance-none rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            {...register("name", {
              required: "Nameが入力されていません",
              maxLength: {
                value: 30,
                message: "Nameは30文字以内としてください",
              },
            })}
          />
          <p className="text-red-500">{errors.name?.message as ReactNode}</p>
        </div>
        <div className="py-5">
          <p className="text-gray-800">Email</p>
          {/* Nameがバリデーションをチェックしエラーメッセージを表示 */}
          <input
            type="email"
            placeholder="Enter your Email"
            className="bg-gray-200 shadow border-2 border-gray-400 appearance-none rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            {...register("email", {
              required: "Emailが入力されていません",
              pattern: {
                value:
                  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/, //メールアドレスの正規表現
                message: "メールアドレスを正しく入力してください",
              },
            })}
          />
          <p className="text-red-500">{errors.email?.message as ReactNode}</p>
        </div>
        <div className="py-5">
          <p className="text-gray-800">Password</p>
          {/* Passwordのバリデーションをチェックしエラーメッセージを表示 */}
          <input
            type="password"
            placeholder="Enter your Password"
            className="bg-gray-200 shadow border-2 border-gray-400 appearance-none rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            {...register("password", {
              required: "パスワードを入力してください",
              minLength: {
                value: 8,
                message: "パスワードは８文字以上にしてください",
              },
            })}
          />
          <p className="text-red-500">
            {errors.password?.message as ReactNode}
          </p>
        </div>
        <Button
          size="small"
          bgColor="blue"
          rounded="full"
        >
          Sign Up
        </Button>
      </form>
      <div className="flex items-center mt-4">
        <span>Already have an account?</span>
        <Link href="/sign_in">
          <span className="text-blue-500 ml-1 hover:border-b-2 border-blue-700 hover:text-blue-700">
            Sign In
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
