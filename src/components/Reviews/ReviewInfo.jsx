import { CameraOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import NoteWithBtn from '../Schedule/NoteWithBtn';
import { StyledReview } from './styles';

function ReviewInfo({ reviewInfo, setShowForm, handleClose }) {
  const {
    uid,
    tripTitle,
    tripType,
    reviewTitle,
    startDate,
    endDate,
    days,
    expression,
    imgUrl,
    openReview,
    photoDesc,
    planKey,
    region,
    detailAddress,
    timeStamp,
    likes,
    reviewText,
  } = reviewInfo;

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

  const tripTypeText = {
    alone: '나홀로여행',
    family: '가족여행',
    couple: '커플여행',
    friends: '우정여행',
  };

  const feeling = {
    good: '좋았음!',
    soSo: '그냥그랬음..',
    bad: '안좋았음--',
  };

  const onClickEditBtn = useCallback(() => {
    setShowForm(true);
  }, [setShowForm]);

  const onClickDelBtn = useCallback(() => {
    // 삭제 처리....
    handleClose();
  }, [handleClose]);

  return (
    // <NoteWithBtn onClickClose={handleClose} onClickEdit={onClickEditBtn} onClickDel={onClickDelBtn}>
    <NoteWithBtn onClickClose={handleClose} onClickEdit={onClickEditBtn}>
      <StyledReview>
        <h2> {reviewTitle} </h2>
        <div className="contents">
          <p>&#127797; 여 행 명: {tripTitle}</p>
          <p> &#x1F3DD; 여 행 지: {regionObj[region] + ' ' + detailAddress}</p>
          <p>
            &#x1F4C6; 여행기간: {days > 1 ? `${startDate} ~ ${endDate}` : startDate} (
            {days > 1 ? `${days - 1 + '박' + days + '일'}` : '당일치기'})
          </p>
          <p>
            <span> &#127944; 여행타입: {tripTypeText[tripType]}</span>
            <span style={{ marginLeft: '40px' }}>&#127880; 여행기분: {feeling[expression]}</span>
          </p>
          {/* <p> &#127944; 여행타입: {tripTypeText[tripType]}</p>
          <p> &#10024; 여행기분: {feeling[expression]}</p> */}

          {imgUrl && (
            <div className="photoAndDesc">
              <img className="photo" src={imgUrl} alt={photoDesc} />
              <p>
                <CameraOutlined style={{ verticalAlign: 'middle', color: '#6f00ff', marginRight: '5px' }} />
                {photoDesc}
              </p>
            </div>
          )}
          <p className="review">{reviewText}</p>
          <div className="bottom">
            <span>{openReview ? '스토리 공개' : '스토리 비공개'}</span>
            <span className="writingDate">작성일: {dayjs(timeStamp).format('YYYY.MM.DD')}</span>
          </div>
        </div>
      </StyledReview>
    </NoteWithBtn>
  );
}

export default ReviewInfo;
