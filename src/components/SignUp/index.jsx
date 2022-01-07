import React, { useCallback, useState } from 'react';
import useInput from '../../hooks/useInput';
import { ErrorMessage, StyledButton } from '../LogIn/styles';
import '../../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import md5 from 'md5';

const SignUp = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [mismatchError, setMismatchError] = useState(true);
  const [pwMinLengthError, setPwMinLengthError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [loading, setLoading] = useState(false);

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
      const emptyCheckOk = email && nickname.trim() && password && passwordConfirm;
      if (!emptyCheckOk || mismatchError) {
        return;
      }
      try {
        setLoading(true);
        const auth = getAuth();
        const createdUser = await createUserWithEmailAndPassword(auth, email, password);
        console.log(createdUser);

        await updateProfile(auth.currentUser, {
          displayName: nickname,
          photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`,
        });

        setLoading(false);
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
    [email, nickname, password, passwordConfirm, mismatchError],
  );

  return (
    <form onSubmit={onSubmit}>
      <h1 className="signUp">회원가입</h1>
      <label className="label">
        Email <input type="email" name="email" autoComplete="off" value={email} onChange={onChangeEmail} />
      </label>
      <label className="label">
        Nickname <input type="text" name="nickname" autoComplete="off" value={nickname} onChange={onChangeNickname} />
      </label>
      <label className="label">
        Password
        <input name="password" type="password" value={password} onChange={onChangePassword} />
      </label>
      <label className="label">
        Password Confirm
        <input name="passwordConfirm" type="password" value={passwordConfirm} onChange={onChangePasswordConfirm} />
      </label>
      <ErrorMessage>
        {(!(email && nickname && password && passwordConfirm) && <span>빈칸을 모두 입력해주세요.</span>) ||
          (pwMinLengthError && <span>비밀번호는 6자 이상이어야 합니다.</span>) ||
          (mismatchError && <span>비밀번호가 일치하지 않습니다.</span>) ||
          (signUpError && <span title={signUpError}>{signUpError}</span>)}
      </ErrorMessage>
      <StyledButton disabled={loading}>SIGN UP</StyledButton>
    </form>
  );
};

export default SignUp;
