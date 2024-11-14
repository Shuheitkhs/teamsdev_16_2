import React from "react";

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <div>
          <p>Name</p>
          <input type="text" />
        </div>
        <div>
          <p>Email</p>
          <input type="email" />
        </div>
        <div>
          <p>PassWord</p>
          <input type="password" />
        </div>
        <button>Sign Up</button>
      </form>
      <span>Already have an account?</span>
      <span> sign in</span>
    </div>
  );
};

export default SignUp;
