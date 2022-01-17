import styled from '@emotion/styled';

export const StyledCalendar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 50px;
  h1 {
    font-size: 30px;
    font-weight: bold;
    color: #6840e9;
    width: 200px;
    display: inline-block;
  }
  button {
    width: 100px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 11px;
    padding: 8px 10px;
    border: 0;
    color: #fff;
    background-color: #9b83e7;
    float: right;
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
      .month {
        font-size: 24px;
        color: #7a6bff;
        margin-right: 20px;
      }
      .year {
        cursor: pointer;
      }
    }
  }
  .body {
    width: 100%;
    margin-top: 15px;
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
      justify-content: space-around;
      .box.grayed {
        background: repeating-linear-gradient(45deg, #f7f7fc, #f7f7fc 2px, #ffffff 2px, #ffffff 14px);
        color: #999;
      }
      .box {
        border-left: 1px solid #ddd;
        width: 100%;
        height: 10vh;
        min-height: 65px;
        vertical-align: bottom;
        padding: 5px;
        .text {
          font-size: 0.9rem;
          font-weight: bold;
          display: inline-block;
          margin-left: 5px;
        }
      }
    }
    .week > div:first-of-type {
      border-left: none;
    }
  }
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
  max-height: 250px;
  padding: 0 12px;
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
