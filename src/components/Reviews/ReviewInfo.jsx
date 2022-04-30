import { CameraOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getDatabase, ref as dbRef, update } from 'firebase/database';
import { getStorage, ref as strRef, deleteObject } from 'firebase/storage';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REGION_NAME, TRIP_TYPE_TEXT } from '../../common';
import { setPlanData } from '../../redux/actions/user_action';
import NoteWithBtn from '../Schedule/NoteWithBtn';
import { getPlanData } from '../Schedule/utils';
import { StyledReview } from './styles';

const feeling = {
  good: '좋았음!',
  soSo: '그냥그랬음..',
  bad: '안좋았음--',
};

function ReviewInfo({ reviewInfo, setShowForm, handleClose }) {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const {
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
    key,
    region,
    detailAddress,
    timeStamp,
    reviewText,
  } = reviewInfo;

  const onClickEditBtn = useCallback(() => {
    setShowForm(true);
  }, [setShowForm]);

  const onClickDelBtn = useCallback(async () => {
    try {
      if (window.confirm(`${openReview ? '등록된 스토리 게시물이 사라집니다.\n' : ''}정말 삭제하시겠습니까?`)) {
        const db = getDatabase();
        const updates = {};

        updates[`users/${user.uid}/plans/${key}/review`] = false;
        updates[`users/${user.uid}/plans/${key}/openReview`] = false;
        updates[`users/${user.uid}/plans/${key}/photoReview`] = null;
        if (openReview) {
          updates[`reviews/public/${key}`] = null;
          updates[`reviews/user/${user.uid}/public/${key}`] = null;
        } else {
          updates[`reviews/user/${user.uid}/private/${key}`] = null;
        }
        await update(dbRef(db), updates);

        if (imgUrl) {
          const storage = getStorage();
          const desertRef = strRef(storage, `review_image/${user.uid}/${key}`);
          await deleteObject(desertRef);
        }

        const planArray = getPlanData(user.uid);
        dispatch(setPlanData(planArray));

        handleClose();
      }
    } catch (error) {
      console.log('리뷰삭제 중 에러:', error);
    }
  }, [handleClose, user.uid, dispatch, imgUrl, key, openReview]);

  return (
    <NoteWithBtn onClickClose={handleClose} onClickEdit={onClickEditBtn} onClickDel={onClickDelBtn} editable={true}>
      <StyledReview>
        <h2> {reviewTitle} </h2>
        <div className="contents">
          <p>&#127797; 여 행 명: {tripTitle}</p>
          <p> &#x1F3DD; 여 행 지: {REGION_NAME[region] + ' ' + detailAddress}</p>
          <p>
            &#x1F4C6; 여행기간: {days > 1 ? `${startDate} ~ ${endDate}` : startDate} (
            {days > 1 ? `${days - 1 + '박' + days + '일'}` : '당일치기'})
          </p>
          <p>
            <span> &#127944; 여행타입: {TRIP_TYPE_TEXT[tripType]}</span>
            <span style={{ marginLeft: '40px' }}>&#127880; 여행기분: {feeling[expression]}</span>
          </p>

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
            <span>{openReview ? '스토리: 공개' : '스토리: 비공개'}</span>
            <span className="writingDate">작성일: {dayjs(timeStamp).format('YYYY.MM.DD')}</span>
          </div>
        </div>
      </StyledReview>
    </NoteWithBtn>
  );
}

export default ReviewInfo;
