import React from 'react';
import { InfoBoard, PlanMemo, TripList } from './styles';

function TripsInfo() {
  return (
    <InfoBoard>
      <div className="prevAndNextInfo">
        <PlanMemo className="prev">최근 여행</PlanMemo>
        <PlanMemo className="next">다음 여행 일정</PlanMemo>
      </div>
      <TripList>여행 내역</TripList>
      <div className="nail tl" />
      <div className="nail tr" />
      <div className="nail bl" />
      <div className="nail br" />
    </InfoBoard>
  );
}

export default TripsInfo;
