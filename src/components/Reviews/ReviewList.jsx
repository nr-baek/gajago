import React, { useCallback } from 'react';
import ReviewListButton from './ReviewListButton';
import { Scrollbars } from 'react-custom-scrollbars-2';

function ReviewList({ reviews, setReviewKey, setShowModal, loading }) {
  const handleClick = useCallback(
    (e) => {
      setShowModal(true);
      setReviewKey(e.currentTarget.id);
    },
    [setReviewKey, setShowModal],
  );

  return (
    <ul>
      {loading ? (
        <p className="loading">loading...</p>
      ) : (
        <Scrollbars autoHide>
          {reviews && reviews.length ? (
            reviews.map((trip) => {
              const id = trip.key;
              return <ReviewListButton key={id} id={id} trip={trip} handleClick={handleClick} />;
            })
          ) : (
            <p className="noWrittenReviewMsg">작성된 여행 후기가 없습니다.</p>
          )}
        </Scrollbars>
      )}
    </ul>
  );
}

export default ReviewList;
