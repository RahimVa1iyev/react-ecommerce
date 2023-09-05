import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { handleConfirmModalClose } from '../../control/modalSlice';
import { Field, Formik, Form } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ConfirmModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { confirmModalOpen, userId } = useSelector(store => store.modal)
    const [error,setError] = useState();

  

    const initialValues = {
        code: '',
        userName: ''
    }

    const onSubmit = async (values) => {
        console.log(values);
        await axios.post(`https://localhost:7039/api/Users/EmailConfirm`, values)
            .then(res => { console.log("Email Confirmed"); navigate('/login') })
            .catch(error => {
                console.log(error.response.data);
                if (error.response.status === 400) {
                    againConfirmCode()
                    error.response.data.errors.forEach(err => setError(err.errorMessage));
                  
                }

                else if (error.response.status === 404)
                    {
                    againConfirmCode()
                      setError(error.response.data.message)
                    }
            })
    }

    const againConfirmCode = async () => {
        const data= {userId : userId}
        await axios.post(`https://localhost:7039/api/Users/AgainEmailConfirm`, data)
            .then(res => { console.log("Code send again"); })
            .catch(err => console.log(err.response.data))
    }

    return (
        <>
            <Modal show={confirmModalOpen} >
                <Modal.Header>
                    <Modal.Title>Email Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} >
                        <Form className='form-content d-flex flex-column gap-3'>
                            <div className="form-data">
                                <Field className="confirmInput " type="text" id="code" name="code" placeholder="Confirm code" />
                            </div>
                            <div className="form-data">
                                <Field className="confirmInput " type="text" id="userName" name="userName" placeholder="Username" />
                            </div>
                            
                            {error && <div className="error-message">{error}</div>}

                             <button className='confirm-btn' type='submit' > Confirmed  </button>  

                        </Form>
                    </Formik>
                </Modal.Body>
                
            </Modal>
        </>
    );
}

export default ConfirmModal;