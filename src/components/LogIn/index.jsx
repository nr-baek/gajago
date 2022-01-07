import React, { useCallback } from 'react';
import useInput from '../../hooks/useInput';
import { StyledButton, SignUpButton, ErrorMessage } from './styles';

const LogIn = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(email, password);
    },
    [email, password],
  );

  return (
    <>
      <form onSubmit={onSubmit}>
        <h1 className="login">로그인</h1>
        <label className="label">
          email <input type="email" name="email" autoComplete="off" value={email} onChange={onChangeEmail} />
        </label>
        <label className="label">
          password
          <input name="password" type="password" value={password} onChange={onChangePassword} />
        </label>
        <ErrorMessage>아이디 또는 비밀번호가 잘못 입력 되었습니다.ㅇㄹㄴ ㅇㅇㅇ</ErrorMessage>
        <StyledButton>LOGIN</StyledButton>
      </form>

      <SignUpButton>
        Don't have an account? <b>Sign up</b>
      </SignUpButton>
    </>
  );
};

export default LogIn;
