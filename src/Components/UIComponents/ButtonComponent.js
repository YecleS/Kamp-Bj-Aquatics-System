import React from 'react';
import '../Styles/ButtonComponent.css';

const ButtonComponent = ({buttonCustomClass, label, onClick}) => {
  return (
    <button className={`Button-component ${buttonCustomClass}`} onClick={onClick}>{label}</button>
  )
}

export default ButtonComponent
