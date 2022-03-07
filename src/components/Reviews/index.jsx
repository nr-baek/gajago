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
  const user = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(false);
  const [reviewsObj, setReviewsObj] = useState({});
  const [reviewObjectByRegion, setReviewObjectByRegion] = useState(null);
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

  const db = getDatabase();
  const reviewRef = useMemo(() => {
    return ref(db, `reviews/user/${user.uid}`);
  }, [db, user.uid]);

  const addReviewsListener = useCallback(() => {
    setLoading(true);
    onValue(reviewRef, (snapshot) => {
      if (snapshot.exists()) {
        let reviews = {};
        const reviewList = [];
        snapshot.forEach((child) => {
          reviews = { ...reviews, ...child.val() };
        });
        console.log(reviews);
        setReviewsObj(reviews);
        for (let key in reviews) {
          const reviewInfo = { key: key, ...reviews[key] };
          reviewList.push(reviewInfo);
        }

        reviewList.sort((prev, next) => {
          if (prev.startDate < next.startDate) return 1;
          if (prev.startDate > next.startDate) return -1;
          return 0;
        });

        setReviewObjectByRegion(generateTripsObjectByRegion(reviewList));
        setLoading(false);
      }
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
      <h1>나의 여행후기</h1>
      <div className="select">
        <Form.Select aria-label="지역 정렬기준" onChange={setSelectedRegion}>
          <option value="allRegion">지역선택</option>
          <option value="allRegion">전국</option>
          <option value="Seoul">서울특별시</option>
          <option value="Busan">부산광역시</option>
          <option value="DaeGu">대구광역시</option>
          <option value="InCheon">인천광역시</option>
          <option value="DaeJeon">대전광역시</option>
          <option value="GwangJu">광주광역시</option>
          <option value="UlSan">울산광역시</option>
          <option value="SeJong">세종특별자치시</option>
          <option value="GyeongGi">경기도</option>
          <option value="GangWon">강원도</option>
          <option value="ChungBuk">충청북도</option>
          <option value="ChungNam">충청남도</option>
          <option value="JeonBuk">전라북도</option>
          <option value="JeonNam">전라남도</option>
          <option value="GyeongBuk">경상북도</option>
          <option value="GyeongNam">경상남도</option>
          <option value="JeJu">제주특별자치도</option>
          <option value="overseas">해외</option>
        </Form.Select>
      </div>
      <AddReviewBtn onClick={handleShow}>
        <EditOutlined /> 후기 작성
      </AddReviewBtn>
      <ReviewList
        loading={loading}
        reviews={reviewObjectByRegion && reviewObjectByRegion[selectedRegion]}
        setReviewKey={setReviewKey}
        setShowModal={setShowModal}
      />
      <ReviewModal
        show={showModal}
        handleClose={handleClose}
        reviewInfo={reviewKey && { ...reviewsObj[reviewKey], key: reviewKey }}
      />
    </ReviewContainer>
  );
}

export default Reviews;
