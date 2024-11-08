'use client';

import styles from "./page.module.css";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BlogCard from "../BlogCard";
import supabase from "@/lib/Supabase/Client";
import { Session } from "@supabase/supabase-js";
import { tableFetch } from "../components/tableFecth";

// Post型の定義
interface Post {
  id: string;
  title: string;
  image_path: string;
  category: string;
  author: string ;
  created_at: string;
  updated_at:string;
  content: string;

}

export default function Home() {
  const [posts,setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // データを取得する
  useEffect(() => {
    async function loadPosts() {
      try {
        setIsLoading(true);
        const fetchedPosts = await tableFetch();
        if (fetchedPosts) {
          setPosts(fetchedPosts)
        } else {
          setError("データの取得に失敗しました。")
        }
      } catch(err) {
        setError("エラーが発生しました。" + (err instanceof Error ? err.message : String(err)))
      } finally {
        setIsLoading(false)
      }
    }
    loadPosts();
  },[]);

  if(isLoading) return <p>Loading...</p>
  if(error) return <p>Error:{error}</p>
  
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
              src={post.image_path}
              alt={post.title}
              title={post.title}
              category={post.category}
              
              createdAt={new Date (post.created_at).toLocaleDateString()}
              content={post.content}
              />
              </Link>
              </li>

          ))}
          {/* <div>Thumbnail</div>
          <div>Post Title</div>
          <div>Category</div>
          <div>Author Name</div>
          <div>Elapsed TIme</div>
          <div>Contents</div> */}
          <div>
            {posts.map((post) => (
              <p>{post.title}</p>
          ))
        }
              </div>
        </ul>
        <Pagination />
      </main>
    </>
  );
}

