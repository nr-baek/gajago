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
    margin-bottom: 10px;
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
      &:hover {
        text-shadow: 0 0 3px #ffffff;
      }
    }
  }
`;

export const LeftBar = styled.div`
  width: 200px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: 10px;
  li {
    color: #fff;
    width: 100%;
    margin: 20px 0;
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
  cursor: pointer;
  &:hover {
    color: #fff;
    text-shadow: 0 0 4px #ffffff;
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
  /* background-color: #fff; */
  background: radial-gradient(#f5ecfd 15%, transparent 16%) 0 0, radial-gradient(#eeeeff 15%, transparent 16%) 8px 8px,
    radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 0 1px,
    radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 8px 9px;
  background-color: #f9f7ff;
  background-size: 16px 16px;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  overflow: hidden;
`;
