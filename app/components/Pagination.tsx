import MuiPagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useWideScreen from "../hooks/useWideScreen";
import {  useEffect, useState } from "react";

interface PaginationProps {
  count: number;
  page: number;
  onPageChange: (value: number) => void;
}

export default function Pagination({count,page,onPageChange}:PaginationProps) {
  // 画面サイズを取得するカスタムフック
  const isWideScreen = useWideScreen();

  // ページ変更の処理
  const handlePageChange = (event: React.ChangeEvent<unknown>,value: number) => {
    onPageChange(value);
  }

  return (
    <div className="flex justify-center">
      <Stack spacing={3}>
        <MuiPagination
          count={count}
          page={page}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              slots={{
                previous: () => (
                  <div className="flex items-center">
                    <ArrowBackIcon />
                    {/* 画面幅640px以下の場合は文字が消える */}
                    {isWideScreen && <span>Previous Page</span>}{" "}
                  </div>
                ),
                next: () => (
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
