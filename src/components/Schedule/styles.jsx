import styled from '@emotion/styled';
import plannerBackground from '../../assets/images/plannerBackground.png';

export const StyledCalendar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  h1 {
    font-size: 30px;
    font-weight: bold;
    color: #6840e9;
    width: 200px;
    display: inline-block;
  }
  .addBtn {
    width: 100px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 13px;
    padding: 8px 10px;
    border: 0;
    color: #fff;
    float: right;
    background-color: #9b83e7;
    &:hover {
      background-color: #724cec;
    }
  }
  .selectedMonth {
    width: 300px;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .changeMonth {
      font-size: 20px;
      color: #505050;
      cursor: pointer;
    }
    .showMonth {
      padding: 4px 12px;
      font-weight: bold;
      color: #505050;
      cursor: pointer;
      .month {
        font-size: 40px;
        color: #7a6bff;
        margin-right: 20px;
      }
    }
  }
  .body {
    width: 100%;
    margin-top: 13px;
    .days {
      display: flex;
      justify-content: space-around;
      border-top: 1px solid #ddd;
      padding: 6px 0;
      color: #666;
      font-size: 16px;
      font-weight: bold;
    }
    .week {
      border-top: 1px solid #ddd;
      display: flex;
      position: relative;
      .box.grayed {
        background: repeating-linear-gradient(45deg, #e7e7f8, #ececf8 2px, #f5f1fa 2px, #f9f5fd 14px);
        color: #999;
      }
      .box {
        border-left: 1px solid #ddd;
        width: 100%;
        height: 10vh;
        min-height: 65px;

        .marKingBar {
          width: 100%;
          height: 35%;
          font-size: 15px;
          text-shadow: 1px 1px 4px #6d6d6d;
          padding: 3px 0 3px 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #fff;
          position: absolute;
          box-shadow: 3px 5px 6px rgba(0, 0, 0, 0.1);
          letter-spacing: 0.8px;
          font-weight: 700;
          white-space: nowrap;
          width: 100%;
          transition: all 0.2s ease;
          cursor: pointer;
          &.hover {
            box-shadow: 3px 5px 9px rgba(0, 0, 0, 0.5);
          }
          &.start {
            border-top-left-radius: 17px;
            border-bottom-left-radius: 17px;
          }
          &.end {
            border-top-right-radius: 17px;
            border-bottom-right-radius: 17px;
          }
          &.couple {
            background: linear-gradient(to bottom, #ff8b8b 0%, #f37070 100%);
          }
          &.family {
            background: linear-gradient(to bottom, #fac44e 0%, #d3a541 100%);
          }
          &.friends {
            background: linear-gradient(to bottom, #93c757 0%, #7eb441 100%);
          }
          &.alone {
            background: linear-gradient(to bottom, #9898fd 0%, #5353d1 100%);
          }
        }
        .dateNumber {
          font-size: 0.9rem;
          font-weight: bold;
          display: inline-block;
          margin: 5px;
        }
      }
    }
    .week > div:first-of-type {
      border-left: none;
    }
  }
`;

export const LeftMarginSpan = styled.span`
  padding-left: 20px;
`;

export const DatePickerForm = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 340px;
  input {
    width: 150px;
    color: #333;
    padding: 5px;
    text-align: center;
    border: 1px solid #888;
    border-radius: 4px;
  }
`;

export const SelectForm = styled.div`
  width: 300px;
`;

export const PlansBox = styled.ul`
  margin-left: 15%;
  margin-bottom: 10px;
  max-height: 250px;
  padding: 0 12px 12px 12px;
  overflow: auto;
  li {
    list-style: inside;
    list-style-type: decimal;
    line-height: 23px;
    vertical-align: top;
    .delBtn {
      visibility: hidden;
      margin-left: 5px;
      color: #666;
      vertical-align: middle;
      cursor: pointer;
    }

    &:hover .delBtn {
      visibility: visible;
    }
  }
`;

export const FormFooter = styled.div`
  border-top: 1px solid #dee2e6;
  padding-top: 10px;
  p {
    color: red;
  }
  div {
    float: right;
    width: 180px;
    button {
      margin-left: 10px;
      height: 38px;
    }
  }
`;

export const StyledModalContents = styled.div`
  border-radius: 22px;
  background-color: #fafaff;
  background-image: url(${plannerBackground}), linear-gradient(#f2ecff 1px, transparent 1px),
    linear-gradient(to right, #f2ecff 1px, #fafaff 1px);
  background-size: cover, 20px 20px, 20px 20px;
  font-family: 'Gaegu', cursive;
  color: #333;
  font-size: 20px;
  height: 650px;
  padding: 40px 0 70px 0;

  .contentsWrapper {
    width: 85%;
    margin: 0 auto;
    position: relative;
  }

  button {
    padding: 5px 15px;
    border-radius: 7px;
    border: 0;
  }

  .closeBtn {
    background-color: #dfd1ff;
    position: absolute;
    right: 20px;
    margin: 15px auto;

    &:hover {
      background-color: #bc93ff;
    }
  }

  .btnWrapper {
    position: absolute;
    right: 20px;
    top: 20px;

    .editBtn {
      background-color: #ffedbd;
      margin-right: 20px;
      &:hover {
        background-color: #ffd04f;
      }
    }
    .delBtn {
      background-color: #ffcbcb;
      &:hover {
        background-color: #ff8181;
      }
    }
  }
`;

export const StyledPlanner = styled.div`
  h2 {
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    margin: 40px 0 23px 0;
    text-shadow: 1px 1px 5px #fff;
  }
  .contents {
    width: 80%;
    margin: 0 auto;
    p {
      margin: 10px 0;
    }
    ul {
      margin-left: 30px;
      padding: 10px 30px 10px 50px;
      border-radius: 10px;
      border: 2px dashed #cfcffd;
      li {
        list-style: number;
      }
    }
  }
`;
