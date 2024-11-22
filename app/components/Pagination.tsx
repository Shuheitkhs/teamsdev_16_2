"use client";

import MuiPagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useWideScreen from "../hooks/useWideScreen";

export default function Pagination() {
  // 画面サイズを取得するカスタムフック
  const isWideScreen = useWideScreen();
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
