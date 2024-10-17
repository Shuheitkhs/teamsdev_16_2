"use client";

import MuiPagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect, useState } from "react";

export default function Pagination() {
  const [isWideScreen, setIsWideScreen] = useState(true);
  // 画面サイズに応じてDOM操作するuseEffect
  useEffect(() => {
    // 画面幅640以上でisWideScreenがtrueに
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 640);
    };
    // 初期サイズのチェック
    handleResize();
    // 画面幅の監視
    window.addEventListener("resize", handleResize);
    // クリーンアップ関数
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center">
      <Stack spacing={3}>
        <MuiPagination
          count={10}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              slots={{
                previous: ({ ...props }) => (
                  <div className="flex items-center">
                    <ArrowBackIcon />
                    {/* 画面幅640px以下の場合は文字が消える */}
                    {isWideScreen && <span>Previous Page</span>}{" "}
                  </div>
                ),
                next: ({ ...props }) => (
                  <div className="flex items-center">
                    {/* 画面幅640px以下の場合は文字が消える */}
                    {isWideScreen && <span>Next Page</span>}{" "}
                    <ArrowForwardIcon />
                  </div>
                ),
              }}
            />
          )}
        />
      </Stack>
    </div>
  );
}
