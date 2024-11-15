import React from 'react';
import '../Styles/DateControls.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DateSelection = ({onChange, displayDate}) => {
  return (
    <div className='dashboard-control'>
      <DatePicker
        onChange={onChange}
        maxDate={new Date()}
        dateFormat="yyyy-MM-dd"
        placeholderText='Select A Date'
        className='dashboard-control__date-picker'
      />

      <p className='dashboard-control__display-date'>{displayDate}</p>
    </div>
  )
}

export const MonthSelection = ({onChange, displayDate}) => {
  return (
    <div className='dashboard-control'>
      <DatePicker
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        showMonthYearPicker
        maxDate={new Date()}
        placeholderText='Select A Month'
        className='dashboard-control__date-picker'
      />

      <p className='dashboard-control__display-date'>{displayDate}</p>
    </div>
  )
}

export const YearSelection = ({onChange, displayDate}) => {
  return (
    <div className='dashboard-control'>
      <DatePicker
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        showYearPicker
        maxDate={new Date()}
        placeholderText='Select A Year'
        className='dashboard-control__date-picker'
      />
      
      <p className='dashboard-control__display-date'>{displayDate}</p>
    </div>
  )
}
