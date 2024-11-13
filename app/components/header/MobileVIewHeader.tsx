"use client";

import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import Button from "../atom/Button";
import UserIcon from "./UserIcon";
const mobileVIewHeader = () => {
  // ハンバーガーメニューの表示/非表示を管理するstate
  const [isToggle, setIsToggle] = useState(false);
  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  return (
    <div className="flex items-center space-x-4">
      {isToggle === false ? (
        <button onClick={handleToggle}>
          <MenuIcon fontSize="large" />
        </button>
      ) : (
        <button onClick={handleToggle} className="z-10">
          <CloseIcon fontSize="large" />
        </button>
      )}
      {isToggle && (
        <div className="flex flex-col items-center rounded-lg p-3 z-0 absolute top-14 right-0 bg-gray-400">
          <Link href="/">
            <Button
              bgColor="black"
              size="small"
              textColor="white"
              rounded="full"
            >
              Home
            </Button>
          </Link>
          <Link href="/write_view">
            <Button
              bgColor="black"
              size="small"
              textColor="white"
              rounded="full"
            >
              Create
            </Button>
          </Link>
          <UserIcon />
        </div>
      )}
    </div>
  );
};

export default mobileVIewHeader;
