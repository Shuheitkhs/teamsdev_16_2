"use client";

import React from "react";
import Button from "../components/atom/Button";

const DemoPlayPage = () => {
  const handleOnClick = () => {
    alert("onClick!");
  };

  return (
    <>
      <div className="flex-col justify-center">
        <div>
          <Button
            size="small"
            textColor="white"
            bgColor="blue"
            rounded="lg"
            onClick={handleOnClick}
          >
            テスト1
          </Button>
        </div>
        <div>
          <Button
            size="medium"
            textColor="black"
            bgColor="red"
            rounded="full"
            onClick={handleOnClick}
          >
            hogehoge
          </Button>
        </div>
        <div>
          <Button
            size="large"
            textColor="black"
            bgColor="gray"
            rounded="full"
            onClick={handleOnClick}
          >
            テスト3
          </Button>
        </div>

        <Button
          textColor="white"
          bgColor="black"
          rounded="lg"
          onClick={handleOnClick}
        >
          テスト4
        </Button>
        <Button
          textColor="white"
          bgColor="gray"
          rounded="full"
          className="px-10"
        >
          最終テスト
        </Button>
      </div>
    </>
  );
};

export default DemoPlayPage;
