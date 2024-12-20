import React from 'react';
import '../Styles/DeleteIcon.css';

const DeleteIcon = ({onClick}) => {

  return (
    <i className={`delete-icon fa-solid fa-rotate`} title='Archive' onClick={onClick}></i>
  )
}

export default DeleteIcon
