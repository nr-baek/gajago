import { CarTwoTone, CheckOutlined } from '@ant-design/icons';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormFooter } from '../Schedule/styles';
import { StyledListContainer } from './styles';
import { generateUnWrittenReviewArray } from './utils';

function UnWrittenReviewList({ handleClose, selectTripToWriteReview }) {
  const planArray = useSelector((state) => state.user.planData);
  const unWrittenReviewOfTripArray = generateUnWrittenReviewArray(planArray);
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [clickMsg, setClickMsg] = useState(false);

  const handleClick = useCallback(() => {
    if (unWrittenReviewOfTripArray.length) {
      if (clickedIndex !== -1) {
        selectTripToWriteReview(unWrittenReviewOfTripArray[clickedIndex]);
      } else {
        setClickMsg(true);
      }
    } else {
      handleClose();
    }
  }, [clickedIndex, unWrittenReviewOfTripArray, handleClose, selectTripToWriteReview]);

  return (
    <StyledListContainer>
      {unWrittenReviewOfTripArray.length ? (
        <ul>
          {unWrittenReviewOfTripArray.map((trip, idx) => (
            <li
              key={idx}
              id={idx}
              className={idx === clickedIndex ? 'select' : ''}
              onClick={(e) => {
                setClickedIndex(+e.currentTarget.id);
              }}
            >
              {clickedIndex === idx ? <CheckOutlined /> : <CarTwoTone twoToneColor={'#3c199b'} />}
              <span className="date">
                {trip.startDate === trip.endDate ? trip.startDate : `${trip.startDate} ~ ${trip.endDate}`}
              </span>{' '}
              <span className="title">{trip.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="noReviewMsg">작성할 리뷰가 없습니다.</p>
      )}

      <FormFooter>
        <div className="bottom">
          {clickMsg && <p>여행을 선택해주세요.</p>}
          <button onClick={handleClick}>확인</button>
        </div>
      </FormFooter>
    </StyledListContainer>
  );
}

export default UnWrittenReviewList;
