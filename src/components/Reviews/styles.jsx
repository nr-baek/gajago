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
  margin: 10px 0;
  padding: 10px 20px;
  border: 2px dashed #a0a2fd;
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
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
    width: 27%;
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
    display: ${({ selected }) => (selected ? 'block' : 'none')};
    width: 95%;
    margin: 10px auto;
    img {
      display: inline-block;
      background-color: pink;
      width: 300px;
    }
    p {
      margin-top: 10px;
      font-size: 18px;
      font-family: 'Gaegu', cursive;
    }
  }
`;
