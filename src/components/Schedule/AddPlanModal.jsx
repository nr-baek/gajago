import React from 'react';
import { Modal } from 'react-bootstrap';
import AddPlanForm from './AddPlanForm';

function AddPlanModal({ show, handleClose }) {
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>새로운 여행 일정을 추가하세요!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddPlanForm handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
}

export default AddPlanModal;
