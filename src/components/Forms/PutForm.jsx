import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik"
import { basicSchema } from '../../schemas'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PutForm = (props) => {

  const [errors, setErrors] = useState();
  const [product, setProduct] = useState({ name: '' });
  const navigate = useNavigate();

  
  const initialValues = {
    name: product.name, 
  };


  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`http://rahimcode-001-site1.ftempurl.com/api/${props.controller}/${props.id}`);
        setProduct(response.data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            console.log(error.response.data);
            setErrors(error.response.data.message);
          } else {
            setErrors('An unexpected error occurred');
          }
        } else {
          setErrors('An unexpected error occurred');
        }
      }
    };
    getProduct();
  }, [props.controller, props.id]);


  const onSubmit =  (values) => {

    const putFetch = async () =>{
      await axios.put(`http://rahimcode-001-site1.ftempurl.com/api/${props.controller}/${props.id}`,values)
      .then(response => {
        toast.success(`${props.label} updated successfully`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        navigate(`/dashboard/${props.route}`)
      })
     
      .catch(error => {
       
        if (error.response.status === 400) {
          error.response.data.errors.map((err, index) => (        
           setErrors(err.errorMessage)
          ))
        }
        else if (error.response.status === 404) {
          navigate("*");
        }
        else {
          setErrors("An unexpected error occurred")
        }
       
      });     
     }
      putFetch();  
  }




  return (
    <>
      <div className="container-form">
        <div className="form-head">
          <h6>{props.tableName}</h6>
        </div>

        <Formik   enableReinitialize initialValues={initialValues}  onSubmit={onSubmit} >
          <Form>

            <div className="form-content">

              <div className="form-body">
                <label >{props.label} Name <span>*</span></label>
                <Field className="dash-input" type="text" id="name" name="name" placeholder=" Name"   />
              </div>
              <ErrorMessage name="name" component="div" className="error-message" />
              {errors && <div className="error-message">{errors}</div>}

              <button type="submit">Edit</button>
            </div>


          </Form>
        </Formik>
      </div >
    </>
  )
}

export default PutForm