import { Modal, Button } from 'react-bootstrap';
import React from 'react';

const DialogDelete = ({ item, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Body>
        Are you sure you want to delete this product?
        <br />
        <strong>{item?.productName}</strong>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DialogDelete;