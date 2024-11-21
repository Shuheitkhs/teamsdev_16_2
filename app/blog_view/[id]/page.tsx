"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import { useEffect, useState } from "react";
import supabase from "@/lib/Supabase/Client";

type Post = {
  id: string;
  user_id?: string;
  category_id?: string;
  title: string;
  content: string;
  image_path: string;
};

type Comment = {
  id: string;
  user_id: string;
  post_id?: string;
  content: string;
};

const BlogViewPage = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      const { data: postData, error: postError } = await supabase
        .from("posts")
        .select("*")
        .eq("id", params.id)
        .single();

      if (postError) {
        console.error("postの取得でエラーが発生しました:", postError.message);
      } else if (postData) {
        setPost(postData);
      }

      const { data: commentsData, error: commentsError } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", params.id);

      if (commentsError) {
        console.error(
          "コメントの取得でエラーが発生しました:",
          commentsError.message,
        );
      } else if (commentsData) {
        setComments(commentsData);
      }
    };

    fetchPostAndComments();
  }, [params.id]);

  return (
    <div>
      {/* ヘッダー */}
      <div className="bg-gray-300 h-15">
        ヘッダーコンポーネント作成後、ここにヘッダーが入ります。
      </div>

      {/* メインコンテンツ部分 */}
      <div className="bg-white sm:bg-gray-300 m-10 sm:p-10">
        <div className="flex justify-center sm:justify-between items-center">
          <h1 className="text-4xl">{post?.title}</h1>
          <AccountCircleIcon className="hidden sm:block" fontSize="large" />
        </div>
        <Image
          src={post?.image_path || "/default.png"}
          alt="ここに画像が入ります。"
          width={500}
          height={300}
        />
        <div>{post?.content}</div>
      </div>

      {/* More Posts部分 */}
      <div className="m-10">
        <div className="text-2xl">More Posts</div>
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="p-4">
            <Image
              src="/default.png"
              alt="ここに画像が入ります。"
              width={200}
              height={150}
            />
            <div>Post Title 1</div>
          </div>
          <div className="p-4">
            <Image
              src="/default.png"
              alt="ここに画像が入ります。"
              width={200}
              height={150}
            />
            <div>Post Title 2</div>
          </div>
          <div className="p-4">
            <Image
              src="/default.png"
              alt="ここに画像が入ります。"
              width={200}
              height={150}
            />
            <div>Post Title 3</div>
          </div>
        </div>
      </div>

      {/* コメント部分 */}
      <div className="m-10">
        <div className="text-3xl">Comments</div>
        <div className="flex flex-col sm:flex-row justify-center">
          <input placeholder="Add Your Comment" className="border-2 p-2 mr-2" />
          <button className="bg-sky-500 text-white px-4 py-2">
            仮のボタン
          </button>
        </div>
        <div className="flex flex-col items-center mt-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 border-b border-gray-300 w-full"
              >
                {comment.content}
              </div>
            ))
          ) : (
            <div className="p-4">コメントがありません。</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogViewPage;
