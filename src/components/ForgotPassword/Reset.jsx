import { Formik,Form,Field } from 'formik'
import React, { useState } from 'react'

const Reset = () => {

    const [error,setError] = useState();
    const initialValues = {
        password :'',
        confirmPassword: ''
    }

    const onSubmit = async () =>{
         
        

    }
  return (
    <>
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
                <label className='email-label' > New Password </label>
                  <Field className="customInput " type="password" id="password" name="password" placeholder="Password" />
                </div>
                <div className="form-data">
                <label className='email-label' > Confirm Password </label>
                  <Field className="customInput " type="password" id="confirmPasswors" name="confirmPasswors" placeholder="Password" />
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