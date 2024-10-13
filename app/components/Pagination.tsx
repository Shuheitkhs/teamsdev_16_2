"use client";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function CustomIcons() {
  return (
    <Stack spacing={15}>
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
                  <span>Previous Page</span>
                </div>
              ),
              next: ({ ...props }) => (
                <div className="flex items-center">
                  <span>Next Page</span>
                  <ArrowForwardIcon />
                </div>
              ),
            }}
          />
        )}
      />
    </Stack>
  );
}
