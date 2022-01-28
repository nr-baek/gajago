import { EditOutlined } from '@ant-design/icons/lib/icons';
import React, { useCallback, useState } from 'react';
import { Form } from 'react-bootstrap';
import AddReviewModal from './AddReviewModal';
import ReviewList from './ReviewList';
import { AddReviewBtn, ReviewContainer } from './styles';

function Reviews() {
  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);

  return (
    <ReviewContainer>
      <h1>나의 여행후기</h1>
      <div className="select">
        <Form.Select aria-label="지역 정렬기준" defaultValue="allRegion">
          <option>지역선택</option>
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
      <ReviewList />
      <AddReviewModal show={show} handleClose={handleClose} />
    </ReviewContainer>
  );
}

export default Reviews;
