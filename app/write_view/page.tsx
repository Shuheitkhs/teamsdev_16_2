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
  const [viewBlogImage, setViewBlogImage] = useState<string>();
  // 投稿するBlogTitleを格納
  const [blogAddTitle, setBlogAddTitle] = useState("");
  // 投稿するBlog
  const [blogAddContent, setBlogAddContent] = useState("");
  // 投稿する写真のファイル
  const [postImage, setPostImage] = useState<File | null>();
  // 現在のユーザ情報を取得
  const currentUser = supabase.auth.getSession();

  //初期画面titleInputにカーソルを合わせる
  useEffect(() => {
    titleInputRef?.current?.focus();
  }, []);

  const clickAddBlog = async (e: React.FormEvent) => {
    // 登録ボタン押下時のリロードをキャンセル
    e.preventDefault();

    // 投稿する画像URL格納変数
    let postImageURL = "";

    if (postImage) {
      const ImageURL = `PostPhoto/${postImage?.name}`; // 画像の保存先のpathを指定
      const { error } = await supabase.storage
        .from("writeViewImage")
        .upload(ImageURL, postImage); //supabaseのstorageへ写真を登録する
      if (error) {
        console.log(error, "supabaseへ写真登録処理に失敗しました");
        return;
      }

      const { data: postData } = supabase.storage
        .from("writeViewImage")
        .getPublicUrl(ImageURL);
      const postImageURL = postData.publicUrl;
    }
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          user_id: "68fd7d01-e415-4711-bcf0-a8c1bb2ad94c",
          category_id: "75fb1104-ddc7-4ea8-8433-dad355c0a98c",
          title: blogAddTitle,
          content: blogAddContent,
          image_path: postImageURL,
        },
      ]) //id系は仮のユーザ本来はログインしているユーザ
    if (error) {
      console.log(error,'postsへの投稿の処理でエラーが発生しました。');
      return
    }
    ;
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
      setViewBlogImage(window.URL.createObjectURL(targetImage));
      setPostImage(targetImage);
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
          {postImage && (
            <Image
              src={viewBlogImage as string}
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
        <div>
          <textarea
            onChange={(e) => setBlogAddContent(e.target.value)}
            placeholder="ブログ本文を入力してください"
          ></textarea>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default WriteView;
