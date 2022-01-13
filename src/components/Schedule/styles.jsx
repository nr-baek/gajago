import styled from '@emotion/styled';

export const StyledCalendar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 50px;
  h1 {
    font-size: 30px;
    font-weight: bold;
    color: #6840e9;
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
