import { CameraOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { get, getDatabase, orderByChild, query, ref as dbRef, update } from 'firebase/database';
import { getStorage, ref as strRef, deleteObject } from 'firebase/storage';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlanData } from '../../redux/actions/user_action';
import NoteWithBtn from '../Schedule/NoteWithBtn';
import { StyledReview } from './styles';

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

        await get(query(dbRef(db, `users/${user.uid}/plans`), orderByChild('startDate'))).then((snapshot) => {
          if (snapshot.exists()) {
            let planArray = [];

            snapshot.forEach((child) => {
              planArray.push({
                key: child.key,
                ...child.val(),
              });
              return false;
            });
            dispatch(setPlanData(planArray));
          } else {
            console.log('No data available');
            dispatch(setPlanData([]));
          }
        });
      }

      handleClose();
      console.log('삭제되었습니다아~');
    } catch (error) {
      console.log('리뷰삭제 중 에러:', error);
    }
  }, [handleClose, reviewInfo, user.uid, dispatch]);

  return (
    <NoteWithBtn onClickClose={handleClose} onClickEdit={onClickEditBtn} onClickDel={onClickDelBtn}>
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
