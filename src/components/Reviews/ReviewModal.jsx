import React, { useCallback, useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReviewForm from './ReviewForm';
import ReviewInfo from './ReviewInfo';
import UnWrittenReviewList from './UnWrittenReviewList';

function ReviewModal({ show, handleClose, reviewInfo }) {
  const [newTripInfo, setNewTripInfo] = useState({});
  const [showForm, setShowForm] = useState(false);

  const selectTripToWriteReview = useCallback((plan) => {
    setShowForm(true);
    setNewTripInfo(plan);
  }, []);

  const resetTripInfo = useCallback(() => {
    setNewTripInfo({});
  }, []);

  const closeModal = useCallback(() => {
    if (showForm) {
      if (window.confirm('입력을 중단하시겠습니까?')) {
        handleClose();
        setShowForm(false);
      }
    } else {
      handleClose();
    }
  }, [showForm, handleClose]);

  return (
    <>
      <Modal size="lg" show={show} onHide={closeModal}>
        {!showForm && reviewInfo && reviewInfo.reviewTitle ? (
          <ReviewInfo reviewInfo={reviewInfo} setShowForm={setShowForm} handleClose={handleClose} />
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                {reviewInfo && reviewInfo.tripTitle
                  ? `${'[후기 수정] ' + reviewInfo.tripTitle}`
                  : newTripInfo.title
                  ? `${'[후기 작성] ' + newTripInfo.title}`
                  : '후기를 작성할 여행을 선택해주세요.'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {reviewInfo && reviewInfo.tripTitle ? (
                <ReviewForm
                  QNAHandleClose={closeModal}
                  tripInfo={newTripInfo}
                  resetTripInfo={resetTripInfo}
                  handleClose={handleClose}
                />
              ) : newTripInfo.title ? (
                <ReviewForm
                  QNAHandleClose={closeModal}
                  tripInfo={newTripInfo}
                  resetTripInfo={resetTripInfo}
                  handleClose={handleClose}
                />
              ) : (
                <UnWrittenReviewList handleClose={handleClose} selectTripToWriteReview={selectTripToWriteReview} />
              )}
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}

export default ReviewModal;
