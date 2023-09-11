import { Formik ,Form,Field,ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMessage, getMessages, responseMessage } from '../../control/fetchSlice';
import { ToastContainer, toast } from 'react-toastify';

const MessageForm = (props) => {

    const [error,setError] =useState();
    const {message} = useSelector(store => store.fetch)
    const [text ,setTtext] =useState(); 
    const dispatch = useDispatch();


    const initialValues = {
       subject : message && message.subject,
       note : message && message.note,
       response : ''
    }

    const onSubmit = async ({resetForm}) =>{
        const data = {id : props.id , response : text}
         
      
        dispatch(responseMessage(data))

     
        resetForm();
    }

    const areaHandle = (e) => setTtext(e.target.value)

    useEffect(()=>{
        dispatch(getMessage(props.id))
    },[])

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
        theme="light"
      />
            <div className="product-form">
        <div className="form-head">
          <h6>Response Message</h6>
        </div>

        <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit} >
          <Form>

            <div className="form-content">

              <div className="form-body">
                <label >Subject </label>
                <br/>
                <Field value ={initialValues.subject} className="dash-input" type="text" id="subject" name="subject" placeholder=" Subject" />
              </div>

              <div className="form-body">
                <label >Message </label>
                <br/>
                <textarea  value={initialValues.note} className="dash-input"  id="note" name="note" placeholder=" Message" />
              </div>
              <div className="form-body">
                <label >Response</label>
                <br/>
                <textarea  onChange={areaHandle} className="dash-input"   id="response" name="response" placeholder=" Message" />
              </div>
              <ErrorMessage name="name" component="div" className="error-message" />
              {error && <div className="error-message">{error}</div>}

              <button type="submit">Create</button>
            </div>


          </Form>
        </Formik>
      </div >
    </>
  )
}

export default MessageForm