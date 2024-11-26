import React from 'react';

const EditIconButton = ({ onClick }) => {
  return (
      <i className="bi bi-pencil-square" style={{ fontSize: '20px', cursor: 'pointer', color: 'blue' }}
      onClick={onClick}
      title="Edit" >
      </i>
  );
}

export default EditIconButton;