import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ConfirmModal from '../components/Modal/ConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../control/modalSlice';
import { store } from '../store';
import { registerSchema } from '../schemas';
const Register = () => {
    const dispatch = useDispatch();
    const { errors } = useSelector(store => store.modal)


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
        console.log("error", errors);
    }

    useEffect(() => {
        localStorage.getItem('adminToken') !== null && localStorage.removeItem('adminToken')
    }, [])
    return (
        <>

            <div className="container-own">
                <div className="register-page">
                    <div className="register-text">
                        <h2>Create Account</h2>
                        <p>Please Register using account detail bellow</p>
                    </div>

                    <div className="form-side">
                        <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={onSubmit} >
                            <Form className='form-content'>
                                <div className="form-data">
                                    <Field className="customInput " type="text" id="firstname" name="firstname" placeholder="First Name" />
                                </div>
                                <ErrorMessage name="firstname" component="div" className="error-message text-danger " />

                                <div className="form-data">
                                    <Field className="customInput " type="text" id="lastname" name="lastname" placeholder="Last Name" />
                                </div>
                                <ErrorMessage name="lastname" component="div" className="error-message text-danger " />

                                <div className="form-data">
                                    <Field className="customInput " type="text" id="userName" name="userName" placeholder="User Name" />
                                </div>
                                <ErrorMessage name="userName" component="div" className="error-message text-danger " />

                                <div className="form-data">
                                    <Field className="customInput " type="email" id="email" name="email" placeholder="Email" />
                                </div>
                                <ErrorMessage name="email" component="div" className="error-message text-danger " />

                                <div className="form-data">
                                    <Field className="customInput " type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" />
                                </div>
                                <ErrorMessage name="phoneNumber" component="div" className="error-message text-danger " />

                                <div className="row  justify-content-between">
                                    <div className="col-lg-6 col-12">
                                        <div className="form-data">
                                            <Field className="customInput " type="password" id="password" name="password" placeholder="Password" />
                                        </div>
                                        <ErrorMessage name="password" component="div" className="error-message text-danger " />

                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-data">
                                            <Field className="customInput " type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" />
                                        </div>
                                        <ErrorMessage name="confirmPassword" component="div" className="error-message text-danger pt-2 " />

                                    </div>
                                </div>
                                {errors && <div className="error-message text-danger">{errors}</div>}
                                <div className="btn-side">
                                    <button type='submit' >Create</button>

                                </div>
                                <p >Return to Store</p>
                            </Form>

                        </Formik>
                    </div>
                </div>
            </div>

            <ConfirmModal data={1} />

        </>
    )
}

export default Register