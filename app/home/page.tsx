"use client";

import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BlogCard from "../components/BlogCard";
import supabase from "@/lib/Supabase/Client";

// Post型の定義
interface Post {
  id: string;
  user_id: string;
  title: string;
  image_path: string;
  scr: string;
  category: string;
  author: string;
  created_at: string;
  updated_at: string;
  content: string;
  categories: {
    id: string;
    name: string;
  };
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // データを取得する
  useEffect(() => {
    const fetchPosts = async () => {
      const { data: postData, error: postError } = await supabase.from("posts")
        .select(`
        *,
        categories(*)
        `);

      if (postError) {
        console.error("postの取得でエラーが発生しました:", postError.message);
        setError(postError.message);
      } else if (postData) {
        setPosts(postData);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  // ローディング中の場合にメッセージを表示
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-10">
          {/* BlogCardコンポーネントを使いリスト表示 */}
          {posts.map((post) => {
            const dateToShow = post.updated_at
              ? post.updated_at
              : post.created_at;
            const displayDate = new Date(dateToShow).toLocaleDateString();

            return (
              <li key={post.id}>
                <Link href={`/blog_view/${post.id}`}>
                  <BlogCard
                    src={post.image_path || "/default.jpg"}
                    title={post.title}
                    category={
                      post.categories ? post.categories.name : "Uncategorized"
                    }
                    author={post.user_id || "Unknown Author"}
                    createdAt={displayDate}
                    content={post.content}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
        <Pagination />
      </main>
    </>
  );
}
