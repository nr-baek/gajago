import React from "react";
import { SignUpButton } from "./styles";

const SignUp = () => {
  return (
    <>
      <form>
        <h1 className="signUp">Sign Up</h1>
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
        <SignUpButton>Sign up</SignUpButton>
      </form>
    </>
  );
};

export default SignUp;
