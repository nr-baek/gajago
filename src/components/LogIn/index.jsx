import React, { useCallback, useState } from 'react';
import useInput from '../../hooks/useInput';
import { StyledButton, SignUpButton, Message } from './styles';
import '../../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LogIn = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const auth = getAuth();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password);

        setLoading(false);
      } catch (error) {
        console.log(error);
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          setErrorMessage('아이디 혹은 비밀번호가 일치하지 않습니다.');
        } else {
          setErrorMessage(error.code);
        }

        setLoading(false);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    },
    [auth, email, password],
  );

  return (
    <>
      <form onSubmit={onSubmit}>
        <h1 className="login">로그인</h1>
        <label className="label">
          email <input type="email" autoComplete="off" value={email} onChange={onChangeEmail} />
        </label>
        <label className="label">
          password
          <input type="password" value={password} onChange={onChangePassword} />
        </label>
        <Message>
          {errorMessage && (
            <span className="error" title={errorMessage}>
              {errorMessage}
            </span>
          )}
        </Message>
        <StyledButton disabled={!(email && password) || loading}>LOGIN</StyledButton>
      </form>

      <SignUpButton>
        Don't have an account? <b>Sign up</b>
      </SignUpButton>
    </>
  );
};

export default LogIn;
