import React from 'react';
import '../Styles/DeleteIcon.css';
import { useLocation } from 'react-router-dom';


const DeleteIcon = ({onClick}) => {
    const location = useLocation();

    const staffLocation = location.pathname.startsWith('/staff');

  return (
    <i className={`delete-icon fa-solid fa-trash ${staffLocation ? 'disable':''}`} onClick={onClick}></i>
  )
}

export default DeleteIcon
