import React, { useState } from 'react';
import '../Styles/RoleManagement.css';
import UpdateIcon from '../UIComponents/UpdateIcon';
import DeleteIcon from '../UIComponents/DeleteIcon';
import AddRoleModal from '../UIComponents/AddRoleModal';
import EditRoleModal from '../UIComponents/EditRoleModal';

const RoleManagement = () => {
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);

  const toggleAddModal = () => {
    setIsAddRoleModalOpen(!isAddRoleModalOpen);
  }

  const toggleEditModal = () => {
    setIsEditRoleModalOpen(!isEditRoleModalOpen);
  }

  return (
    <div className='role-management'>
      <div className='role-management__header'>
        <div className='role-management__right-controls-wrapper'>
          <button className='role-management__insert' onClick={toggleAddModal}><i className="role-management__insert-icon fa-solid fa-plus"></i></button>
        </div>
      </div>

      <div className='role-management__body'>
        <div className='role-management__table-wrapper'>
          <table className='role-management__table'>
            <thead>
              <tr>
                <th className='role-management__table-th'>Name</th>
                <th className='role-management__table-th access-cell'>Inventory</th>
                <th className='role-management__table-th access-cell'>Products</th>
                <th className='role-management__table-th access-cell'>POS</th>
                <th className='role-management__table-th access-cell'>Expenses</th>
                <th className='role-management__table-th access-cell'>User Management</th>
                <th className='role-management__table-th access-cell'>Reports</th>
                <th className='role-management__table-th access-cell'>Ledger</th>
                <th className='role-management__table-th'></th>
              </tr>
            </thead>
            <tbody>
              <tr className='role-management__table-tr' >
                  <td className='role-management__table-td'>Manager</td>
                  <td className='role-management__table-td access-cell'><span className='check-mark'>&#10003;</span></td>
                  <td className='role-management__table-td access-cell'><span className='check-mark'>&#10003;</span></td>
                  <td className='role-management__table-td access-cell'></td>
                  <td className='role-management__table-td access-cell'><span className='check-mark'>&#10003;</span></td>
                  <td className='role-management__table-td access-cell'></td>
                  <td className='role-management__table-td access-cell'><span className='check-mark'>&#10003;</span></td>
                  <td className='role-management__table-td access-cell'></td>
                  <td className='role-management__table-td'> <UpdateIcon onClick={toggleEditModal}/></td>
              </tr>
              <tr className='role-management__table-tr' >
                  <td className='role-management__table-td'>Supervisor</td>
                  <td className='role-management__table-td access-cell'><span className='check-mark'>&#10003;</span></td>
                  <td className='role-management__table-td access-cell'><span className='check-mark'>&#10003;</span></td>
                  <td className='role-management__table-td access-cell'></td>
                  <td className='role-management__table-td access-cell'><span className='check-mark'>&#10003;</span></td>
                  <td className='role-management__table-td access-cell'><span className='check-mark'>&#10003;</span></td>
                  <td className='role-management__table-td access-cell'></td>
                  <td className='role-management__table-td access-cell'><span className='check-mark'>&#10003;</span></td>
                  <td className='role-management__table-td'> <UpdateIcon onClick={toggleEditModal}/></td>
              </tr>
              <tr className='role-management__table-tr' >
                  <td className='role-management__table-td'>Owner</td>
                  <td className='role-management__table-td access-cell'><span className='check-mark'>&#10003;</span></td>
                  <td className='role-management__table-td access-cell'><span className='check-mark'>&#10003;</span></td>
                  <td className='role-management__table-td access-cell'><span className='check-mark'>&#10003;</span></td>
                  <td className='role-management__table-td access-cell'><span className='check-mark'>&#10003;</span></td>
                  <td className='role-management__table-td access-cell'><span className='check-mark'>&#10003;</span></td>
                  <td className='role-management__table-td access-cell'><span className='check-mark'>&#10003;</span></td>
                  <td className='role-management__table-td access-cell'><span className='check-mark'>&#10003;</span></td>
                  <td className='role-management__table-td'> <UpdateIcon onClick={toggleEditModal}/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {isAddRoleModalOpen && <AddRoleModal onClick={toggleAddModal}/>}
      {isEditRoleModalOpen && <EditRoleModal onClick={toggleEditModal} />}
    </div>
  )
}

export default RoleManagement
