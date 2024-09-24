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

  //Initial Values
  const initialValues = {
    username: "",
    password: "",
  }


  //Validation
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  })


  //Error Message
  const errorMessage = () => {
    toast.error(' Invalid Username and Password', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      });
  }

  //Handle the onClick for login
  const login = (values, {resetForm}) => {
    if (values.username === 'owner' && values.password === 'owner') {
      //Navigate to admin page
      navigate('/admin');
      resetForm();
    } else if (values.username === 'staff' && values.password === 'staff') {
        //Navigate to staff page
        navigate('/staff');
        resetForm();
    } else {
        errorMessage();
    }
  }

  const toggleSeePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className='login'>
      <div className='login__container'>
        <div className='login__controls-wrapper'>

          <div className='login__header'>
            <div className='login__logo-wrapper'>
              <img src={Logo} className='login__logo'></img>
              <p className='login__logo-text'>Kamp BJ <br></br><span>Aquatics</span></p>
            </div>
            <div className='login__title-wrapper'>
              <h2 className='login__title'>Welcome</h2>
              <p className='login__subtitle'>Are You Ready To Dive In ?</p>
            </div>
          </div>

          <div className='login__body'>
            <Formik initialValues={initialValues} onSubmit={login} validationSchema={validationSchema}>
              {() => (
                <Form className='login__form-wrapper'>

                  <div className='login__input-field-wrapper'>
                    <p className='login__input-field-label'>Username</p>               
                    <Field name='username' placeholder='Username' className='login__input-field' />
                    <ErrorMessage name='username' component='span' className='login__error'/>
                  </div>

                  <div className='login__input-field-wrapper'>
                    <p className='login__input-field-label'>Password</p>   
                    <Field type={`${isPasswordVisible ? 'text': 'password'}`} name='password' placeholder='Password' className='login__input-field' />
                    <i className={`login__see-password-icon fa-solid ${isPasswordVisible ? 'fa-eye-slash':'fa-eye'}`} onClick={toggleSeePassword}></i>
                    <ErrorMessage name='password' component='span' className='login__error'/>
                  </div>
                  
                  <button type='submit' className='login__button'>Login</button>
                </Form>
              )}
            </Formik>
            <ButtonComponent buttonCustomClass='login__signup-button' label='Dont Have An Account ?' onClick={() => navigate('/sign-up')} />
          </div>
        </div>

          <div className='login__img-wrapper'>
            <img src={LoginIMG} className='login__img'></img>
          </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login
