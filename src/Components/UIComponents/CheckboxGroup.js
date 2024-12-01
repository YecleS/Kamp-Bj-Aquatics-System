import React, { useEffect } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import '../Styles/CheckboxGroup.css';

const CheckboxGroup = ({ label, name, options, selectedCategories = [] }) => {
  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    // Set initial values if selectedCategories is provided and form field is empty
    if (selectedCategories.length > 0 && (!values[name] || values[name].length === 0)) {
      setFieldValue(name, selectedCategories.map(String)); // Ensure all are strings
    }
  }, [selectedCategories, setFieldValue, name, values]);

  return (
    <div className='checkbox-group'>
      <p className='checkbox-group__title'>{label}</p>
      <div>
        {options.map(option => {
          const isChecked = values[name]?.includes(String(option.value)); // Explicitly check as a string
          return (
            <div key={option.value} className='checkbox-group__checkbox-wrapper'>
              <Field
                type='checkbox'
                id={option.value}
                name={name}
                value={option.value}
                className='checkbox-group__checkbox-field'
                checked={isChecked}
                onChange={({ target }) => {
                  const currentValues = Array.isArray(values[name]) ? values[name] : [];
                  const nextValues = target.checked
                    ? [...currentValues, String(option.value)] // Add to array if checked
                    : currentValues.filter(value => value !== String(option.value)); // Remove from array if unchecked
                  
                  setFieldValue(name, nextValues); // Update formik state with new values
                }}
              />
              <label htmlFor={option.value} className='checkbox-group__checkbox-label'>
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
      <ErrorMessage name={name} component='span' className='modal__input-field-error' />
    </div>
  );
};

export default CheckboxGroup;
