import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SliderPutForm = (props) => {

    const [error,setError] = useState();
    const [image,setImage] = useState();
    const [slider , setSlider] = useState();
    const navigate = useNavigate();
  console.log(image);

    useEffect(()=>{
        const getSlider = async () => {
            var response = await axios.get(`https://localhost:7039/api/Sliders/${props.id}`)
                     setSlider(response.data)
                     setImage(response.data.imageUri)
                     console.log(response.data);
        }
       getSlider();
    },[])

    const initialValues = {
        title: slider ? slider.title : '',
        secondTitle: slider ? slider.secondTitle : '',
        description: slider ? slider.description : '',
        buttonUrl: slider ? slider.buttonUrl :'',
        buttonText: slider ? slider.buttonText : '',
        bgColor: slider  ? slider.bgColor : '',
        imageFile: null
    }
const onSubmit = async (values)=>{
     
    const formData = new FormData();

    formData.append("title", values.title)
    formData.append("secondTitle", values.secondTitle)
    formData.append("description", values.description)
    formData.append("buttonUrl", values.buttonUrl)
    formData.append("buttonText", values.buttonText)
    formData.append("bgColor", values.bgColor)
    formData.append("imageFile", values.imageFile)

    try {
        const response = await axios.put(`https://localhost:7039/api/Sliders/${props.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log("Sliders successfully created", response.data);
        navigate("/dashboard/sliders")
    } catch (error) {
        if (error.response.status === 400) {
            error.response.data.errors.forEach(err => setError(err.errorMessage));
        } else if (error.response.status === 404) {
            navigate("*");
        } else {
            setError("An unexpected error occurred");
        }
    }
     
}

  return (
    <>
      <div className="slider-form">
                <div className="form-head">
                    <h6>Slider Edit</h6>
                </div>

                <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit} >

                    {({ setFieldValue }) => (
                        <Form>

                            <div className="form-content">

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-body">
                                            <label > First Title <span>*</span></label>
                                            <br />
                                            <Field className="dash-input" type="text" id="title" name="title" placeholder=" First Title" />
                                        </div>
                                        <ErrorMessage name="title" component="div" className="error-message" />
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-body">
                                            <label >Second Title <span>*</span></label>
                                            <br />
                                            <Field className="dash-input" type="text" id="secondTitle" name="secondTitle" placeholder=" Second Title" />
                                        </div>
                                        <ErrorMessage name="secondTitle" component="div" className="error-message" />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="form-body">
                                        <label >Description <span>*</span></label>
                                        <br />
                                        <Field className="dash-input" type="text" id="description" name="description" placeholder=" Description " />
                                    </div>
                                    <ErrorMessage name="description" component="div" className="error-message" />


                                    <div className="col-lg-4">  <div className="form-body">
                                        <label >Button Text <span>*</span></label>
                                        <br />
                                        <Field className="dash-input" type="text" id="buttonText" name="buttonText" placeholder=" Button Text " />
                                    </div>
                                        <ErrorMessage name="buttonText" component="div" className="error-message" />
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-body">
                                            <label >Button Url <span>*</span></label>
                                            <br />
                                            <Field className="dash-input" type="text" id="buttonUrl" name="buttonUrl" placeholder=" Button Url " />
                                        </div>
                                        <ErrorMessage name="buttonUrl" component="div" className="error-message" />

                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-body">
                                            <label >Background Color <span>*</span></label>
                                            <br />
                                            <Field className="dash-input" type="text" id="bgColor" name="bgColor" placeholder="#000000" />
                                        </div>
                                        <ErrorMessage name="bgColor" component="div" className="error-message" />

                                    </div>
                                </div>
                               <div className="form-body">
                                    <label >Slider Image <span>*</span></label>
                                    <input type="file" className="dash-input" id="imageFile" name="imageFile" onChange={(event) => {
                                        if (event != null) {
                                            setFieldValue("imageFile", event.target.files[0])
                                            setImage(URL.createObjectURL(event.target.files[0]))
                                        }
                                        else {
                                            setFieldValue("imageFile", null)
                                        }
                                    }} />

                                </div>
                                <ErrorMessage name="imageFile" component="div" className="error-message" />

                                <div className="preview-img ">
                                    {image && <img width={150} src={image} alt="" />}
                                </div>

                                {error && <div className="error-message">{error}</div>}

                                <button type="submit">Create</button>
                            </div>


                        </Form>
                    )}
                </Formik>
            </div >
    </>
  )
}

export default SliderPutForm