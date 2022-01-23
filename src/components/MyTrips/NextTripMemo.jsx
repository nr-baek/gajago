import React from 'react';
import { NextPlan, NoNextPlan, PlanMemo } from './styles';

function NextTripMemo({ nextTrip, dDay }) {
  const regionObj = {
    Seoul: '서울특별시',
    Busan: '부산광역시',
    DaeGu: '대구광역시',
    InCheon: '인천광역시',
    DaeJeon: '대전광역시',
    GwangJu: '광주광역시',
    UlSan: '울산광역시',
    SeJong: '세종시',
    GyeongGi: '경기도',
    GangWon: '강원도',
    ChungBuk: '충청북도',
    ChungNam: '충청남도',
    JeonBuk: '전라북도',
    JeonNam: '전라남도',
    GyeongBuk: '경상북도',
    GyeongNam: '경상남도',
    JeJu: '제주도',
    overseas: '해외',
  };
  return (
    <PlanMemo className="next">
      {nextTrip ? (
        <NextPlan>
          <span className="next"># 다음여행</span>
          <p className="region">({regionObj[nextTrip.region]})</p>
          <p className="tripTitle">
            <span className="title">{nextTrip.title}</span>
          </p>
          <p className="dDay">D - {dDay === 0 ? 'Day' : dDay}</p>
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
