import styled from '@emotion/styled';

export const Background = styled.div`
  background: linear-gradient(20deg, #ffffff, #e0d0ff, #fffdff, #f1dcff, #ffffff, #e0d0ff);
  height: 100vh;
  width: 100vw;
  padding: 30px 110px;
`;

export const Container = styled.div`
  background-color: #5e5fb3;
  border-radius: 30px;
  padding: 10px;
  width: 100%;
  height: 100%;
  min-height: 600px;
  display: flex;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.5);

  .profile {
    margin-bottom: 20px;
    img {
      width: 120px;
      height: 120px;
      background-color: #ebd3ff;
      border-radius: 50%;
      margin: 20px auto;
    }

    .nickname {
      color: #ffffff;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      vertical-align: center;
    }
  }
`;

export const LeftBar = styled.div`
  width: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  li {
    color: #fff;
    width: 100%;
    margin: 20px 0;
    a {
      text-decoration-line: none;
      line-height: 23px;
    }
  }

  .logoutBtn {
    top: 80px;
    &:hover {
      color: #fff;
      cursor: pointer;
    }
  }
`;

export const LeftBarBtn = styled.div`
  font-size: 20px;
  color: #cecece;
  position: relative;
  display: flex;
  align-items: center;
  width: 150px;
  padding: 10px 0;
  &:hover {
    color: #fff;
  }

  &.active {
    color: #fff;

    div {
      position: absolute;
      left: -30px;
      width: 10px;
      height: 43px;
      border-radius: 0 5px 5px 0;
      background-color: #fff;
    }
  }
  span {
    margin-left: 20px;
    }
  }
`;

export const MainContent = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
  border-radius: 25px;
`;
