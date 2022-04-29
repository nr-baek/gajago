import React, { useCallback } from 'react';
import { StyledPlanner } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getDatabase, ref as dbRef, set, update } from 'firebase/database';
import { getStorage, ref as strRef, deleteObject } from 'firebase/storage';
import { setPlanData, setTrophyInfo } from '../../redux/actions/user_action';
import NoteWithBtn from './NoteWithBtn';
import { createTrophyInfoObj, getPlanData } from './utils';
import { REGION_NAME, TRIP_TYPE_TEXT } from '../../common';

function TripInfo({ planData, handleClose, setShowEditForm, editable }) {
  const user = useSelector((state) => state.user.currentUser);
  const trophyInfo = useSelector((state) => state.user.trophyInfo);
  const dispatch = useDispatch();

  const { key, title, startDate, endDate, days, region, detailAddress, tripType, planList } = planData;

  const checkAndSetStateOfTrophy = useCallback(
    async (planArray) => {
      const db = getDatabase();
      const { isOwner, tripCount } = createTrophyInfoObj(planArray);
      const infoObj = {
        isOwner,
        tripCount,
      };

      if (trophyInfo.tripCount !== tripCount) {
        await dispatch(setTrophyInfo(infoObj));
        await set(dbRef(db, `userList/${user.uid}/tripCount`), infoObj.tripCount);
      }
    },
    [dispatch, trophyInfo.tripCount, user.uid],
  );

  const setPlanDataAndUpdateTrophy = useCallback(
    async (uid) => {
      const planArray = await getPlanData(uid);
      dispatch(setPlanData(planArray));
      checkAndSetStateOfTrophy(planArray, uid);
    },
    [checkAndSetStateOfTrophy, dispatch],
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
        const db = getDatabase();
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

        setPlanDataAndUpdateTrophy(user.uid);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  }, [setPlanDataAndUpdateTrophy, handleClose, key, planData, user.uid]);

  return (
    <NoteWithBtn onClickClose={handleClose} onClickEdit={onClickEditBtn} onClickDel={onClickDelBtn} editable={editable}>
      <StyledPlanner>
        <h2> {title} </h2>
        <div className="contents">
          <p>
            &#x1F4C6; 여행기간: {days > 1 ? `${startDate} ~ ${endDate}` : startDate} (
            {days > 1 ? `${days - 1 + '박' + days + '일'}` : '당일치기'})
          </p>
          <p> &#x1F3DD; 여 행 지: {REGION_NAME[region] + ' ' + detailAddress}</p>
          <p> &#x1F94E; 여행타입: {TRIP_TYPE_TEXT[tripType]}</p>
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
