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
            Small
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
            medium
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
            large
          </Button>
        </div>

        <Button
          textColor="white"
          bgColor="black"
          rounded="lg"
          onClick={handleOnClick}
        >
          テスト
        </Button>
      </div>
    </>
  );
};

export default DemoPlayPage;
