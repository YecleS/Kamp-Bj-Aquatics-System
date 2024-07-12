import React from 'react';
import '../Styles/Notification.css';
import { NavLink } from 'react-router-dom';

const Notification = () => {

    const notificationData = [
        {id: 1, message:'Aquarium is low on stocks', time: '10 mins ago'},
        {id: 2, message:'Cherry is low on stocks', time: '20 mins ago'},
        {id: 3, message:'Soil is low on stocks', time: '30 mins ago'},
        {id: 4, message:'Gold Fish is low on stocks', time: '40 mins ago'},
        {id: 5, message:'Mirk is low on stocks', time: '50 mins ago'},
        {id: 6, message:'Mirk is low on stocks', time: '50 mins ago'},
        {id: 7, message:'Mirk is low on stocks', time: '50 mins ago'},
        {id: 8, message:'Mirk is low on stocks', time: '50 mins ago'},
    ];

  return (
    <div className='notification'>
        <div className='notification__body'>
            <table className='notification__table'>
                <tbody>
                    {notificationData.map((notification) => (
                        <tr key={notification.id} className='notification__tr'>
                            <td className='notification__td'>
                                {notification.message} 
                                    <br />
                                <span>{notification.time}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default Notification
