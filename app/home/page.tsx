'use client';

import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BlogCard from "../BlogCard";
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
  user: {
    id: string;
    name: string;
  };
}


// 認証情報（ユーザー情報）を取得
const getAuthUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();  // 非同期でユーザー情報を取得

    if (error || !data) {
      throw new Error('ユーザーが認証されていません');
    }

    return data;  
  } catch (error) {
    console.error('認証エラー:', error);
    throw new Error('認証エラーが発生しました');
  }
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   const [userName, setUserName] = useState<string | null>(null); 

  // postsとcategoriesのデータをjoinして取得
const tableFetch = async () => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        categories(*)
      `);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('データの取得に失敗しました:', error);
    throw new Error('データの取得に失敗しました');
  }
};


  // データを取得する
  useEffect(() => {
    async function loadPosts() {
      try {
        setIsLoading(true);
        const fetchedPosts = await tableFetch();
        if (fetchedPosts) {
          console.log(fetchedPosts);
          setPosts(fetchedPosts);
        } else {
          setError("データの取得に失敗しました。");
        }
      } catch (err) {
        setError("エラーが発生しました。" + (err instanceof Error ? err.message : String(err)));
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);


  // サインインしているユーザー情報を取得
  useEffect(() => {
    async function fetchUserEmail() {
      try {
        const user = await getAuthUser();
        setUserName(user.name); 
      } catch (err) {
        // setError("ユーザー情報の取得に失敗しました。" + (err instanceof Error ? err.message : String(err)));
      }
    }

    fetchUserEmail();
  }, []);

  return (
    <>

      <main>
        <input type="text" />
        <button>Search button</button>
        
        <ul className="flex border">
          {/* BlogCardコンポーネントを使いリスト表示 */}
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog_view/${post.id}`}>
                <BlogCard
                  src={post?.image_path ? `/${post.image_path}` : "/default.png"}
                  alt={post.title}
                  title={post.title}
                  category={post.categories ? post.categories.name : "Uncategorized"}
                  author={post.user_id || "Unknown Author"}
                  createdAt={new Date(post.created_at).toLocaleDateString()}
                  content={post.content}
                />
              </Link>
            </li>
          ))}
        </ul>
        <Pagination />
      </main>
    </>
  );
}
