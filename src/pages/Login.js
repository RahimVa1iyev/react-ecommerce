import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin, setToken } from '../control/fetchSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setSelectedNav, setSelectedRoute } from '../control/navSlice';


const Login = () => {

  const [error, setError] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const initialValues = {
    userName: '',
    password: ''
  }

  const onSubmit = async (values) => {

    //
    await axios.post(`https://localhost:7039/api/Users/login`, values)
      .then(res =>  {  localStorage.setItem('authToken', res.data.token); dispatch(setToken(res.data.token)); navigate('/') })

      .catch(error => {
        if (error.response.status === 400)
          error.response.data.errors.forEach(err => setError(err.errorMessage));
        else if (error.response.status === 404)
          navigate("*")
        else {
          console.log("An unexpected error occurred ");
        }
      })
  }

  useEffect(()=>{
    localStorage.getItem('adminToken') !==null && localStorage.removeItem('adminToken')
 },[])
  return (
    <>

<ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
      <div className="container-own">
        <div className="login-page">
          <div className="login-text">
            <h2>Login</h2>
            <p>Please login using account detail bellow</p>
          </div>

          <div className="form-side">
            <Formik initialValues={initialValues} onSubmit={onSubmit} >
              <Form className='form-content'>
                <div className="form-data">
                  <Field className="customInput " type="text" id="userName" name="userName" placeholder="User Name" />
                </div>
                <div className="form-data">
                  <Field className="customInput " type="password" id="password" name="password" placeholder="Password" />
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="btn-side">
                  <button type='submit' >Sign In</button>
                  <Link to='/forgot-password' className='link-forgot' onClick={()=>{

dispatch(setSelectedNav('Forgot Password'))
dispatch(setSelectedRoute(`/forgot-password`))
                  }} >Forgot your password?</Link>
                </div>


                <Link to='/register'  onClick={()=>{

dispatch(setSelectedNav('Register'))
dispatch(setSelectedRoute(`/register`))
                  }} className='create-account'>Create account</Link>
              </Form>

            </Formik>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login