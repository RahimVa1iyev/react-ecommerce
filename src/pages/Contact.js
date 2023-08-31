import React from 'react'
import { Formik, Form, Field } from 'formik';
import { FaAddressCard } from 'react-icons/fa';
import { HiPhone } from 'react-icons/hi';
import { HiOutlineMail } from 'react-icons/hi';

const initialValues = {
  name: '',
  email: '',
  subject: '',
  note: ''
}

const onSubmit = (values) => {
  console.log(values);
}

const Contact = () => {
  return (
    <>
      <div className="container-own">
        <div className="contact-us">
          <div className="row align-items-start justify-content-between">
            <div className="col-lg-6">
              <div className="contact-info">
                <h2>Tell Us Your Message</h2>

                <Formik initialValues={initialValues} onSubmit={onSubmit} >
                  <Form>

                    <div className="contact-form">
                      <div className="form-data">
                        <label >Your Name <span>*</span></label>
                        <Field className="customInput text" type="text" id="name" name="name" placeholder="Full Name" />
                      </div>
                      <div className="form-data">
                        <label >Your Email <span>*</span></label>
                        <Field className="customInput text" type="email" id="email" name="email" placeholder="Email Address" />
                      </div>
                      <div className="form-data">
                        <label >Subject</label>
                        <Field className="customInput text" type="text" id="subject" name="subject" placeholder="Subject" />
                      </div>
                      <div className="form-data">
                        <label >Your Message</label>
                        <Field className="customInput area " as="textarea" id="note" name="note" placeholder="Message" />
                      </div>

                    </div>
                    <button type="submit">Send Message</button>
                  </Form>
                </Formik>
              </div>
            </div>
            <div className="col-lg-5">

              <div className="contact-right">
                <div className="contact-right-head">
                  <h2>Contact Us</h2>
                  <p className='info'>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum formas human. qui sequitur mutationem consuetudium lectorum. Mirum est notare quam</p>
                </div>

                <div className="head">
                  <div className="title">
                    <FaAddressCard className='contact-icon-adres' /> <span>Address</span>
                  </div>
                  <p className='info'>123 Main Street, Anytown, CA 12345 – USA</p>
                </div>

                <div className="head">
                  <div className="title">
                    <HiPhone className='contact-icon-phone' /> <span>Phone</span>
                  </div>
                  <p className='info' >Mobile: (08) 123 456 789</p>
                  <p className='info' >Hotline: 1009 678 456</p>
                </div>

                <div className="head">
                  <div className="title">
                    <HiOutlineMail className='contact-icon-email' /> <span> Email</span>
                  </div>
                  <p className='info'>yourmail@domain.com</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Contact