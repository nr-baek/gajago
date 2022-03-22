import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const StoryCompWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: auto;
`;

export const TravelerList = styled.div`
  padding: 0 30px;
  h2 {
    font-size: 20px;
    color: #6840e9;
    font-weight: 700;
    padding: 20px 0 10px 0;
    .trophy {
      line-height: 20px;
      vertical-align: top;
      margin-left: 5px;
    }
  }
  section {
    height: 153px;
    ul {
      display: flex;
      margin: 2px;
      li {
        div {
          width: 100px;
          padding-top: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          img {
            width: 80px;
            height: 80px;
            border: 4px solid #fff;
            border-radius: 50%;
            outline: 2px solid #b6a0ff;
            background-color: #ebd3ff;
            object-fit: cover;
            cursor: pointer;
          }
          div {
            width: 100%;
            overflow: hidden;
            text-align: center;
            padding-top: 5px;
            display: flex;
            flex-direction: column;

            .nickname {
              font-size: 15px;
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              cursor: pointer;
            }
            .tripCount {
              font-size: 12px;
              color: #5802c8;
            }
          }
        }
      }
    }
  }
`;

export const StyledContainer = styled.div`
  .top {
    width: 100%;
    padding-right: 10px;
    position: sticky;
    z-index: 99;
    top: 0;

    .wrapper {
      background: radial-gradient(#f5ecfd 15%, transparent 16%) 0 0,
        radial-gradient(#eeeeff 15%, transparent 16%) 8px 8px,
        radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 0 1px,
        radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 8px 9px;
      background-color: #f9f7ff;
      background-size: 16px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 30px;
      h2 {
        font-size: 21px;
        color: #6840e9;
        font-weight: 700;
        padding: 10px 0;
        cursor: pointer;
      }
      .searchBox {
        border-radius: 5px;
        border: 2px solid #7d5bee;
        background-color: #fff;
        width: 250px;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        padding: 0 7px;
        margin-left: auto;
        margin-right: 30px;
        position: relative;
        input {
          width: 220px;
          height: 35px;
          line-height: 23px;
          font-size: 15px;
          border: 0;
          padding-left: 3px;
          padding-right: 20px;
          outline: none;
        }
        .remove {
          color: #666;
          position: absolute;
          width: 35px;
          height: 35px;
          right: -1px;
          line-height: 30px;
        }
        .resultList {
          width: 252px;
          position: absolute;
          top: 38px;
          left: -2px;
          background-color: #fff;
          border: 2px solid #a1a1a1;
          border-top: 0;
          border-bottom-left-radius: 7px;
          border-bottom-right-radius: 7px;
          ul {
            padding-top: 5px;
            p {
              color: #666;
              padding: 0 7px;
            }
            li {
              padding: 4px;
              margin-top: 2px;
              border-radius: 5px;
              display: flex;
              align-items: center;
              overflow: hidden;
              img {
                width: 37px;
                height: 37px;
                border-radius: 50%;
                margin-right: 5px;
                object-fit: cover;
              }

              span {
                width: 200px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

              &.select,
              &:hover {
                background-color: #efefef;
              }
            }
          }
          .noResultMsg {
            padding: 10px 5px;
            color: #666;
          }
        }

        &.focused {
          outline: 2px solid #8065d8;
        }
      }
      .sort {
        display: flex;
        justify-content: space-between;
        width: 115px;
        color: #999999;
        span {
          cursor: pointer;
        }
        .active {
          color: #444;
          position: relative;
          &::after {
            content: '';
            height: 5px;
            width: 5px;
            background-color: black;
            border-radius: 50%;
            position: absolute;
            left: 45%;
            bottom: -7px;
          }
        }
      }
    }
    .mask {
      width: 100%;
      height: 25px;
      background: linear-gradient(to top, transparent, #f9f7ff);
    }
  }

  #fetchMore {
    height: 1px;
    display: block;
  }

  #fetchMore.loading {
    display: none;
  }
`;

export const ColumnsWrapper = styled.div`
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  .storiesColumn {
    width: 32.5%;
    display: flex;
    flex-direction: column;
    .nara {
      background-color: pink;
    }
  }
`;

export const Card = styled.div`
  color: #444;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  overflow: hidden;
  transition: all 0.2s ease;
  position: relative;
  top: 0;
  left: 0;
  .photo {
    display: block;
    width: 100%;
    min-height: 100px;
    background-color: ${(props) => props.colorCode};
  }

  .cardBottom {
    margin: 7px 0 5px 0;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .userInfo {
      display: flex;
      align-items: center;
      width: 60%;
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: #ebd3ff;
        object-fit: cover;
      }
      span {
        display: inline-block;
        width: 70%;
        margin-left: 7px;
        font-size: 15px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .time {
      font-size: 10px;
      color: #555;
    }
    .likes {
      display: flex;
      align-items: center;
      .heart {
        padding-top: 2px;
        margin-right: 5px;
        color: #d40e07;
      }
    }
  }

  &:hover {
    box-shadow: 0px 5px 13px rgba(0, 0, 0, 0.5);
    top: -4px;
    left: 2px;
  }
`;

const clickEffect = keyframes`
  0% {
    opacity: 0%;
    transform: scale(1);
  }
  80% {
    transform: scale(1.7);
    opacity: 100%;
  }
  100% {
    transform: scale(1);
  }
`;

export const StyledModalContent = styled.div`
  padding-left: 10px;
  height: 600px;
  max-height: 600px;
  .contentHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    top: 0;
    position: sticky;
    background-color: #fff;
    background: linear-gradient(to bottom, #fff, #fff 40%, transparent);
    .userInfo {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
      span {
        margin-left: 10px;
        font-size: 20px;
        font-weight: 700;
      }
      .time {
        font-weight: 400;
        color: #555;
        font-size: 13px;
      }
    }
    .likes {
      padding: 5px;
      margin-right: 10px;
      display: flex;
      align-items: center;
      font-size: 20px;
      .heart {
        margin: 0 5px;
        color: red;
        &.effect {
          animation: ${clickEffect} 0.3s ease;
        }
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
  .travelInfo {
    padding-left: 10px;
    color: #555;
    font-size: 14px;
    p {
      display: flex;
      align-items: center;
      margin-top: 10px;
      span {
        font-weight: 700;
      }
    }
  }
  .photoAndDesc {
    margin: 20px;
    .photo {
      background-color: green;
      border-radius: 10px;
      display: block;
      margin: 0 auto;
      box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.3);
      max-width: 700px;
      height: 430px;
      object-fit: cover;
    }
    p {
      padding-top: 10px;
      text-align: center;
      color: #555;
      font-size: 13px;
      font-weight: 700;
    }
  }
  .review {
    border-radius: 10px;
    border: 2px solid #9a74cc;
    padding: 10px 15px;
    margin: 10px 10px 0 0;
    font-family: 'Gaegu', cursive;
    color: #444;
    white-space: pre-line;
    line-height: 30px;
    font-size: 20px;
    text-decoration: underline dotted #bfa8ff;
    text-underline-position: under;
  }
`;

export const NoPosts = styled.div`
  color: #4f25db;
  font-size: 23px;
  font-family: 'Gaegu', cursive;
  text-align: center;
`;
