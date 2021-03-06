import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { Form } from 'react-bootstrap';
import { EditOutlined } from '@ant-design/icons/lib/icons';
import ReviewModal from './ReviewModal';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { generateTripsObjectByRegion } from './utils';
import ReviewList from './ReviewList';
import { AddReviewBtn, ReviewContainer } from './styles';

function Reviews() {
  const uid = useSelector((state) => state.user.currentUser.uid);

  const [loading, setLoading] = useState(false);
  const [reviewsObj, setReviewsObj] = useState({});
  const [reviewObjectByRegion, setReviewObjectByRegion] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useInput('allRegion');
  const [reviewKey, setReviewKey] = useState('');

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);
  const handleShow = useCallback(() => {
    setReviewKey('');
    setShowModal(true);
  }, []);

  const reviewRef = useMemo(() => {
    const db = getDatabase();
    return ref(db, `reviews/user/${uid}`);
  }, [uid]);

  const addReviewsListener = useCallback(() => {
    onValue(reviewRef, (snapshot) => {
      setLoading(true);
      if (snapshot.exists()) {
        let reviews = {};
        const reviewList = [];
        snapshot.forEach((child) => {
          reviews = { ...reviews, ...child.val() };
        });

        setReviewsObj(reviews);

        for (let key in reviews) {
          reviewList.push(reviews[key]);
        }

        reviewList.sort((prev, next) => {
          if (prev.startDate < next.startDate) return 1;
          if (prev.startDate > next.startDate) return -1;
          return 0;
        });

        setReviewObjectByRegion(generateTripsObjectByRegion(reviewList));
      } else {
        setReviewObjectByRegion(generateTripsObjectByRegion([]));
      }
      setLoading(false);
    });
  }, [reviewRef]);

  useEffect(() => {
    addReviewsListener();
    return () => {
      off(reviewRef);
    };
  }, [addReviewsListener, reviewRef]);

  return (
    <ReviewContainer>
      <h1>?????? ????????????</h1>
      <div className="select">
        <Form.Select aria-label="?????? ????????????" onChange={setSelectedRegion}>
          <option value="allRegion">????????????</option>
          <option value="allRegion">??????</option>
          <option value="Seoul">???????????????</option>
          <option value="Busan">???????????????</option>
          <option value="DaeGu">???????????????</option>
          <option value="InCheon">???????????????</option>
          <option value="DaeJeon">???????????????</option>
          <option value="GwangJu">???????????????</option>
          <option value="UlSan">???????????????</option>
          <option value="SeJong">?????????????????????</option>
          <option value="GyeongGi">?????????</option>
          <option value="GangWon">?????????</option>
          <option value="ChungBuk">????????????</option>
          <option value="ChungNam">????????????</option>
          <option value="JeonBuk">????????????</option>
          <option value="JeonNam">????????????</option>
          <option value="GyeongBuk">????????????</option>
          <option value="GyeongNam">????????????</option>
          <option value="JeJu">?????????????????????</option>
          <option value="overseas">??????</option>
        </Form.Select>
      </div>
      <AddReviewBtn onClick={handleShow}>
        <EditOutlined /> ?????? ??????
      </AddReviewBtn>
      <ReviewList
        loading={loading}
        reviews={reviewObjectByRegion[selectedRegion]}
        setReviewKey={setReviewKey}
        setShowModal={setShowModal}
      />
      <ReviewModal show={showModal} handleClose={handleClose} reviewInfo={reviewKey && reviewsObj?.[reviewKey]} />
    </ReviewContainer>
  );
}

export default Reviews;
