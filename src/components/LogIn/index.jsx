import React from "react";
import { SignInButton, SignUpButton } from "./styles";

const LogIn = () => {
  return (
    <>
      <form>
        <h1 className="login">Login</h1>
        <label className="label">
          email <input name="email" autoComplete="off" required />
        </label>
        <label className="label">
          password
          <input name="password" type="password" required />
        </label>
        <SignInButton>LOGIN</SignInButton>
      </form>
      <SignUpButton>
        Don't have an account? <b>Sign up</b>
      </SignUpButton>
    </>
  );
};

export default LogIn;
