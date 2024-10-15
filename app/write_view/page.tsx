import Image from "next/image";
import React from "react";

const write_view = () => {
  return (
    <div>
      <h1>Title</h1>
      <form>
        {/* 投稿写真の追加 */}
        <div>
          <button>Upload Image</button>
        </div>
        {/* 投稿文内容の追加 */}
        <div>
          <p>投稿内容の追加する文字を入力</p>
        </div>
      </form>
      {/* 投稿するボタン */}
      <button>Create</button>
    </div>
  );
};

export default write_view;
