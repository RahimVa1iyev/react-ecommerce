import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const AdminPost = () => {

  const [error, setError] = useState();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('adminToken'))

  const initialValues = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    role: ''
  }

  const onSubmit = async (values) => {

    await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/Accounts`, values, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => navigate('/dashboard/admins'))
      .catch(error => {
        if (error.response.status === 400)
        
         { console.log(error.response.data);}
        else if (error.response.status === 404)
          navigate("*")
        else {
          console.log("An unexpected error occurred ");
        }
      })


  }

  useEffect(() => {
    localStorage.getItem('adminToken') === null && navigate('/dashboard/login')
  })

  return (
    <>
      <div className="admin-login">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} >
          <Form>
            <h3>Register Here</h3>
            <div className="row">

              <div className="col-lg-6"><label >Firstname</label>
                <Field type='text' id='firstName' name='firstName' placeholder='Firstname' /></div>

              <div className="col-lg-6">   <label >Lastname</label>
                <Field type='text' id='lastName' name='lastName' placeholder='Lastname' /></div>
            </div>

            <div className="row">
              <div className="col-lg-6"> <label >Username</label>
                <Field type='text' id='userName' name='userName' placeholder='Username' /></div>
              <div className="col-lg-6"> <label >Role</label>
                <Field type='text' id='role' name='role' placeholder='Role' /></div>
            </div>

            <label >Password</label>
            <Field type='password' id='password' name='password' placeholder='Password' />

            {error && <div className="error-message">{error}</div>}


            <button type='submit' >Register</button>

          </Form>
        </Formik>
      </div>

    </>
  )
}

export default AdminPost