import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import { ToastSuccess } from '../UIComponents/ToastComponent';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../Assets/logo.png';
import '../Styles/SignUp.css';
import DefaultImagePreview from '../Assets/image-preview.png';
import ButtonComponent from '../UIComponents/ButtonComponent';

const SignUp = () => {
    const [imagePreview, setImagePreview] = useState();
    const apiUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const toggleSeePassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    //Initial Values
    const initialValues = {
        contactNum: "",
        userImage: DefaultImagePreview,
        username: "",
        fullname: "",
        age: "",
        email: "",
        gender: "",
        address: '',
        password: "",
        confirmPassword: "",
    }

    //Validation, paki dagdagan nalang ng validation kung need pa
    const validationSchema = Yup.object({
        userImage: Yup.mixed().required('Image is Required'),
        username: Yup.string().required('Username is required'),
        fullname: Yup.string().required('Fullname is required'),
        age: Yup.number().required('Age is required'),
        email: Yup.string().required('Email is required').email('Invalid email'),
        gender: Yup.string().required('Gender is required'),
        address: Yup.string().required('Address is required'),    
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password')], 'Passwords do not match')
    })

    const handleImageChange = (event, setFieldValue) => {
      const file = event.target.files[0];
      setFieldValue('userImage', file);

      if(file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImagePreview(reader.result);
        }

        reader.readAsDataURL(file);
      }
    }

    //Handle the onClick for login
    const signup = (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('fullname', values.fullname);
      formData.append('age', values.age);
      formData.append('email', values.email);
      formData.append('contactNum', values.contactNum);
      formData.append('gender', values.gender);
      formData.append('address', values.address);
      formData.append('password', values.password);
      formData.append('userImage', values.userImage); // Append the image file
  
      fetch(`${apiUrl}/KampBJ-api/server/insertUserRegistration.php`, {
          method: 'POST',
          body: formData,
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              ToastSuccess('Sign Up Request Submitted');
              resetForm();
              setImagePreview(DefaultImagePreview); // Reset image preview to default
          } else {
              console.error(data.message);
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  };
  
  

  return (
    <div className='sign-up'>
      <div className='sign-up__container'>
        <div className='sign-up__controls-wrapper'>

          <div className='sign-up__header'>
            <div className='sign-up__logo-wrapper'>
              <img src={Logo} className='sign-up__logo'></img>
              <p className='sign-up__logo-text'>Kamp BJ <br></br><span>Aquatics</span></p>
            </div>
            <div className='sign-up__title-wrapper'>
              <h2 className='sign-up__title'>Join Us Now !</h2>
              <p className='sign-up__subtitle'>Are You Ready To Dive In ?</p>
            </div>
          </div>

          <div className='sign-up__body'>
            <Formik initialValues={initialValues} onSubmit={signup} validationSchema={validationSchema}>

              {({setFieldValue}) => (
                <Form className='sign-up__form-wrapper'>

                  <div className='sign-up__profile-image-field'>
                    <div className='sign-up__image-preview-wrapper'>
                      <img src = {imagePreview ? imagePreview : DefaultImagePreview} className='sign-up__image-preview' />                    
                    </div>

                    <div className='sign-up__image-input-field-wrapper'>
                      <input
                        type='file'
                        name='userImage'
                        accept='image/jpg, image/jpeg, image/png'
                        onChange={(event) => handleImageChange(event, setFieldValue)}
                        id='fileInput'
                        style={{ display: 'none' }}
                      />

                      <label htmlFor='fileInput' className='sign-up__image-input-field-label'>
                        <i className="fa-solid fa-upload"></i>
                      </label>

                      <ErrorMessage name='userImage' component='span' className='sign-up__error' />
                    </div>    
                  </div>

                  <div className='sign-up__input-field-wrapper username'>              
                        <Field type='text' name='username' placeholder='Username' className='sign-up__input-field' />
                        <ErrorMessage name='username' component='span' className='sign-up__error'/>
                      </div>


                  <div className='sign-up__input-field-wrapper fullname'>              
                    <Field type='text' name='fullname' placeholder='Full name' className='sign-up__input-field' />
                    <ErrorMessage name='fullname' component='span' className='sign-up__error'/>
                  </div>


                  <div className='sign-up__input-field-wrapper age'>              
                    <Field type='number' name='age' placeholder='Age' className='sign-up__input-field' />
                    <ErrorMessage name='age' component='span' className='sign-up__error'/>
                  </div>

                  <div className='sign-up__input-field-wrapper contactNum'>              
                    <Field type='text' name='contactNum' placeholder='Contact Number' className='sign-up__input-field' />
                    <ErrorMessage name='contactNum' component='span' className='sign-up__error'/>
                  </div> 


                  <div className='sign-up__input-field-wrapper email'>              
                    <Field type='text' name='email' placeholder='Email' className='sign-up__input-field' />
                    <ErrorMessage name='email' component='span' className='sign-up__error'/>
                  </div>

                  <div className="sign-up__gender-field">
                    <p className='sign-up__input-field-gender-title'>Gender: </p>
                    <div className='sign-up__radio-wrapper'>
                      <label>      
                        <Field type="radio" name="gender" value="female" />
                        Female
                      </label>
                      <label>
                        <Field type="radio" name="gender" value="male" />
                        Male
                      </label>
                    </div>
                    
                    <ErrorMessage name="gender" component="span" className="sign-up__error" />
                  </div>
                  
                  <div className='sign-up__input-field-wrapper email'>              
                    <Field type='text' name='address' placeholder='Address' className='sign-up__input-field' />
                    <ErrorMessage name='address' component='span' className='sign-up__error'/>
                  </div>

                  <div className='sign-up__input-field-wrapper'> 
                    <Field type={`${isPasswordVisible ? 'text': 'password'}`} name='password' placeholder='Password' className='sign-up__input-field' />
                    <i className={`sign-up__see-password-icon fa-solid ${isPasswordVisible ? 'fa-eye-slash':'fa-eye'}`} onClick={toggleSeePassword}></i>
                    <ErrorMessage name='password' component='span' className='sign-up__error'/>
                  </div>
                  
                  <div className='sign-up__input-field-wrapper'> 
                    <Field type={`${isPasswordVisible ? 'text': 'password'}`} name='confirmPassword' placeholder='Confirm Password' className='sign-up__input-field' />
                    <i className={`sign-up__see-password-icon fa-solid ${isPasswordVisible ? 'fa-eye-slash':'fa-eye'}`} onClick={toggleSeePassword}></i>
                    <ErrorMessage name='confirmPassword' component='span' className='sign-up__error'/>
                  </div>

                  <button type='submit' className='sign-up__button'>Register</button> 
                </Form>
              )}

            </Formik>
            <ButtonComponent buttonCustomClass='sign-up__login-button' label='Already Have An Account?' onClick={() => navigate('/')} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignUp
