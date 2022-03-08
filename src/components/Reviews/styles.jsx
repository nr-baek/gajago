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
    .loading {
      text-align: center;
      padding: 10px 0 30px 0;
      color: #555;
    }
    .noWrittenReviewMsg {
      text-align: center;
      padding: 10px 0 30px 0;
      color: #555;
    }
  }
`;

export const AddReviewBtn = styled.button`
  background-color: #6264b6;
  font-size: 17px;
  color: #fff;
  width: 120px;
  padding: 8px 13px;
  border: 0;
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

export const StyledListContainer = styled.div`
  width: 100%;
  height: 100%;

  .noReviewMsg {
    text-align: center;
    padding: 10px 0 30px 0;
    color: #555;
  }

  ul {
    overflow: auto;
    max-height: 550px;
    overflow-y: auto;
    width: 96%;
    margin: 0 0 0 auto;
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

export const StyledButton = styled.button`
  width: 100%;
  margin: 10px 0;
  padding: 10px 20px;
  border: 2px dashed #b4b5ff;
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: pre;

  .expression {
    width: 35px;
    font-size: 30px;
    height: 30px;
  }
  .title {
    width: 55%;
    margin-right: 10px;
    overflow: hidden;
    text-align: left;
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
    width: 210px;
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

  &:hover {
    border-color: #3e41f0;
  }
`;

export const StyledReview = styled.div`
  h2 {
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    margin: 40px 0 23px 0;
    text-shadow: 1px 1px 5px #fff;
  }
  .contents {
    width: 90%;
    margin: 0 auto;
    p {
      margin: 10px 0;
    }
    .photoAndDesc {
      margin: 10px auto;
      text-align: center;
      .photo {
        background-color: #f3ecf7;
        border-radius: 10px;
        display: block;
        margin: 0 auto;
        box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.3);
        max-width: 100%;
        height: 350px;
        object-fit: cover;
      }
      p {
        padding: 10px 20px;
        color: #555;
        font-size: 18px;
        font-weight: 700;
      }
    }
    .review {
      border-radius: 10px;
      background: rgba(250, 250, 255, 0.8);
      border: 2px dashed #9a74cc;
      padding: 10px 15px;
      font-family: 'Gaegu', cursive;
      color: #444;
      white-space: pre-line;
      line-height: 30px;
      font-size: 20px;
      text-decoration: underline dotted #bfa8ff;
      text-underline-position: under;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const EditPhotoButton = styled.button`
  line-height: 20px;
  padding: 3px;
  margin-left: 10px;
`;
