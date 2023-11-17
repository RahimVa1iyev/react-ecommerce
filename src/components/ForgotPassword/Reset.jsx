import axios from 'axios';
import { Formik, Form, Field } from 'formik'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Reset = () => {

  const [error, setError] = useState();

  const { id } = useParams();
  const { token } = useParams();

  const navigate = useNavigate()

  const initialValues = {
    password: '',
    confirmPassword: ''
  }

  const onSubmit = async (values, { resetForm }) => {
    const data = {
      userId: id,
      token: token,
      password: values.password,
      confirmPassword: values.confirmPassword

    };

    try {
      await axios.post(`https://watch-ecommerce-app.azurewebsites.net/api/Users/reset-password`, data);
      toast.success('Password changed succesfully', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      resetForm();
      console.log("Forgot", values.email);
      setError(null);
      localStorage.removeItem('authToken');
      navigate('/login')

    } catch (error) {
      console.log(error.response.data);
      setError("An error occurred while sending the request.");
    }


  }

  return (
    <>

    
      <div className="container-own">
        <div className="login-page">
          <div className="login-text">
            <h2>Reset Password</h2>
            <p>Please be careful when typing the password</p>
          </div>

          <div className="form-side">
            <Formik initialValues={initialValues} onSubmit={onSubmit} >
              <Form className='form-content'>
                <div className="form-data">
                  <label className='email-label' > New Password </label>
                  <Field className="customInput " type="password" id="password" name="password" placeholder="Password" />
                </div>
                <div className="form-data">
                  <label className='email-label' > Confirm Password </label>
                  <Field className="customInput " type="password" id="confirmPassword" name="confirmPassword" placeholder="Password" />
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="btn-side">
                  <button type='submit' >Reset Password</button>

                </div>


              </Form>

            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reset