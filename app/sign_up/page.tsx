"use client";
import React, { ReactNode } from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  //useFormを使ってバリデーションのチェック
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const clickSignUp = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(clickSignUp)}>
        <div>
          <p>Name</p>
          {/* Nameのバリデーションをチェックしエラーメッセージを表示 */}
          <input
            type="text"
            {...register("Name", {
              required: "Nameが入力されていません",
              maxLength: {
                value: 30,
                message: "Nameは30文字以内としてください",
              },
            })}
          />
          <p className="text-red-500">{errors.Name?.message as ReactNode}</p>
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
          <p className="text-red-500">{errors.Email?.message as ReactNode}</p>
        </div>
        <div>
          <p>PassWord</p>
          {/* Passwordのバリデーションをチェックしエラーメッセージを表示 */}
          <input
            type="password"
            {...register("Password", {
              required: "パスワードを入力してください",
              minLength: {
                value: 8,
                message: "パスワードは８文字以上にしてください",
              },
            })}
          />
          <p className="text-red-500">
            {errors.Password?.message as ReactNode}
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
