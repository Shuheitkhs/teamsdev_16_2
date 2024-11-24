"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import supabase from "@/lib/Supabase/Client";
import { useForm } from "react-hook-form";
import { addBlogDataTypes } from "@/Types";
import Button from "../components/atom/Button";
import SubmitButton from "../components/atom/SubmitButton";

const WriteView = () => {
  // inputRefの初期化
  const titleInputRef = useRef<null | HTMLInputElement>(null);
  // 写真追加Inputをrefへ
  const inputImageRef = useRef<HTMLInputElement | null>(null);
  // 投稿する写真を表示
  const [viewBlogImage, setViewBlogImage] = useState<string>();
  // 投稿する写真のファイル
  const [postImage, setPostImage] = useState<File | null>(null);
  // 写真の容量サイズエラーメッセージ
  const [capacityError, setCapacityError] = useState<string>("");
  // 同じ写真追加時のエラーメッセージ
  const [ImageError, setImageError] = useState<string>("");
  // 現在のユーザ情報取得
  const [currentUser, setCurrentUer] = useState<any>();

  //現在のユーザが何か
  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUer(user);
    };
    getCurrentUser();
  }, []);
  // 現在のユーザ情報を取得

  console.log(currentUser);

  //初期画面titleInputにカーソルを合わせる
  useEffect(() => {
    titleInputRef?.current?.focus();
  }, []);

  //useFormを使ってバリデーションのチェック
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addBlogDataTypes>({ mode: "onChange" });

  const clickAddBlog = async (addBlogData: addBlogDataTypes) => {
    // 入力した情報を取得
    let { title, content } = addBlogData;

    // supabaseへ写真以外の情報を登録
    const { error: insertError, data: postData } = await supabase
      .from("posts")
      .insert([
        {
          user_id: currentUser.id,
          category_id: "75fb1104-ddc7-4ea8-8433-dad355c0a98c",
          title: title,
          content: content,
          image_path: "",
        },
      ])
      .select();
    if (insertError) {
      console.log(insertError, "postsへの投稿の処理でエラーが発生しました。");
      return;
    }

    // 画像のデータをsupabseのstorageへ登録
    if (postImage) {
      const ImageURL = `PostPhoto/${postImage?.name}`; // 画像の保存先のpathを指定
      const { error } = await supabase.storage
        .from("writeViewImage")
        .upload(ImageURL, postImage); //supabaseのstorageへ写真を登録する
      if (error) {
        if (error.message === "The resource already exists") {
          setImageError("既に登録済みの写真がです");
          return;
        }
        console.log(error, "supabaseへ写真登録処理に失敗しました");
        return;
      }

      // 画像のURLを作成し画像URLの更新
      const { data: postImageURL } = await supabase.storage
        .from("writeViewImage")
        .getPublicUrl(ImageURL);
      if (postImageURL) {
        // 投稿データに画像URLを更新
        await supabase
          .from("posts")
          .update({ image_path: postImageURL.publicUrl })
          .eq("id", postData[0].id); // 投稿IDを基に更新
      }
    } else {
      //投稿画像がない場合
      alert("投稿に成功しました");
      // formのリセット
      reset();
      setViewBlogImage("");
      setPostImage(null);
    }
  };

  //Upload Imageボタンが押された際にinputを押下
  const clickUploadImage = () => {
    inputImageRef.current?.click();
  };

  //追加したい写真を選択
  const onChangeUploadImage = async (e: React.FormEvent<HTMLInputElement>) => {
    // 選択した写真のファイルを取得
    const targetImage = e.currentTarget.files?.[0];
    if (targetImage) {
      // 選択した写真のファイルサイズが5MB以内であるか
      if (targetImage.size <= 5242880) {
        setViewBlogImage(window.URL.createObjectURL(targetImage));
        setPostImage(targetImage);
      } else {
        setCapacityError("写真のサイズは5MBまでです");
      }
    } else {
      //写真がない場合
      alert("投稿に成功しました");
      // formのリセット
      reset();
      setViewBlogImage("");
      setPostImage(null);
    }
  };
  return (
    <div className="flex flex-col min-h-screen  items-center mt-16 w-full ">
      <form
        className="w-7/12"
        onSubmit={handleSubmit((blogData) => clickAddBlog(blogData))}
      >
        <div className="flex text-4xl ">
          <span className="font-bold mr-5">Title</span>
          <input
            className="w-full"
            type="text"
            placeholder="Titleを入力してください"
            {...register("title", {
              required: "Titleが入力されてません",
              maxLength: {
                value: 50,
                message: "Titleは50文字以内にしてください",
              },
            })}
          ></input>
        </div>
        <p className="text-red-500">{errors.title?.message as ReactNode}</p>
        <div>
          {/* 選択した写真を表示 */}
          <div></div>
          {postImage && (
            <Image
            className="m-auto"
              src={viewBlogImage as string}
              alt="uploadImage"
              width={500}
              height={500}
            />
          )}
          <Button
            size="small"
            bgColor="blue"
            rounded="lg"
            onClick={clickUploadImage}
          >
            Upload Image
          </Button>
          <input
            type="file"
            // onChange={onChangeUploadImage}
            accept="image/*"
            style={{ display: "none" }}
            ref={inputImageRef}
            onChange={onChangeUploadImage}
          />
          <p className="text-red-500">{capacityError}</p>
          <p className="text-red-500">{ImageError}</p>
        </div>
        <div>
          <textarea
            className="text-2xl bg-gray-200 w-full min-h-[600px]"
            placeholder="ブログ本文を入力してください"
            {...register("content", {
              required: "ブログ本文が入力されていません",
              maxLength: {
                value: 10000,
                message: "Titleは1万文字以内にしてください",
              },
            })}
          ></textarea>
          <p className="text-red-500">{errors.content?.message as ReactNode}</p>
        </div>
        <div className="flex justify-end" >
        <SubmitButton  size="small" bgColor="blue" rounded="full">
          Create
        </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default WriteView;
