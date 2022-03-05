import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { StyledPlanner } from './styles';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { get, getDatabase, orderByChild, query, ref as dbRef, set, update } from 'firebase/database';
import { getStorage, ref as strRef, deleteObject } from 'firebase/storage';
import { setPlanData } from '../../redux/actions/user_action';

function TripInfo({ planData, handleClose, setShowEditForm }) {
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

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

  const onClickEditBtn = () => {
    if (planData.review) {
      alert('여행후기 등록이 완료된 일정이므로 수정할 수 없습니다.');
      return;
    }
    setShowEditForm(true);
  };

  const onClickDelBtn = async () => {
    try {
      if (
        window.confirm(
          `${planData.review ? '등록된 여행후기 및 스토리 게시물이 사라집니다.\n' : ''}정말 삭제하시겠습니까?`,
        )
      ) {
        // 삭제처리
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
          if (planData.imageFileType) {
            const desertRef = strRef(storage, `review_image/${user.uid}/${key}`);
            await deleteObject(desertRef);
          }

          await update(dbRef(db), updates);
        } else {
          await set(dbRef(db, `users/${user.uid}/plans/${key}`), null);
        }
        // plandata 다시 get 해오고 plan이랑 트로피 여부 다시 dispatch

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
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledPlanner>
      <Scrollbars autoHide>
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
      </Scrollbars>
      <button className="closeBtn" onClick={handleClose}>
        X 닫기
      </button>
      <div className="btnWrapper">
        <button className="editBtn" onClick={onClickEditBtn}>
          <EditOutlined style={{ verticalAlign: 'middle' }} /> 수정하기
        </button>
        <button className="delBtn" onClick={onClickDelBtn}>
          <DeleteOutlined style={{ verticalAlign: 'middle' }} /> 삭제하기
        </button>
      </div>
    </StyledPlanner>
  );
}

export default TripInfo;
