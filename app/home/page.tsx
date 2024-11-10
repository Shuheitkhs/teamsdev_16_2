'use client';

import styles from "./page.module.css";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import Link from "next/link";
import BlogCard from "../BlogCard";
import supabase from "@/lib/Supabase/Client";

// Post型の定義
interface Post {
  id: string;
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
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [userName, setUserName] = useState<string | null>(null); 

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

  useEffect(() => {
    const fetchImage = async (postId: string, imagePath: string) => {
      try {
        const { data, error } = await supabase
          .storage
          .from("photo_test") // バケット名
          .download(imagePath); // 画像のパス

        if (error) {
          console.error("画像の取得エラー:", error.message);
          return;
        }
        if (!data) {
          console.error("画像データが null または undefined です");
          return;
        }

        const objectUrl = URL.createObjectURL(data);
        setImageUrls((prevState) => ({
          ...prevState,
          [postId]: objectUrl,
        }));
      } catch (err) {
        console.error("エラー:", err);
      }
    };

    posts.forEach((post) => {
      if (post.image_path) {
        fetchImage(post.id, post.image_path);
      }
    });
  }, [posts]);  // posts が更新されたときに画像を再取得

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error:{error}</p>;

  return (
    <>
      <Header />
      <main>
        <input type="text" />
        <button>Search button</button>
        
        <ul className="flex border">
          {/* BlogCardコンポーネントを使いリスト表示 */}
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog_view/${post.id}`}>
                <BlogCard
                  src={imageUrls[post.id] || ""}
                  alt={post.title}
                  title={post.title}
                  category={post.categories ? post.categories.name : "Uncategorized"}
                  author={post.user && post.user.name ? post.user.name : "Unknown Author"}
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
