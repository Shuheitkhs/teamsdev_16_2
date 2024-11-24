"use client";

import Link from "next/link";
import Button from "../atom/Button";
import UserIcon from "./UserIcon";

const WideViewHeader = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link href="/home">
        <Button bgColor="black" size="small" textColor="white" rounded="full">
          Home
        </Button>
      </Link>
      <Link href="/write_view">
        <Button bgColor="black" size="small" textColor="white" rounded="full">
          Create
        </Button>
      </Link>
      <div className="relative">
        <UserIcon />
      </div>
    </div>
  );
};

export default WideViewHeader;
