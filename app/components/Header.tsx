import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <span>LOGO</span>
      <Link href="/home">
        <button>Home</button>
      </Link>
      <Link href="/write_view">
        <button>Create</button>
      </Link>
      <Link href="sign_in">
        <button>Sign In</button>
      </Link>
    </header>
  );
};

export default Header;
