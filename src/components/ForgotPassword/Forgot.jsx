import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useState } from 'react'
import ConfirmModal from '../Modal/ConfirmModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgot = () => {

    const [error, setError] = useState();

    const initialValues = {
        email: ''
    }

    const onSubmit = async (values, { resetForm }) => {
        try {
            await axios.post(`https://watch-ecommerce-app.azurewebsites.net/api/Users/forgot-password`, values);
            resetForm();
            toast.success('Check your email', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            setError(null);

        } catch (error) {
            setError("An error occurred while sending the request.");
        }
    }



    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="container-own">
                <div className="login-page">
                    <div className="login-text">
                        <h2>Confirm Email</h2>
                        <p>Fill in below to verify email</p>
                    </div>
                    <div className="form-side">
                        <Formik initialValues={initialValues} onSubmit={onSubmit} >
                            <Form className='form-content'>
                                <div className="form-data">
                                    <label className='email-label' > Email Address </label>
                                    <Field className="customInput " type="email" id="email" name="email" placeholder="Email Address" />
                                </div>

                                {error && <div className="error-message">{error}</div>}
                                <div className="btn-side">
                                    <button className='w-100' type='submit' >Send</button>
                                </div>


                                <p className='return'>Return</p>
                            </Form>

                        </Formik>
                    </div>
                </div>
            </div>


           

        </>
    )
}

export default Forgot