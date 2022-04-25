import React from 'react';
import { REGION_NAME } from '../../common';
import { NextPlan, NoNextPlan, PlanMemo } from './styles';

function NextTripMemo({ nextTrip, dDay }) {
  return (
    <PlanMemo className="next">
      {nextTrip ? (
        <NextPlan>
          <span className="next"># 다음여행</span>
          <p className="region">({REGION_NAME[nextTrip.region]})</p>
          <p className="tripTitle">
            <span className="title">{nextTrip.title}</span>
          </p>
          <p className="dDay">D-{dDay === 0 ? 'Day' : dDay}</p>
        </NextPlan>
      ) : (
        <NoNextPlan>
          <p>다음에</p>
          <p className="underLine">
            <span className="where">어디</span>로<span className="qMark" />
          </p>
          <p>갈까.</p>
        </NoNextPlan>
      )}
    </PlanMemo>
  );
}

export default NextTripMemo;
