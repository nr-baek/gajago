import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import authBg from '../../assets/images/bgImg.jpg';

const showToRightAni = keyframes`
  0% {
    opacity: 0;
    transform: translate(-30px, 0);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

const showToLeftAni = keyframes`
  0% {
    opacity: 0;
    transform: translate(30px, 0);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;
const disappearToRightAni = keyframes`
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  100% {
    opacity: 0;
    transform: translate(30px, 0);
  }
`;
const disappearToLeftAni = keyframes`
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  100% {
    opacity: 0;
    transform: translate(-30px, 0);
  }
`;

export const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(20deg, #e9b7b7, #e7a8a8, #d8b8f5, #b8cdf5, #bfe6ff, #ffebd9);
  background-image: url(${authBg});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TemplateBox = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  background: inherit;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  position: relative;
`;

export const TemplateLeftBox = styled.div`
  width: 400px;
  background: linear-gradient(45deg, #8a60fde2, #ac9dfff0);
  background-size: cover;
  padding: 2rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;

  .hiMsg {
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    margin: 10px 0;
  }
  .goMsg {
    font-size: 1.1rem;
  }
  .gajago {
    margin-top: 150px;
    font-size: 15px;
  }
  .logo {
    font-size: 8rem;
    margin: 2rem;
  }
`;

export const TemplateRight = styled.div`
  width: 400px;
  height: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3rem;

  .showLogIn {
    animation: ${showToRightAni} 0.2s linear normal forwards;
  }
  .showLogIn.noneSignIn {
    animation: ${disappearToLeftAni} 0.2s linear normal forwards;
  }
  .showSignUp {
    animation: ${showToLeftAni} 0.2s linear normal forwards;
  }
  .showSignUp.noneSignUp {
    animation: ${disappearToRightAni} 0.2s linear normal forwards;
  }

  h1 {
    text-align: center;
    font-size: 1.5rem;
    color: #444;
  }

  h1.login {
    margin: 0 0 35px 0;
  }

  h1.signUp {
    margin: 0;
  }

  form {
    overflow: hidden;

    input {
      width: 100%;
      font-size: 1rem;
      padding: 0.7rem;
      border: 2px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .loginLabel {
      display: block;
      color: #4e4d4d;
      margin-top: 1rem;
    }

    .signUpLabel {
      display: block;
      color: #4e4d4d;
      margin-top: 6px;
    }
  }

  .goToLogin {
    position: absolute;
    padding-right: 5px;
    top: -20px;
    left: -10px;
    font-size: 15px;
    color: #650df1;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      text-shadow: 1px 3px 6px rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid #650df1;
    }
  }
`;
