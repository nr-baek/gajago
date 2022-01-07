import React from "react";
import { StyledButton, SignUpButton } from "./styles";

const LogIn = () => {
  return (
    <>
      <form>
        <h1 className="login">로그인</h1>
        <label className="label">
          email <input name="email" autoComplete="off" required />
        </label>
        <label className="label">
          password
          <input name="password" type="password" required />
        </label>
        <StyledButton>LOGIN</StyledButton>
      </form>
      <SignUpButton>
        Don't have an account? <b>Sign up</b>
      </SignUpButton>
    </>
  );
};

export default LogIn;
