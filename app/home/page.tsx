"use client";

import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BlogCard from "../components/BlogCard";
import supabase from "@/lib/Supabase/Client";
import { useRouter } from "next/navigation";

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

  const [currentPage,setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const [totalPosts, setTotalPosts] = useState(0);

  const router = useRouter();

  // ページ変更時に呼ばれる関数
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/home?p=${page}`, undefined)
  };

  // 投稿データの取得
  useEffect(() => {
  const fetchPosts = async () => {
    const start = (currentPage - 1) * postsPerPage;
    const end = currentPage * postsPerPage - 1;
    
    const { data: postData, error: postError } = await supabase.from("posts")
    .select(`
      *,
      categories(*)
      `)
      .range(start,end)
      .order("updated_at",{ascending: false});
      
      if (postError) {
        console.error("postの取得でエラーが発生しました:", postError.message);
        setError(postError.message);
      } else if (postData) {
        setPosts(postData);
      }
      setIsLoading(false);
    };

    // 投稿の総数を取得
    const fetchTotalPosts = async() => {
      const {count, error} = await supabase
      .from("posts")
      .select("*",{count:"exact"});
      if(error) {
        console.log("投稿数の取得でエラーが発生しました:",error.message);
        setError(error.message);
      } else {
        setTotalPosts(count || 0);
      }
    };
    
    fetchPosts();
    fetchTotalPosts();
  }, [currentPage]);

  // ローディング中の場合にメッセージを表示
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // エラーが発生した場合にメッセージを表示
  if (error) {
    return <div>エラーが発生しました: {error}</div>
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

            // contentを100文字にスライスし、100文字を超える場合は「...」を追加
    const truncatedContent = post.content.slice(0, 100);
    const contentToDisplay = truncatedContent.length < post.content.length ? `${truncatedContent}...` : truncatedContent;

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
                    content={contentToDisplay}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
        <Pagination
        count={Math.ceil(totalPosts / postsPerPage)}
        page={currentPage}
        onPageChange={handlePageChange}
        />
      </main>
    </>
  );
}
