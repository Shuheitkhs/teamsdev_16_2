"use client";
import React, { useRef, useState } from "react";
import Image from 'next/image'


const WriteView = () => {
  const inputImageRef = useRef<HTMLInputElement|null>(null);
  // 投稿する写真の保存
  const [blogImage, setBlogImage] = useState("");

  //Upload Imageボタンが押された際にinputを押下
  const clickUploadImage = () => {
    inputImageRef.current?.click();
  };

  //追加したい写真を選択
  const onChangeUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 型エラーの解消
    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    if (file) {
      // 取得した写真のURLを作成
      setBlogImage(window.URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <input placeholder="Title"></input>
      <form>
        <div>
          {/* 選択した写真を表示 */}
          {blogImage && <Image src={blogImage} alt="uploadImage" width={500} height={500}/>}
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
          <textarea placeholder="ブログ本文を入力してください"></textarea>
        </div>
      </form>
      {/* 投稿するボタン */}
      <button>Create</button>
    </div>
  );
};

export default WriteView;
