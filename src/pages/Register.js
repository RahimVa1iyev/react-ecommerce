import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import ConfirmModal from '../components/Modal/ConfirmModal';
import { useDispatch } from 'react-redux';
import { createUser } from '../control/modalSlice';
const Register = () => {
    const [error, setError] = useState();
    const dispatch = useDispatch();


    const initialValues = {
        firstname: '',
        lastname: '',
        userName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    }

    const onSubmit = async (values) => {
        console.log(values);
       dispatch(createUser(values))
    }

    return (
        <>

            <div className="container-own">
                <div className="register-page">
                    <div className="register-text">
                        <h2>Create Account</h2>
                        <p>Please Register using account detail bellow</p>
                    </div>

                    <div className="form-side">
                        <Formik initialValues={initialValues} onSubmit={onSubmit} >
                            <Form className='form-content'>
                                <div className="form-data">
                                    <Field className="customInput " type="text" id="firstname" name="firstname" placeholder="First Name" />
                                </div>
                                <div className="form-data">
                                    <Field className="customInput " type="text" id="lastname" name="lastname" placeholder="Last Name" />
                                </div>
                                <div className="form-data">
                                    <Field className="customInput " type="text" id="userName" name="userName" placeholder="User Name" />
                                </div>
                                <div className="form-data">
                                    <Field className="customInput " type="email" id="email" name="email" placeholder="Email" />
                                </div>
                                <div className="form-data">
                                    <Field className="customInput " type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" />
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="form-data">
                                        <Field className="customInput " type="password" id="password" name="password" placeholder="Password" />
                                    </div>
                                    <div className="form-data">
                                        <Field className="customInput " type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" />
                                    </div>
                                </div>
                                {error && <div className="error-message">{error}</div>}
                                <div className="btn-side">
                                    <button type='submit' >Create</button>

                                </div>
                                <p >Return to Store</p>
                            </Form>

                        </Formik>
                    </div>
                </div>
            </div>

            <ConfirmModal data = {1} />

        </>
    )
}

export default Register