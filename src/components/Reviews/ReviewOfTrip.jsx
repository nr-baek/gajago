import { HeartTwoTone, SmileTwoTone, MehTwoTone, FrownTwoTone } from '@ant-design/icons/lib/icons';
import React from 'react';
import { StyledReview } from './styles';

function ReviewOfTrip({ trip, selected, id, handleClick }) {
  const regionObj = {
    Seoul: '서울특별시',
    Busan: '부산광역시',
    DaeGu: '대구광역시',
    InCheon: '인천광역시',
    DaeJeon: '대전광역시',
    GwangJu: '광주광역시',
    UlSan: '울산광역시',
    SeJong: '세종자치시',
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
    <StyledReview selected={selected} id={id} onClick={handleClick}>
      {trip.review.expression === 'good' && <SmileTwoTone className="expression" twoToneColor="#26b820" />}
      {trip.review.expression === 'soSo' && <MehTwoTone className="expression" twoToneColor="#e4af00" />}
      {trip.review.expression === 'bad' && <FrownTwoTone className="expression" twoToneColor="#e93600" />}
      <div className="title">
        <span className="reviewTitle">{trip.review.title}</span>
        <p className="regionAndTripTitle">
          <span>
            ({regionObj[trip.region]}) {trip.title}
          </span>
        </p>
      </div>
      <div className="term">
        {trip.startDate} ~ {trip.endDate}
      </div>
      <div className="likes">
        <HeartTwoTone twoToneColor="#eb2f2f" /> {trip.review.likes}
      </div>
      <div className="content">
        {trip.review.imgUrl && <img src={trip.review.imgUrl} alt={trip.detailAddress} />}
        <p>{trip.review.reviewText}</p>
      </div>
    </StyledReview>
  );
}

export default ReviewOfTrip;
