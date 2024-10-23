import React from "react";

const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold underline py-5">Sign In</h1>
      <form className="flex flex-col items-center">
        <div>
          <p className="text-gray-800">Email</p>
          <input
            type="email"
            placeholder="Enter your name"
            className="bg-gray-200 shadow border-2 border-gray-400 appearance-none rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="py-5">
          <p className="text-gray-800">Password</p>
          <input
            type="password"
            placeholder="Enter your name"
            className="bg-gray-200 shadow border-2 border-gray-400 appearance-none rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button className="flex h-9 items-center justify-center rounded-full bg-gradient-to-b from-blue-400 from-50% to-blue-500 to-50% px-3 text-blue-50 hover:from-blue-500 hover:to-blue-600 active:from-blue-600 active:to-blue-700 mt-4">
          Sign In
        </button>
      </form>
      <div className="flex items-center mt-4">
        <span>Don&apos;t have an account?</span>
        <span className="text-blue-400 ml-1"> sign Up</span>
      </div>
    </div>
  );
};

export default SignIn;
