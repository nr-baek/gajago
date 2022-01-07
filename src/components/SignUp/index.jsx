import React from "react";
import { StyledButton } from "../LogIn/styles";

const SignUp = () => {
  return (
    <>
      <form>
        <h1 className="signUp">회원가입</h1>
        <label className="label">
          Email <input name="email" autoComplete="off" required />
        </label>
        <label className="label">
          Name <input name="nickname" autoComplete="off" required />
        </label>
        <label className="label">
          Password
          <input name="password" type="password" required />
        </label>
        <label className="label">
          Password Confirm
          <input name="passwordConfirm" type="password" required />
        </label>
        <StyledButton>SIGN UP</StyledButton>
      </form>
    </>
  );
};

export default SignUp;
