import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const AdminLogin = () => {

    const navigate = useNavigate();
    const [error, setError] = useState();

    const initialValues = {
        userName: '',
        password: ''
    }

    const onSubmit = async (values) => {
        console.log(values);
        await axios.post(`https://localhost:7039/api/Accounts/login`, values)
            .then(res => navigate('/dashboard/index'))
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



    return (
        <>
            <div className="admin-login">
                <div className="background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>
                <Formik initialValues={initialValues} onSubmit={onSubmit} >
                    <Form>
                        <h3>Login Here</h3>

                        <label >Username</label>
                        <Field type='text' id='userName' name='userName' placeholder='Username' />

                        <label >Password</label>
                        <Field type='password' id='password' name='password' placeholder='Password' />

                        {error && <div className="error-message">{error}</div>}

                        <button type='submit' >Log In</button>

                    </Form>
                </Formik>
            </div>

        </>
    )
}

export default AdminLogin