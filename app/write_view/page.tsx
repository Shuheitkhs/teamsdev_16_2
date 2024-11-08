"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabase";

const WriteView = () => {
  // inputRefの初期化
  const titleInputRef = useRef<null | HTMLInputElement>(null);
  // 写真追加Inputをrefへ
  const inputImageRef = useRef<HTMLInputElement | null>(null);
  // 投稿する写真を表示
  const [viewBlogImage, setViewBlogImage] = useState("");
  //投稿する写真の保存
  const [blogImage, setBlogImage] = useState<string | null>(null);
  // 投稿するBlogTitleを格納
  const [blogAddTitle, setBlogAddTitle] = useState("");
  // 投稿するBlog
  const [blogAddContent, setBlogAddContent] = useState("");
  // 現在のユーザ情報を取得
  const currentUser = supabase.auth.getSession();
  console.log(currentUser);

  //初期画面titleInputにカーソルを合わせる
  useEffect(() => {
    titleInputRef?.current?.focus();
  }, []);

  const clickAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          user_id: "68fd7d01-e415-4711-bcf0-a8c1bb2ad94c",
          category_id: "75fb1104-ddc7-4ea8-8433-dad355c0a98c",
          title: blogAddTitle,
          content: blogAddContent,
          image_path: blogImage,
        },
      ]) //id系は仮のユーザ本来はログインしているユーザ
      .select();

    if (error) {
      console.log(error);
    }
    console.log(data);
    return data;
  };

  //Upload Imageボタンが押された際にinputを押下
  const clickUploadImage = () => {
    inputImageRef.current?.click();
  };

  //追加したい写真を選択
  const onChangeUploadImage = async (e: React.FormEvent) => {
    // 型エラーの解消
    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    const filePath = `my_folder/${file.name}`; // 画像の保存先のpathを指定
    const { error } = await supabase.storage
      .from("posts")
      .upload(filePath, file);
    if (error) {
      console.log(error, "supabaseへファイルの処理に失敗しました");
    }
    const { data } = supabase.storage.from("posts").getPublicUrl(filePath);
    const fileUrl = data.publicUrl;
    setBlogImage(fileUrl);//投稿する写真をsupabaseへ登録
    if (file) {
      setViewBlogImage(window.URL.createObjectURL(file));//投稿する写真を表示
    }
  };

  return (
    <div className="">
      <form onSubmit={clickAddBlog}>
        <span className="font-bold">Title</span>
        <input
          type="text"
          ref={titleInputRef}
          onChange={(e) => setBlogAddTitle(e.target.value)}
          placeholder="Titleを入力してください"
        ></input>
        <div>
          {/* 選択した写真を表示 */}
          {blogImage && (
            <Image
              src={viewBlogImage}
              alt="uploadImage"
              width={500}
              height={500}
            />
          )}
          <button onClick={clickUploadImage} type="button">
            Upload Image
          </button>
          <input
            type="file"
            onChange={onChangeUploadImage}
            ref={inputImageRef}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>
        {/* 投稿文内容の追加 */}
        <div>
          <textarea
            onChange={(e) => setBlogAddContent(e.target.value)}
            placeholder="ブログ本文を入力してください"
          ></textarea>
        </div>
        <button type="submit">Create</button>
      </form>
      {/* 投稿するボタン */}
    </div>
  );
};

export default WriteView;
