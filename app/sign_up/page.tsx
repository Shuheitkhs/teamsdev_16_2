"use client";
import { SignUpData } from "@/Types";
import React, { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../utils/supabaes";
import { useRouter } from "next/navigation";

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
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit((signUpData) => clickSignUp(signUpData))}>
        <p className="text-red-500">{signUpError}</p>
        <div>
          <p>Name</p>
          {/* Nameのバリデーションをチェックしエラーメッセージを表示 */}
          <input
            type="text"
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
        <div>
          <p>Email</p>
          {/* Nameがバリデーションをチェックしエラーメッセージを表示 */}
          <input
            type="email"
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
        <div>
          <p>PassWord</p>
          {/* Passwordのバリデーションをチェックしエラーメッセージを表示 */}
          <input
            type="password"
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
        <button>Sign Up</button>
      </form>
      <span>Already have an account?</span>
      <span> sign in</span>
    </div>
  );
};

export default SignUp;
