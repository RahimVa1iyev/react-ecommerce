import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import { FaAddressCard } from 'react-icons/fa';
import { HiPhone } from 'react-icons/hi';
import { HiOutlineMail } from 'react-icons/hi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Contact = () => {

  const [token, setToken] = useState(localStorage.getItem('authToken'))
  const [error, setError] = useState();
  const [user, setUser] = useState();
  const [info , setInfo] = useState();
  const navigate = useNavigate();


  const initialValues = {
    fullName: user && user.firstName + " " + user.lastName,
    email: user && user.email,
    phoneNumber: user && user.phoneNumber,
    subject: '',
    text: ''
  }
  const onSubmit = async (values, { resetForm }) => {
    console.log(values);
    if (token) {
      await axios.post(`https://watch-ecommerce-app.azurewebsites.net/api/Contacts`, values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          toast.success('Messge send successfully', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          resetForm();
        })
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
    else {
      toast.warning('You must register to send a Message', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }


  const getUser = async () => {

    if (token) {
      await axios.get('https://watch-ecommerce-app.azurewebsites.net/api/Users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setUser(response.data)
        })
        .catch(error => {
          console.log(error.response.data);
          console.error('An error occurred', error);
        });
    } else {
      console.log('Token has not found');
    }
  }

  const getInfo = async () => {
    var response = await axios.get('https://watch-ecommerce-app.azurewebsites.net/api/Infos/all')
       setInfo(response.data)
       console.log(response.data);
       
  }

  useEffect(() => {
    localStorage.getItem('adminToken') !== null && localStorage.removeItem('adminToken')
  }, [])

  useEffect(() => {
    getUser();
    getInfo();
  }, [])

  return (
    <>

      <ToastContainer
        position="bottom-right"
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
      <div className="container-own">
        <div className="contact-us">
          <div className="row align-items-start justify-content-between">
            <div className="col-lg-6">
              <div className="contact-info">
                <h2>Tell Us Your Message</h2>

                <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit} >
                  <Form>

                    <div className="contact-form">
                      <div className="form-data">
                        <label >Your Fullname <span>*</span></label>
                        <Field disabled={!!token} className="customInput text" type="text" id="fullName" name="fullName" placeholder="Full Name" />
                      </div>
                      <div className="form-data">
                        <label >Your Email <span>*</span></label>
                        <Field disabled={!!token} className="customInput text" type="email" id="email" name="email" placeholder="Email Address" />
                      </div>
                      <div className="form-data">
                        <label >Phone Number <span>*</span></label>
                        <Field disabled={!!token} className="customInput text" type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" />
                      </div>
                      <div className="form-data">
                        <label >Subject</label>
                        <Field className="customInput text" type="text" id="subject" name="subject" placeholder="Subject" />
                      </div>
                      <div className="form-data">
                        <label >Your Message</label>
                        <Field className="customInput area " as="textarea" id="text" name="text" placeholder="Message" />
                      </div>

                    </div>

                    {error && <div className="error-message text-danger">{error}</div>}

                    <button type="submit">Send Message</button>
                  </Form>
                </Formik>
              </div>
            </div>
            <div className="col-lg-5">

             {
              info && info.map((item,index)=>(
                <div className="contact-right">
                <div className="contact-right-head">
                  <h2>Contact Us</h2>
                  <p className='info'>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum formas human. qui sequitur mutationem consuetudium lectorum. Mirum est notare quam</p>
                </div>

                <div className="head">
                  <div className="title">
                    <FaAddressCard className='contact-icon-adres' /> <span>Address</span>
                  </div>
                  <p className='info'>{item.address}</p>
                </div>

                <div className="head">
                  <div className="title">
                    <HiPhone className='contact-icon-phone' /> <span>Phone</span>
                  </div>
                  <p className='info' >Mobile: {item.phoneNumber}</p>
                  <p className='info' >Hotline: {item.hotNumber}</p>
                </div>

                <div className="head">
                  <div className="title">
                    <HiOutlineMail className='contact-icon-email' /> <span> Email</span>
                  </div>
                  <p className='info'>{item.email}</p>
                </div>
              </div>
              ))
             }

            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Contact