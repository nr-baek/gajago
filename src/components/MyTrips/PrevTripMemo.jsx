import React from 'react';
import { NoPrevPlan, PlanMemo, PrevPlan } from './styles';

function PrevTripMemo({ prevTrip, howManyDaysAgo }) {
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
    <PlanMemo className="prev">
      {prevTrip ? (
        <PrevPlan>
          <span className="recent"># 최근여행</span>
          <div className="daysAndRegion">
            <p>
              <span className="days">{howManyDaysAgo}</span>일 전
            </p>
            <div className="region">{regionObj[prevTrip.region]}</div>
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
