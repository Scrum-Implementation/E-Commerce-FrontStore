import React from 'react'

const Delete = ({ onClick }) => {
  return (
    <i className="bi bi-trash" style={{ fontSize: '20px', cursor: 'pointer', color: 'red' }}
      onClick={onClick}
      title="Delete" >
      </i>
  )
}

export default Delete
