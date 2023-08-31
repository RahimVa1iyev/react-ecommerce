import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { basicSchema } from '../../schemas/index';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostForm = (props) => {
  const [error, setError] = useState(null);
 
  const navigate = useNavigate();


  const initialValues = {
    name: ''
  }
  


  const onSubmit =  (values) => {
   
   const postFetch = async () =>{
    await axios.post(`https://localhost:7039/api/${props.controller}`, values)
    .then(response => {
      console.log("Brand created successfully");
      navigate(`/dashboard/${props.route}`)
    })
    .catch(error => {
      if (error.response.status === 400) {
        error.response.data.errors.map((err, index) => (
          setError(err.errorMessage)
        ))
      }
      else if (error.response.status === 404) {
        navigate("*")
      }
      else {
        setError("An unexpected error occurred")
      }

    });
   }
      postFetch();

   
  }
  return (
    <>
      <div className="container-form">
        <div className="form-head">
          <h6>{props.tableName}</h6>
        </div>

        <Formik initialValues={initialValues} validationSchema={basicSchema} onSubmit={onSubmit} >
          <Form>

            <div className="form-content">

              <div className="form-body">
                <label >{props.label} Name <span>*</span></label>
                <br/>
                <Field className="dash-input" type="text" id="name" name="name" placeholder=" Name" />
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

export default PostForm