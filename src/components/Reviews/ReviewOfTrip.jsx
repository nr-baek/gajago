import { HeartTwoTone, SmileTwoTone, MehTwoTone, FrownTwoTone, CameraOutlined } from '@ant-design/icons/lib/icons';
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
      {trip.expression === 'good' && <SmileTwoTone className="expression" twoToneColor="#26b820" />}
      {trip.expression === 'soSo' && <MehTwoTone className="expression" twoToneColor="#e4af00" />}
      {trip.expression === 'bad' && <FrownTwoTone className="expression" twoToneColor="#e93600" />}
      <div className="title">
        <span className="reviewTitle">{trip.reviewTitle}</span>
        <p className="regionAndTripTitle">
          <span>
            ({regionObj[trip.region]}) {trip.tripTitle}
          </span>
        </p>
      </div>
      <div className="term">
        {trip.startDate} ~ {trip.endDate}
      </div>
      <div className="likes">
        <HeartTwoTone twoToneColor="#eb2f2f" /> {trip.likes}
      </div>
      <div className="content">
        {trip.imgUrl && (
          <div className="photoAndDesc">
            <img src={trip.imgUrl} alt="여행 후기 사진" />
            <div className="photoDesc">
              <CameraOutlined style={{ verticalAlign: 'top' }} />{' '}
              {trip.photoDesc ? trip.photoDesc : '여행후기 사진 설명'}
            </div>
          </div>
        )}
        <p>{trip.reviewText}</p>
      </div>
    </StyledReview>
  );
}

export default ReviewOfTrip;
