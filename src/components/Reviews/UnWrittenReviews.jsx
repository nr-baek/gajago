import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormFooter } from '../Schedule/styles';
import { StyledListContainer } from './styles';
import UnWrittenReviewList from './UnWrittenReviewList';
import { generateUnWrittenReviewArray } from './utils';

function UnWrittenReviews({ handleClose, selectTripToWriteReview }) {
  const planArray = useSelector((state) => state.schedule_info.sortedOverallSchedule);
  const unWrittenReviewOfTripArray = generateUnWrittenReviewArray(planArray);
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [clickMsg, setClickMsg] = useState(false);

  const handleClick = () => {
    if (unWrittenReviewOfTripArray.length) {
      if (clickedIndex !== -1) {
        selectTripToWriteReview(unWrittenReviewOfTripArray[clickedIndex]);
      } else {
        setClickMsg(true);
      }
    } else {
      handleClose();
    }
  };

  const clickListHandler = useCallback(
    (e) => {
      setClickedIndex(+e.currentTarget.id);
    },
    [setClickedIndex],
  );

  return (
    <StyledListContainer>
      {unWrittenReviewOfTripArray.length ? (
        <ul>
          {unWrittenReviewOfTripArray.map((trip, idx) => {
            return (
              <UnWrittenReviewList
                key={idx}
                id={idx}
                isChecked={idx === clickedIndex}
                trip={trip}
                clickListHandler={clickListHandler}
              />
            );
          })}
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

export default UnWrittenReviews;
