import styled from '@emotion/styled';
import authBg from '../../assets/images/bgImg.jpg';

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

  input {
    width: 100%;
    font-size: 1rem;
    padding: 0.7rem;
    border: 2px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  form {
    overflow: hidden;
  }

  .label {
    display: block;
    color: #4e4d4d;
    margin-top: 1rem;
  }
`;
