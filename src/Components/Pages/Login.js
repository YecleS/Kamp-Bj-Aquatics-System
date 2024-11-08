import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/Login.css';
import LoginIMG from '../Assets/loginImg.png';
import Logo from '../Assets/logo.png';
import ButtonComponent from '../UIComponents/ButtonComponent';

const Login = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  const errorMessage = () => {
    toast.error('Invalid Username and Password', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  const login = (values, { resetForm }) => {
    fetch('http://localhost/KampBJ-api/server/validateUser.php', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('username', data.username);
          localStorage.setItem('roleId', data.roleId);
          localStorage.setItem('userId', data.userId);
  
          // Navigate to the admin page
          navigate('/admin');
          resetForm();
        } else {
          // Show error message on failed login
          errorMessage();
        }
      })
      .catch(error => {
        console.error('Error:', error);
        errorMessage();
      });
  };
  
  

  const toggleSeePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <div className='login__controls-wrapper'>
          <div className='login__header'>
            <div className='login__logo-wrapper'>
              <img src={Logo} className='login__logo' alt="Logo" />
              <p className='login__logo-text'>Kamp BJ <br /><span>Aquatics</span></p>
            </div>
            <div className='login__title-wrapper'>
              <h2 className='login__title'>Welcome</h2>
              <p className='login__subtitle'>Are You Ready To Dive In?</p>
            </div>
          </div>

          <div className='login__body'>
            <Formik initialValues={initialValues} onSubmit={login} validationSchema={validationSchema}>
              {() => (
                <Form className='login__form-wrapper'>
                  <div className='login__input-field-wrapper'>
                    <p className='login__input-field-label'>Username</p>
                    <Field name='username' placeholder='Username' className='login__input-field' />
                    <ErrorMessage name='username' component='span' className='login__error' />
                  </div>

                  <div className='login__input-field-wrapper'>
                    <p className='login__input-field-label'>Password</p>
                    <Field type={isPasswordVisible ? 'text' : 'password'} name='password' placeholder='Password' className='login__input-field' />
                    <i className={`login__see-password-icon fa-solid ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`} onClick={toggleSeePassword}></i>
                    <ErrorMessage name='password' component='span' className='login__error' />
                  </div>

                  <button type='submit' className='login__button'>Login</button>
                </Form>
              )}
            </Formik>
            <ButtonComponent buttonCustomClass='login__signup-button' label='Don’t Have An Account?' onClick={() => navigate('/sign-up')} />
          </div>
        </div>

        <div className='login__img-wrapper'>
          <img src={LoginIMG} className='login__img' alt="Login" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
