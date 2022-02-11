import React, { useCallback, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AddReviewForm from './AddReviewForm';
import UnWrittenReviewList from './UnWrittenReviewList';

function AddReviewModal({ show, handleClose }) {
  const [tripInfo, setTripInfo] = useState({});
  const [closeQModalShow, setCloseModalShow] = useState(false);

  const selectTripToWriteReview = useCallback((plan) => {
    setTripInfo(plan);
  }, []);

  const resetTripInfo = useCallback(() => {
    setTripInfo({});
  }, []);

  const clickQModalCancel = useCallback(() => {
    setCloseModalShow(false);
  }, []);

  const clickQModalClose = useCallback(() => {
    setCloseModalShow(false);
    handleClose();
  }, [handleClose]);

  const QNAHandleClose = useCallback(() => {
    if (tripInfo.title) {
      setCloseModalShow(true);
    } else {
      handleClose();
    }
  }, [tripInfo.title, handleClose]);

  return (
    <>
      <Modal size="lg" show={show} onHide={QNAHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {tripInfo.title ? '[후기 작성] ' + tripInfo.title : '후기를 작성할 여행을 선택해주세요.'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tripInfo.title ? (
            <AddReviewForm
              QNAHandleClose={QNAHandleClose}
              tripInfo={tripInfo}
              resetTripInfo={resetTripInfo}
              handleClose={handleClose}
            />
          ) : (
            <UnWrittenReviewList handleClose={handleClose} selectTripToWriteReview={selectTripToWriteReview} />
          )}
        </Modal.Body>
      </Modal>
      <Modal show={closeQModalShow} onHide={clickQModalCancel} animation={false} centered backdrop="static">
        <div style={{ border: '5px solid #9b9b9b', boxShadow: '3px 5px 10px #5c5c5c' }}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>입력을 중단하고 창을 닫으시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={clickQModalCancel}>
              취소
            </Button>
            <Button variant="primary" onClick={clickQModalClose}>
              창 닫기
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default AddReviewModal;
