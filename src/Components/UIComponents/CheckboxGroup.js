import React from 'react';
import { Field, ErrorMessage } from 'formik';

const CheckboxGroup = ({label, name, options}) => {
  return (
    <div className='checkbox-group'>
        <p className='checkbox-group__title'>{label}</p>
        {options.map(option => (
            <div key={option.value} className='checkbox-group__checkbox-wrapper'>
                <Field type='checkbox' name={name} value={option.value} className='checkbox-group__checkbox-field'/>
                <label htmlFor={option.value} className='checkbox-group__checkbox-label'>{option.label}</label>
            </div>
         ))}
        <ErrorMessage name={name} component='span' className='modal__input-field-error' />
    </div>
  )
}

export default CheckboxGroup
