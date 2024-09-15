import React from 'react';
import { Field, ErrorMessage } from 'formik';
import '../Styles/CheckboxGroup.css'

const CheckboxGroup = ({label, name, options}) => {
  return (
    <div className='checkbox-group'>
        <p className='checkbox-group__title'>{label}</p>
        <div className='checkbox-group__field-label-wrapper'>
          {options.map(option => (
              <div key={option.value} className='checkbox-group__checkbox-wrapper'>
                  <Field type='checkbox' name={name} value={option.value} className='checkbox-group__checkbox-field'/>
                  <label htmlFor={option.value} className='checkbox-group__checkbox-label'>{option.label}</label>
              </div>
          ))}
        </div>
        
        <ErrorMessage name={name} component='span' className='modal__input-field-error' />
    </div>
  )
}

export default CheckboxGroup
