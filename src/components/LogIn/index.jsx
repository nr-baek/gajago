import React, { useCallback, useState } from 'react';
import useInput from '../../hooks/useInput';
import { StyledButton, SignUpButton, Message } from './styles';
import '../../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [clickedSignUp, setClickedSignUp] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  const onClickSignUp = useCallback(() => {
    setClickedSignUp(true);
    setTimeout(() => {
      navigate('/signup');
    }, 200);
  }, [navigate]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log(error);
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          setErrorMessage('아이디 혹은 비밀번호가 일치하지 않습니다.');
        } else {
          setErrorMessage(error.code);
        }

        setLoading(false);
      }
    },
    [auth, email, password],
  );

  return (
    <div className={'showLogIn ' + (clickedSignUp ? 'hideLogIn' : '')}>
      <form onSubmit={onSubmit}>
        <h1 className="login">로그인</h1>
        <label className="loginLabel">
          email <input type="email" autoComplete="off" value={email} onChange={onChangeEmail} />
        </label>
        <label className="loginLabel">
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

      <SignUpButton onClick={onClickSignUp}>
        Don't have an account? <b>Sign up</b>
      </SignUpButton>
    </div>
  );
};

export default LogIn;
