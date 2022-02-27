import styled from '@emotion/styled';

export const StoryCompWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 30px;
  overflow: auto;
`;

export const TravelerList = styled.div`
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
    height: 140px;
    ul {
      display: flex;
      margin: 2px;
      li {
        width: 100px;
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .crown {
          position: absolute;
          font-size: 30px;
          top: -5px;
          left: 56px;
          transform: rotateZ(17deg);
        }
        img {
          width: 80px;
          height: 80px;
          border: 4px solid #fff;
          border-radius: 50%;
          outline: 2px solid #b6a0ff;
          background-color: #ebd3ff;
          object-fit: cover;
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

            .ranking {
              font-size: 13px;
              font-weight: 700;
              color: #8400ff;
            }
          }
          .tripCount {
            font-size: 12px;
            color: #5802c8;
          }
        }
      }
    }
  }
`;

export const StyledContainer = styled.div`
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 25px;
    width: 100%;
    position: sticky;
    top: 0;
    background: radial-gradient(#f5ecfd 15%, transparent 16%) 0 0, radial-gradient(#eeeeff 15%, transparent 16%) 8px 8px,
      radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 0 1px,
      radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 8px 9px;
    background-color: #f9f7ff;
    background-size: 16px 16px;
    h2 {
      font-size: 21px;
      color: #6840e9;
      font-weight: 700;
      padding: 10px 0;
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
`;
