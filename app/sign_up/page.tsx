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
          <input
            type="text"
            {...register("name", {
              required: "Nameが入力されていません",
              maxLength: {
                value: 20,
                message: "Nameは20文字以内としてください",
              },
            })}
          />
          <p className="text-red-500">{errors.name?.message as ReactNode}</p>
        </div>
        <div>
          <p>Email</p>
          <input
            type="email"
            {...register("email", { required: "Emailが入力されていません" })}
          />
          <p className="text-red-500">{errors.email?.message as ReactNode}</p>
        </div>
        <div>
          <p>Password</p>
          <input
            type="password"
            {...register("password", {
              required: "パスワードを入力してください",
              minLength: {
                value: 8,
                message: "パスワードは8文字以上にしてください",
              },
            })}
            autoComplete="new-password"
          />
          <p className="text-red-500">{errors.password?.message as ReactNode}</p>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <span>Already have an account?</span>
      <span> sign in</span>
    </div>
  );
};

export default SignUp;
