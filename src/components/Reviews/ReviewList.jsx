import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import ReviewOfTrip from './ReviewOfTrip';
import { generateWrittenReviewArray } from './utils';

function ReviewList() {
  const planArray = useSelector((state) => state.user.planData);
  const writtenReviewArray = generateWrittenReviewArray(planArray);
  const [clickedReview, setClickedReview] = useState(null);

  const handleClick = useCallback(
    (e) => {
      if (e.currentTarget.id === clickedReview) {
        setClickedReview(null);
      } else setClickedReview(e.currentTarget.id);
    },
    [clickedReview],
  );

  return (
    <ul>
      {writtenReviewArray.length ? (
        writtenReviewArray.map((trip) => {
          const id = trip.title + trip.startDate;
          return (
            <ReviewOfTrip key={id} id={id} trip={trip} selected={id === clickedReview} handleClick={handleClick} />
          );
        })
      ) : (
        <p className="noWrittenReviewMsg">작성된 여행 후기가 없습니다.</p>
      )}
    </ul>
  );
}

export default ReviewList;
