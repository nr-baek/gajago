import styled from '@emotion/styled';

export const TripBox = styled.div`
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const InfoBoard = styled.div`
  width: 50%;
  height: 97%;
  background: radial-gradient(#806c56 15%, transparent 16%) 0 0, radial-gradient(#c8ab89 15%, transparent 16%) 8px 8px,
    radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 0 1px,
    radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 8px 9px;
  background-color: #c8ab89;
  background-size: 16px 16px;
  background-size: 20px 20px;
  box-shadow: 1px 2px 10px #554430bc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;

  .prevAndNextInfo {
    width: 90%;
    height: 32%;
    margin-top: 4.5%;
    display: flex;
    justify-content: space-between;
  }

  .nail {
    width: 23px;
    height: 23px;
    border-radius: 50%;
    position: absolute;
    box-shadow: 2px 4px 6px #554430bc;
    &.tl {
      background-color: #ff6262;
      border: 3px solid #ee5a5a;
      top: 0;
      left: 0;
    }
    &.tr {
      background-color: #ffc443;
      border: 3px solid #f5bf49;
      top: 0;
      right: 0;
    }
    &.bl {
      background-color: #6fe439;
      border: 3px solid #69d637;
      bottom: 0;
      left: 0;
    }
    &.br {
      background-color: #5252f0;
      border: 3px solid #5656e7;
      bottom: 0;
      right: 0;
    }
  }
`;

export const PlanMemo = styled.div`
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.3);
  width: 49%;
  height: 100%;
  &.prev {
    background-color: #fdeeff;
  }
  &.next {
    background-color: #fffbe8;
  }
`;

export const TripList = styled.div`
  background-color: #ebf0ff;
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.3);
  width: 90%;
  height: 60%;
  margin-bottom: 4.5%;
`;

export const Korea = styled.div`
  width: 400px;
  overflow: hidden;

  .region {
    stroke-linejoin: round;
    stroke: #bba9cf;
    stroke-width: 4;
    fill: #ffffff;
    &:hover {
      fill: #4d00b1;
    }
  }

  .achievement {
    width: 90%;
    height: 45px;
    display: flex;
    align-items: flex-end;
    position: relative;
    .progress {
      width: 93%;
      margin-bottom: 5px;
    }
    .trophy {
      position: absolute;
      right: 1%;
      color: #f0c400;
      font-size: 40px;
    }
  }
`;
