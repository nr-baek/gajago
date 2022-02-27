import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import ReviewOfTrip from './ReviewOfTrip';
import { generateTripsObjectByRegion } from './utils';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useEffect } from 'react';

function ReviewList({ selectedRegion }) {
  const user = useSelector((state) => state.user.currentUser);

  const [reviews, setReviews] = useState(null);
  const [clickedReview, setClickedReview] = useState(null);

  const db = getDatabase();
  const reviewRef = ref(db, `reviews/user/${user.uid}`);

  const addReviewsListener = useCallback(() => {
    onValue(reviewRef, (snapshot) => {
      if (snapshot.exists()) {
        let reviewsObj = {};
        const reviewList = [];

        snapshot.forEach((child) => {
          reviewsObj = { ...reviewsObj, ...child.val() };
        });

        for (let key in reviewsObj) {
          const reviewInfo = { key: key, ...reviewsObj[key] };
          reviewList.push(reviewInfo);
        }

        reviewList.sort((prev, next) => {
          if (prev.startDate < next.startDate) return 1;
          if (prev.startDate > next.startDate) return -1;
          return 0;
        });

        setReviews(generateTripsObjectByRegion(reviewList));
      }
    });
  }, [reviewRef]);

  useEffect(() => {
    addReviewsListener();
    return () => {
      off(reviewRef);
    };
  }, [addReviewsListener, reviewRef]);

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
      <Scrollbars autoHide>
        {reviews && reviews[selectedRegion].length ? (
          reviews[selectedRegion].map((trip) => {
            const id = trip.key;
            return (
              <ReviewOfTrip key={id} id={id} trip={trip} selected={id === clickedReview} handleClick={handleClick} />
            );
          })
        ) : (
          <p className="noWrittenReviewMsg">작성된 여행 후기가 없습니다.</p>
        )}
      </Scrollbars>
    </ul>
  );
}

export default ReviewList;
