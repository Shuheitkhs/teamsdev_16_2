import Image from "next/image";
import React from "react";

const Write_view = () => {
  return (
    <div>
      <input placeholder="Title"></input>
      <form>
        {/* 投稿写真の追加 */}
        <div>
          <button>Upload Image</button>
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

export default Write_view;
