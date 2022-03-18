import React, { useCallback, useState } from 'react';
import { Modal } from 'react-bootstrap';
import PlanForm from './PlanForm';
import TripInfo from './TripInfo';

function ScheduleModal({ showModal, handleClose, modalPlanData, setModalInfo }) {
  const [showEditForm, setShowEditForm] = useState(false);

  const closeForm = useCallback(() => {
    if (showEditForm) {
      setShowEditForm(false);
    } else {
      handleClose();
    }
  }, [showEditForm, setShowEditForm, handleClose]);

  return (
    <Modal size="lg" show={showModal} onHide={closeForm}>
      {modalPlanData?.title && !showEditForm ? (
        <TripInfo
          planData={modalPlanData}
          handleClose={handleClose}
          setShowEditForm={setShowEditForm}
          editable={true}
        />
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>
              {showEditForm ? '여행 일정 내용을 수정하세요!' : '새로운 여행 일정을 추가하세요!'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PlanForm
              closeForm={closeForm}
              planData={modalPlanData}
              showEditForm={showEditForm}
              setModalInfo={setModalInfo}
            />
          </Modal.Body>
        </>
      )}
    </Modal>
  );
}

export default ScheduleModal;
