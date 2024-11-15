import React, { useState, useEffect } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import '../Styles/Modal.css';
import { ToastSuccess, ToastError } from '../UIComponents/ToastComponent';

const EditUserModal = ({ onClick, user, refresh }) => {
  const [roles, setRoles] = useState([]);
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

  // Fetch roles and their access permissions
  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <i className="modal__close-icon fa-solid fa-xmark" onClick={onClick}></i>

        <div className='modal__body'>
          <Formik
            initialValues={{
              userId: user?.userId || '', // Include userId
              username: user?.username || '',
              role: user?.roleTitle || '',
              email: user?.email || '',
              contact: user?.contactNum || '',
              address: user?.address || ''
            }}
            onSubmit={async (values) => {
                try {
                  // Find the roleId corresponding to the selected role title
                  const selectedRole = roles.find(role => role.title === values.role);
                  const roleId = selectedRole ? selectedRole.roleId : '';
              
                  // Create FormData and append values
                  const formData = new FormData();
                  formData.append('userId', values.userId);
                  formData.append('username', values.username);
                  formData.append('roleId', roleId); // Append roleId instead of role title
                  formData.append('email', values.email);
                  formData.append('contact', values.contact);
                  formData.append('address', values.address);
              
                  // Submit the form data to the server
                  const response = await fetch(`${apiUrl}/KampBJ-api/server/updateUser.php`, {
                    method: 'POST',
                    body: formData,
                  });
              
                  const result = await response.json();
                  if (result.success) {
                    ToastSuccess('User updated successfully');
                    onClick();
                    refresh();
                  } else {
                    ToastError('Error updating user:', result.message);
                    // Optionally, show an error notification
                  }
                } catch (error) {
                  ToastError('Error submitting form:', error);
                }
              }}
              
          >
            <Form className='modal__form'>
              <div className='modal__input-field-wrapper'>
                <Field type='text' name='username' placeholder='Username' className='modal__input-field' />
                <ErrorMessage name='username' component='span' className='modal__input-field-error' />
              </div>

              <div className='modal__input-field-wrapper'>
                <Field as='select' name='role' className='modal__input-field'>
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.roleId} value={role.title}>
                      {role.title}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name='role' component='span' className='modal__input-field-error' />
              </div>

              <div className='modal__input-field-wrapper'>
                <Field type='email' name='email' placeholder='Email' className='modal__input-field' />
                <ErrorMessage name='email' component='span' className='modal__input-field-error' />
              </div>

              <div className='modal__input-field-wrapper'>
                <Field type='text' name='contact' placeholder='Contact No.' className='modal__input-field' />
                <ErrorMessage name='contact' component='span' className='modal__input-field-error' />
              </div>

              <div className='modal__input-field-wrapper'>
                <Field type='text' name='address' placeholder='Address' className='modal__input-field' />
                <ErrorMessage name='address' component='span' className='modal__input-field-error' />
              </div>

              <button type='submit' className='modal__insert'>Update</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default EditUserModal;
