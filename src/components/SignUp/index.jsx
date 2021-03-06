import React, { useCallback, useState } from 'react';
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

  const [clickedLogin, setClickedLogin] = useState(false);

  const navigate = useNavigate();

  const onClickLogin = useCallback(() => {
    setClickedLogin(true);
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
          publicReviewCount: 0,
        });
        initState();
        setSignUpSuccess(true);

        setLoading(false);
        setTimeout(() => {
          setSignUpSuccess(false);
          setClickedLogin(true);
          signOut(auth);
        }, 1500);
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setSignUpError('?????? ????????? ??????????????????.');
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
    <div className={'showSignUp ' + (clickedLogin ? 'hideSignUp' : '')}>
      <div className="goToLogin" onClick={onClickLogin}>
        <ArrowLeftOutlined style={{ marginRight: '5px' }} />
        Login
      </div>
      <form onSubmit={onSubmit}>
        <h1 className="signUp">????????????</h1>
        <label className="signUpLabel">
          email{' '}
          <input
            type="email"
            placeholder="????????? ???????????? ???????????????."
            autoComplete="off"
            value={email}
            onChange={onChangeEmail}
          />
        </label>
        <label className="signUpLabel">
          nickname{' '}
          <input
            type="text"
            autoComplete="off"
            placeholder="18??? ????????? ???????????????."
            maxLength={18}
            value={nickname}
            onChange={onChangeNickname}
          />
        </label>
        <label className="signUpLabel">
          password
          <input type="password" value={password} placeholder="6??? ???????????? ???????????????." onChange={onChangePassword} />
        </label>
        <label className="signUpLabel">
          password Confirm
          <input
            type="password"
            value={passwordConfirm}
            placeholder="??????????????? ???????????? ???????????????."
            onChange={onChangePasswordConfirm}
          />
        </label>
        <Message>
          {(pwMinLengthError && <span className="error">??????????????? 6??? ??????????????? ?????????.</span>) ||
            (mismatchError && <span className="error">??????????????? ???????????? ????????????.</span>) ||
            (signUpError && (
              <span className="error" title={signUpError}>
                {signUpError}
              </span>
            )) ||
            (signUpSuccess && <span className="success">[???????????? ??????] ????????? ???????????? ???????????????.</span>)}
        </Message>
        <StyledButton disabled={mismatchError || isEmpty() || loading || pwMinLengthError}>SIGN UP</StyledButton>
      </form>
    </div>
  );
};

export default SignUp;
