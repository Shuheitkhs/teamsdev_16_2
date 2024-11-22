"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import { useEffect, useState } from "react";
import supabase from "@/lib/Supabase/Client";
import Button from "@/app/components/atom/Button";
import Link from "next/link";
import Comment from "@/app/components/Comment";

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
  post_id: string;
  content: string;
  created_at: string;
};

type MorePosts = {
  id: string;
  title: string;
  image_path: string;
};

const BlogViewPage = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  // postの取得
  useEffect(() => {
    const fetchPost = async () => {
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
    };

    fetchPost();
  }, [params.id]);

  // コメントの取得
  const fetchComments = async () => {
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
  fetchComments();

  // コメントの投稿フォーム
  const [formComment, setFormComment] = useState("");

  const isCommentValid = formComment.length >= 10;

  // コメントの投稿
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ユーザーのセッションの確認
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError || !sessionData?.session) {
        console.error(
          "セッション取得でエラーが発生しました。",
          sessionError?.message,
        );
        return;
      }
      // 取得したセッションをデータにuserに設定
      const user = sessionData.session.user;

      if (!isCommentValid) {
        alert("コメントは10文字以上入力してください。");
        return;
      }
      // コメントの投稿
      const { error } = await supabase.from("comments").insert([
        {
          user_id: user.id,
          post_id: params.id,
          content: formComment,
        },
      ]);
      if (error) throw error;
      setFormComment("");
      await fetchComments(); // コメントを再取得
    } catch (error) {
      alert("データの新規登録ができません");
    }
  };

  // morePostsの状態
  const [morePosts, setMorePosts] = useState<MorePosts[]>([]);
  // morePostsの取得
  useEffect(() => {
    const fetchMorePosts = async () => {
      const { data: morePostData, error: morePostError } = await supabase
        .from("posts")
        .select("id, title, image_path")
        .eq("category_id", post?.category_id)
        .neq("id", params.id)
        .limit(3);

      if (morePostError) {
        console.error(
          "関連記事の取得でエラーが発生しました。",
          morePostError.message,
        );
      } else if (morePostData) {
        setMorePosts(morePostData);
      }
    };

    if (post?.category_id) {
      fetchMorePosts();
    }
  }, [post?.category_id, params.id]);

  return (
    <div>
      {/* メインコンテンツ部分 */}
      <div className="bg-white sm:bg-gray-300 m-10 sm:p-10">
        <div className="flex justify-center sm:justify-between items-center space-y-5">
          <h1 className="text-3xl">{post?.title}</h1>
          <AccountCircleIcon className="hidden sm:block" fontSize="large" />
        </div>
        <div className="flex justify-center p-2">
          <Image
            src={post?.image_path || "/default.jpg "}
            alt="ここに画像が入ります。"
            width={1600}
            height={900}
            className="shadow-lg"
          />
        </div>

        <div className="my-3">{post?.content}</div>
      </div>

      {/* More Posts部分 */}
      <div className="m-10">
        <div className="text-2xl">More Posts</div>
        <div className="flex flex-col items-center sm:flex-row justify-between">
          {morePosts.map((morePost) => (
            <div key={morePost.id} className="p-4">
              <Link href={`/blog_view/${morePost.id}`}>
                <Image
                  src={morePost.image_path || "/default.jpg"}
                  alt="ここに画像が入ります。"
                  width={300}
                  height={200}
                  className="shadow-lg hover:scale-105 "
                />
                <div>{morePost.title}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* コメント部分 */}
      <div className="m-10">
        {/* コメントのタイトル */}
        <div className="text-3xl">
          <h3>Comments</h3>
        </div>
        {/* コメントの投稿フォーム */}
        <div>
          <div className="flex flex-col sm:flex-row justify-center items-center w-full">
            <form onSubmit={handleCommentSubmit}>
              <input
                placeholder="Add Your Comment"
                className="border-2 p-2 mr-2 rounded-lg"
                onChange={(e) => setFormComment(e.target.value)}
                value={formComment}
              />
              <Button
                bgColor="blue"
                textColor="white"
                size="small"
                rounded="lg"
                type="submit"
              >
                Comment
              </Button>
            </form>
          </div>
          <div className="flex justify-center">
            {!isCommentValid && formComment.length > 0 ? (
              <p className="text-red-500">
                コメントは10文字以上入力してください
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* コメントの表示 */}
        <div className="flex flex-col items-center mt-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment key={comment.id} created_at={comment.created_at}>
                {comment.content}
              </Comment>
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
