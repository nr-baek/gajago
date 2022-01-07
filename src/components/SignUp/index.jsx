import React, { useCallback, useState } from 'react';
import { ErrorMessage, StyledButton } from '../LogIn/styles';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [mismatchError, setMismatchError] = useState(true);
  const [emailError, setEmailError] = useState(true);

  const checkEmail = (email) => {
    var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return !reg.test(email);
  };

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
    setEmailError(checkEmail(e.target.value));
  }, []);

  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordConfirm);
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
    (e) => {
      e.preventDefault();
      if (!nickname || !nickname.trim()) {
        return;
      }

      const emptyCheckOk = email && nickname && password && passwordConfirm;
      if (emptyCheckOk && !mismatchError) {
        console.log('서버 전송~', email, nickname, password);
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
          (emailError && <span>이메일 형식이 잘못되었습니다.</span>) ||
          (mismatchError && <span>비밀번호가 일치하지 않습니다.</span>)}
      </ErrorMessage>
      <StyledButton>SIGN UP</StyledButton>
    </form>
  );
};

export default SignUp;
