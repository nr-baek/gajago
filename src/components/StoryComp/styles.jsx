import styled from '@emotion/styled';

export const StoryContainer = styled.div`
  width: 95%;
  margin: 0 auto;
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
    height: 150px;
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
              font-weight: 700;
              color: #760dff;
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
