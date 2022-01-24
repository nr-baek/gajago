import React from 'react';
import PostIt from './PostIt';
import { NoPrevPlan, PlanMemo, PrevPlan } from './styles';

function PrevTripMemo({ prevTrip, howManyDaysAgo }) {
  return (
    <PlanMemo className="prev">
      {prevTrip ? (
        <PrevPlan>
          <span className="recent"># 최근여행</span>
          <div className="daysAndRegion">
            <p>
              <span className="days">{howManyDaysAgo}</span>일 전
            </p>
            <PostIt region={prevTrip.region} />
          </div>
          <div className="detailAddrMsg">
            '<span className="detailAddr">{prevTrip.detailAddress}</span>
            '에
          </div>
          <p>여행 다녀옴.</p>
        </PrevPlan>
      ) : (
        <NoPrevPlan>
          <p className="pointString">
            <span className="point">여행</span>을
          </p>
          <p>떠나요~!</p>
        </NoPrevPlan>
      )}
    </PlanMemo>
  );
}

export default PrevTripMemo;
