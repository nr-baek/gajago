import React, { useCallback } from 'react';
import { StyledPlanner } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { get, getDatabase, orderByChild, query, ref as dbRef, set, update } from 'firebase/database';
import { getStorage, ref as strRef, deleteObject } from 'firebase/storage';
import { setPlanData, setTrophyInfo } from '../../redux/actions/user_action';
import NoteWithBtn from './NoteWithBtn';
import { checkTrophyInfo } from './utils';

function TripInfo({ planData, handleClose, setShowEditForm }) {
  const user = useSelector((state) => state.user.currentUser);
  const trophyInfo = useSelector((state) => state.user.trophyInfo);
  const dispatch = useDispatch();
  const db = getDatabase();

  const { key, title, startDate, endDate, days, region, detailAddress, tripType, planList } = planData;
  const tripTypeText = {
    alone: '나홀로여행',
    family: '가족여행',
    couple: '커플여행',
    friends: '우정여행',
  };

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

  const checkTrophyState = useCallback(
    async (planArray) => {
      const { isOwner, tripCount } = checkTrophyInfo(planArray);
      const infoObj = {
        isOwner,
        tripCount,
      };

      if (trophyInfo.tripCount !== tripCount) {
        await dispatch(setTrophyInfo(infoObj));
        await set(dbRef(db, `userList/${user.uid}/tripCount`), infoObj.tripCount);
      }
    },
    [db, dispatch, trophyInfo.tripCount, user.uid],
  );

  const onClickEditBtn = useCallback(() => {
    if (planData.review) {
      alert('여행후기 등록이 완료된 일정이므로 수정할 수 없습니다.');
      return;
    }
    setShowEditForm(true);
  }, [planData.review, setShowEditForm]);

  const onClickDelBtn = useCallback(async () => {
    try {
      if (
        window.confirm(
          `${planData.review ? '등록된 여행후기 및 스토리 게시물이 사라집니다.\n' : ''}정말 삭제하시겠습니까?`,
        )
      ) {
        const storage = getStorage();

        if (planData.review) {
          const updates = {};
          updates[`users/${user.uid}/plans/${key}`] = null;

          if (planData.openReview) {
            updates[`reviews/public/${key}`] = null;
            updates[`reviews/user/${user.uid}/public/${key}`] = null;
          } else {
            updates[`reviews/user/${user.uid}/private/${key}`] = null;
          }
          if (planData.photoReview) {
            const desertRef = strRef(storage, `review_image/${user.uid}/${key}`);
            await deleteObject(desertRef);
          }

          await update(dbRef(db), updates);
        } else {
          await set(dbRef(db, `users/${user.uid}/plans/${key}`), null);
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
            checkTrophyState(planArray);
          } else {
            console.log('No data available');
            dispatch(setPlanData([]));
          }
        });
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  }, [checkTrophyState, db, dispatch, handleClose, key, planData, user.uid]);

  return (
    <NoteWithBtn onClickClose={handleClose} onClickEdit={onClickEditBtn} onClickDel={onClickDelBtn}>
      <StyledPlanner>
        <h2> {title} </h2>
        <div className="contents">
          <p>
            &#x1F4C6; 여행기간: {days > 1 ? `${startDate} ~ ${endDate}` : startDate} (
            {days > 1 ? `${days - 1 + '박' + days + '일'}` : '당일치기'})
          </p>
          <p> &#x1F3DD; 여 행 지: {regionObj[region] + ' ' + detailAddress}</p>
          <p> &#x1F94E; 여행타입: {tripTypeText[tripType]}</p>
          <p> &#x1F4DD; 계획일정: </p>
          {planList && planList.length > 0 ? (
            <ul>
              <>
                {planList.map((plan) => (
                  <li key={plan.id}> {plan.content}</li>
                ))}
              </>
            </ul>
          ) : (
            <p>등록된 계획일정 없음...</p>
          )}
        </div>
      </StyledPlanner>
    </NoteWithBtn>
  );
}

export default TripInfo;
