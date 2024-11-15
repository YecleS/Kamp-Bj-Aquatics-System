import React, { useState, useEffect } from 'react';
import '../Styles/RoleManagement.css';
import UpdateIcon from '../UIComponents/UpdateIcon';
import AddRoleModal from '../UIComponents/AddRoleModal';
import EditRoleModal from '../UIComponents/EditRoleModal';
import { ToastSuccess, ToastError } from '../UIComponents/ToastComponent';

const RoleManagement = () => {
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [currentRole, setCurrentRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;


  const fetchRoles = async () => {
    try {
      const response = await fetch(`${apiUrl}/KampBJ-api/server/fetchRoles.php`);
      const data = await response.json();

      // Group roles by roleId and consolidate access
      const roleMap = {};
      data.roles.forEach((item) => {
        if (!roleMap[item.roleId]) {
          roleMap[item.roleId] = {
            roleId: item.roleId,
            title: item.title,
            access: new Set(),
          };
        }
        roleMap[item.roleId].access.add(item.access);
      });

      // Convert roleMap to an array
      const uniqueRoles = Object.values(roleMap).map(role => ({
        ...role,
        access: Array.from(role.access), // Convert Set to Array
      }));

      setRoles(uniqueRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

    // Filter suppliers by name or category
    const filteredRoleData = roles
    .filter(role => {
      if (searchTerm) {
        const matchesRoleName = role.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAccess = role.access.some(access => access.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesRoleName || matchesAccess; // Match either role name or access
      }
      return true;
    })

  // Fetch roles and their access permissions
  useEffect(() => {
    fetchRoles();
  }, []);

  const toggleAddModal = () => {
    setIsAddRoleModalOpen(!isAddRoleModalOpen);
  };

  const toggleEditModal = (role) => {
    setIsEditRoleModalOpen(!isEditRoleModalOpen);
    setCurrentRole(role);
  };

  // Helper function to check if a specific access exists for a role
  const hasAccess = (role, accessName) => {
    return role.access.includes(accessName);
  };

  
  // Update role function
  const updateRole = async (updatedRole) => {
    
    try {
      const userId = localStorage.getItem('userId');
      const payload = { ...updatedRole, userId };
      const response = await fetch(`${apiUrl}/KampBJ-api/server/updateRole.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        // Update the role in the UI
        setRoles((prevRoles) =>
          prevRoles.map((role) =>
            role.roleId === updatedRole.roleId ? { ...role, ...updatedRole } : role
          )
        );
        ToastSuccess("Role Updated successfully!");
        setIsEditRoleModalOpen(false); // Close the modal
        fetchRoles();
      } else {
        ToastError('Failed to update role');
      }
    } catch (error) {
      ToastError('Error updating role:', error);
    }
    
  };

  return (
    <div className='role-management'>
      <div className='role-management__header'>
      <div className='role-mangement__left-controls-wrapper'>
          <div className='role-managament__search-wrapper'>
            <input type='text' placeholder='Search Roles or Access' value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}  className='role-management__input-field ' />
          </div>
        </div>
        <div className='role-management__right-controls-wrapper'>
          <button className='role-management__insert' onClick={toggleAddModal}>
            <i className="role-management__insert-icon fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <div className='role-management__body'>
        <div className='role-management__table-wrapper'>
          <table className='role-management__table'>
            <thead>
              <tr>
                <th className='role-management__table-th'>Name</th>
                <th className='role-management__table-th access-cell'>Dashboard</th>
                <th className='role-management__table-th access-cell'>Inventory</th>
                <th className='role-management__table-th access-cell'>Supplier</th>
                <th className='role-management__table-th access-cell'>Products</th>
                <th className='role-management__table-th access-cell'>POS</th>
                <th className='role-management__table-th access-cell'>Expenses</th>
                <th className='role-management__table-th access-cell'>User Management</th>
                <th className='role-management__table-th access-cell'>Reports</th>
                <th className='role-management__table-th access-cell'>Ledger</th>
                <th className='role-management__table-th access-cell'>Backup & Restore</th>
                <th className='role-management__table-th'></th>
              </tr>
            </thead>
            <tbody>
              {filteredRoleData.map(role => (
                <tr key={role.roleId} className='role-management__table-tr'>
                  <td className='role-management__table-td'>{role.title}</td>
                  <td className='role-management__table-td access-cell'>
                    {hasAccess(role, 'Dashboard') && <span className='check-mark'>&#10003;</span>}
                  </td>
                  <td className='role-management__table-td access-cell'>
                    {hasAccess(role, 'Inventory') && <span className='check-mark'>&#10003;</span>}
                  </td>
                  <td className='role-management__table-td access-cell'>
                    {hasAccess(role, 'Supplier') && <span className='check-mark'>&#10003;</span>}
                  </td>
                  <td className='role-management__table-td access-cell'>
                    {hasAccess(role, 'Products') && <span className='check-mark'>&#10003;</span>}
                  </td>
                  <td className='role-management__table-td access-cell'>
                    {hasAccess(role, 'Sales') && <span className='check-mark'>&#10003;</span>}
                  </td>
                  <td className='role-management__table-td access-cell'>
                    {hasAccess(role, 'Expenses') && <span className='check-mark'>&#10003;</span>}
                  </td>
                  <td className='role-management__table-td access-cell'>
                    {hasAccess(role, 'User Management') && <span className='check-mark'>&#10003;</span>}
                  </td>
                  <td className='role-management__table-td access-cell'>
                    {hasAccess(role, 'Reports') && <span className='check-mark'>&#10003;</span>}
                  </td>
                  <td className='role-management__table-td access-cell'>
                    {hasAccess(role, 'Ledger') && <span className='check-mark'>&#10003;</span>}
                  </td>
                  <td className='role-management__table-td access-cell'>
                    {hasAccess(role, 'Backup & Restore') && <span className='check-mark'>&#10003;</span>}
                  </td>
                  <td className='role-management__table-td'>
                    <UpdateIcon onClick={() => toggleEditModal(role)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddRoleModalOpen && <AddRoleModal onClick={toggleAddModal} refresh={fetchRoles} roles={roles} />}
      {isEditRoleModalOpen && <EditRoleModal currentRole={currentRole} onClose={toggleEditModal} onSubmit={updateRole} />}
    </div>
  );
};

export default RoleManagement;
