import styled from '@emotion/styled';

export const ReviewContainer = styled.div`
  width: 75%;
  height: 100%;
  margin: 0 auto;

  h1 {
    margin-top: 20px;
    color: #5e5fb3;
    font-size: 30px;
    font-weight: 700;
    text-align: center;
  }
  .select {
    float: left;
    width: 170px;
  }

  ul {
    margin-top: 60px;
    border-top: 2px solid #c2c3fa;
    height: 80%;
    overflow: auto;
    .noWrittenReviewMsg {
      text-align: center;
      padding: 10px 0 30px 0;
      color: #555;
    }
  }
`;

export const AddReviewBtn = styled.div`
  background-color: #6264b6;
  font-size: 17px;
  color: #fff;
  width: 120px;
  padding: 8px 13px;
  border-radius: 10px;
  float: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #4231db;
  }
`;

export const StyledReview = styled.li`
  width: 100%;
  max-height: ${({ selected }) => (selected ? '200%' : '73.5px')};
  overflow: hidden;
  margin: 10px 0;
  padding: 10px 20px;
  border: 2px dashed ${({ selected }) => (selected ? '#3e41f0' : '#b4b5ff')};
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  .expression {
    width: 35px;
    font-size: 30px;
    height: 30px;
  }
  .title {
    width: 55%;
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    .reviewTitle {
      font-size: 18px;
      font-weight: 700;
      color: #4749a3;
      white-space: ${({ selected }) => (selected ? 'pre-wrap' : 'nowrap')};
    }
    .regionAndTripTitle {
      font-size: 15px;
      color: #838383;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        font-weight: 700;
        white-space: ${({ selected }) => (selected ? 'pre-wrap' : 'nowrap')};
      }
    }
  }
  .term {
    width: 30%;
    color: #838383;
  }
  .likes {
    color: #444;
    width: 35px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .content {
    overflow: hidden;
    width: 95%;
    margin: 10px auto;
    img {
      display: inline-block;
      background-color: pink;
      width: 400px;
    }
    p {
      margin-top: 10px;
      font-size: 19px;
      font-family: 'Gaegu', cursive;
      color: #444;
      font-weight: 700;
    }
  }

  &:hover {
    border-color: #3e41f0;
  }
`;

export const StyledListContainer = styled.div`
  width: 100%;
  height: 100%;

  .noReviewMsg {
    text-align: center;
    padding: 10px 0 30px 0;
    color: #555;
  }

  ul {
    width: 92%;
    margin: 0 auto;
    padding-bottom: 10px;
    font-size: 18px;
    li {
      height: 43px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #333;
      cursor: pointer;
      .title {
        padding-left: 10px;
        line-height: 18px;
        vertical-align: baseline;
        width: 70%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .date {
        font-size: 15px;
        padding-left: 10px;
      }
      &:hover,
      &.select {
        color: #391c8a;
        background-color: #f3f3ff;
      }
    }
  }

  div.bottom {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    p {
      margin-right: 20px;
    }
    button {
      float: right;
      padding: 8px 20px;
      border: 0;
      border-radius: 5px;
      background-color: #0d6efd;
      color: #fff;

      &:hover {
        background-color: #0a5edb;
      }
    }
  }
`;
