import React, { useCallback, useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import { Message, StyledButton } from '../LogIn/styles';
import '../../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import md5 from 'md5';
import { getDatabase, ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const SignUp = () => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [mismatchError, setMismatchError] = useState(false);
  const [pwMinLengthError, setPwMinLengthError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const [toLogin, setToLogin] = useState(false);

  const navigate = useNavigate();

  const onClickLogin = useCallback(() => {
    setToLogin(true);
    setTimeout(() => {
      navigate('/login');
    }, 200);
  }, [navigate]);

  const isEmpty = useCallback(() => {
    return !(email && nickname.trim() && password && passwordConfirm);
  }, [email, nickname, password, passwordConfirm]);

  const initState = useCallback(() => {
    setEmail('');
    setNickname('');
    setPassword('');
    setPasswordConfirm('');
  }, [setEmail, setNickname]);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordConfirm);
      if (e.target.value.length < 6) {
        setPwMinLengthError(true);
      } else {
        setPwMinLengthError(false);
      }
    },
    [passwordConfirm],
  );

  const onChangePasswordConfirm = useCallback(
    (e) => {
      setPasswordConfirm(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );
  useEffect(() => {
    return () => {};
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);
        const auth = getAuth();
        const createdUser = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(auth.currentUser, {
          displayName: nickname,
          photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`,
        });

        set(ref(getDatabase(), `userList/${createdUser.user.uid}`), {
          nickname: createdUser.user.displayName,
          image: createdUser.user.photoURL,
          tripCount: 0,
        });
        initState();
        setSignUpSuccess(true);

        setLoading(false);
        setTimeout(() => {
          setSignUpSuccess(false);
          setToLogin(true);
          signOut(auth);
        }, 1200);
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setSignUpError('이미 가입된 이메일입니다.');
        } else {
          setSignUpError(error.code);
        }
        setLoading(false);
        setTimeout(() => {
          setSignUpError('');
        }, 5000);
      }
    },
    [email, nickname, password, initState],
  );

  return (
    <div className={'showSignUp ' + (toLogin ? 'noneSignUp' : '')}>
      <div className="goToLogin" onClick={onClickLogin}>
        <ArrowLeftOutlined style={{ marginRight: '5px' }} />
        Login
      </div>
      <form onSubmit={onSubmit}>
        <h1 className="signUp">회원가입</h1>
        <label className="signUpLabel">
          Email{' '}
          <input
            type="email"
            placeholder="이메일 형식으로 입력하세요."
            autoComplete="off"
            value={email}
            onChange={onChangeEmail}
          />
        </label>
        <label className="signUpLabel">
          Nickname{' '}
          <input
            type="text"
            autoComplete="off"
            placeholder="18자 이하로 입력하세요."
            maxLength={18}
            value={nickname}
            onChange={onChangeNickname}
          />
        </label>
        <label className="signUpLabel">
          Password
          <input type="password" value={password} placeholder="6자 이상으로 입력하세요." onChange={onChangePassword} />
        </label>
        <label className="signUpLabel">
          Password Confirm
          <input
            type="password"
            value={passwordConfirm}
            placeholder="비밀번호와 일치하게 입력하세요."
            onChange={onChangePasswordConfirm}
          />
        </label>
        <Message>
          {(pwMinLengthError && <span className="error">비밀번호는 6자 이상이어야 합니다.</span>) ||
            (mismatchError && <span className="error">비밀번호가 일치하지 않습니다.</span>) ||
            (signUpError && (
              <span className="error" title={signUpError}>
                {signUpError}
              </span>
            )) ||
            (signUpSuccess && <span className="success">[회원가입 완료] 로그인 화면으로 이동합니다.</span>)}
        </Message>
        <StyledButton disabled={mismatchError || isEmpty() || loading || pwMinLengthError}>SIGN UP</StyledButton>
      </form>
    </div>
  );
};

export default SignUp;
