"use client";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect, useState } from "react";

export default function CustomIcons() {
  const [isWideScreen, setIsWideScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center">
      <Stack spacing={3}>
        <Pagination
          count={10}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              slots={{
                previous: ({ ...props }) => (
                  <div className="flex items-center">
                    <ArrowBackIcon />
                    {isWideScreen && <span>Previous Page</span>}
                  </div>
                ),
                next: ({ ...props }) => (
                  <div className="flex items-center">
                    {isWideScreen && <span>Next Page</span>}
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
