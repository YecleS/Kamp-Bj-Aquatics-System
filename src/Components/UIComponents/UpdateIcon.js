import React from 'react';
import '../Styles/UpdateIcon.css';

const UpdateIcon = ({onClick}) => {
  return (
    <i className="update-icon fa-solid fa-pen-to-square" onClick={onClick}></i>
  )
}

export default UpdateIcon
