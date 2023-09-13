import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TiStarFullOutline } from 'react-icons/ti';
import { TiStarOutline } from 'react-icons/ti';
import { toast } from 'react-toastify';

const TabPlugin = (props) => {
  const [toggle, setToggle] = useState(1);
  const [reviewRate, setReviewRate] = useState()
  const [text, setText] = useState();
  const [reviews, setReviews] = useState();
  const [token, setToken] = useState(localStorage.getItem('authToken'))
  const [user, setUser] = useState();
  const [reviewToggle, setReviewToggle] = useState(false);
  const [clicked, setClicked] = useState(0);

  const getExistUserReview = reviews && reviews.filter(review =>
    user && review.appUserId === user.id

  );


  const ToggleHandle = (num) => {
    setToggle(num)
  }


  const selectRate = (count) => {
    setReviewRate(count)
  }
  const areaHandle = (e) => {
    setText(e.target.value)
  }

  const createReview = async () => {
    const data = { productId: props.product.id, rate: reviewRate, text: text }
    await axios.post(`https://localhost:7039/api/Products/review`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => { setReviewToggle(false); setClicked(clicked + 1); 
        toast.success('Review added successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        }); })
      .catch(err => console.log(err.response.data))
  }

  const getReview = async () => {
    await axios.get(`https://localhost:7039/api/Products/review/${props.product.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setReviews(res.data))
  }

  const getUser = async () => {

    if (token) {
      await axios.get('https://localhost:7039/api/Users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setUser(response.data)
        })
        .catch(error => {
          console.error('An error occurred', error);
        });
    } else {
      console.log('Token has not found');
    }
  }

  const getStart = (i, index) => {
    return getExistUserReview && getExistUserReview.map((rv, index) => (rv.rate >= i ? <TiStarFullOutline key={index} className='full' /> : <TiStarOutline key={index} className='outer' />))
  }

  const getStartAll = (i, rate, index) => {
    return rate >= i ? <TiStarFullOutline key={index} className='full' /> : <TiStarOutline key={index} className='outer' />
  }

  function formatDateTime(dateTimeString) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = months[dateTime.getMonth()];
    const day = dateTime.getDate().toString().padStart(2, '0');


    return `${day} ${month} , ${year}`;
  }

  const handleReviewWrite = () => {

   if(token !==null){
    setReviewToggle(reviewToggle ? false : true)
   }
   else{
    toast.warning('You must register to add a product', {
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




  useEffect(() => {
    getUser();
  }, [])

  useEffect(() => {
    getReview();

  }, [clicked, props.product.id])

  return (
    <>

      <div className="tab-header">
        <div className="row align-items-center justify-content-center ">

          <div className="col-lg-4 col-5  text-center">
            <span className={toggle === 1 ? "active-tab" : "deactive"} onClick={() => ToggleHandle(1)} >Review</span>
          </div>
          <div className="col-lg-4 col-5 text-center">
            <span className={toggle === 2 ? "active-tab" : "deactive"} onClick={() => ToggleHandle(2)} > Comment ({reviews && reviews.length}) </span>
          </div>
        </div>
      </div>

      <div className="tab-menu">

        <div className={toggle === 1 ? "review" : "review d-none"}>

          <div className="review-side">
            <div className="top-review-side d-flex align-items-center justify-content-between">
              <div className="left-side-review">
                <h2>Customer Reviews</h2>
                <div className="rate d-flex align-items-center">{
                  [1, 2, 3, 4, 5].map((i, index) => (

                    getStart(i, index)
                  ))
                } </div>
              </div>
              <p onClick={handleReviewWrite} >Write a review</p>

            </div>

            <div className="bottom-review-side">
              <div className={reviewToggle ? "user-review d-none " : "user-review "}>
                <div className="joa-cancelo">
                  <div className="rate d-flex align-items-center">{
                    [1, 2, 3, 4, 5].map((i, index) => (

                      getStart(i, index)
                    ))
                  }
                  </div>


                </div>
                {
                  getExistUserReview && getExistUserReview.map((item, index) => (
                    <div key={index} className="joa-felix">
                      <div className="d-flex align-items-center gap-1 mb-2 " >
                        <span className="fullname">{item.appUserUserName}</span>
                        <span className='on'>on</span>
                        <span className='time' >{formatDateTime(item.createdAt)}</span>
                      </div>
                      <p>{item.text}</p>
                    </div>
                  ))
                }
              </div>

              <div className={reviewToggle ? "user-review " : "user-review d-none "}>
                <p className='wr-review'>Write a review</p>

                <div className="star-side">
                  <p className='review-form-title' >Rating</p>
                  <div class="star-box">
                    <input onClick={() => selectRate(5)} type="radio" name="star" id="star0" />
                    <label class="star" for="star0"></label>
                    <input onClick={() => selectRate(4)} type="radio" name="star" id="star1" />
                    <label class="star" for="star1"></label>
                    <input onClick={() => selectRate(3)} type="radio" name="star" id="star2" />
                    <label class="star" for="star2"></label>
                    <input onClick={() => selectRate(2)} type="radio" name="star" id="star3" />
                    <label class="star" for="star3"></label>
                    <input onClick={() => selectRate(1)} type="radio" name="star" id="star4" />
                    <label class="star" for="star4"></label>

                  </div>
                </div>

                <div className="text-side">
                  <p className="review-form-title">
                    Review Body
                  </p>


                  <textarea onChange={areaHandle} placeholder='Text Area' className='review-text'>
                  </textarea>
                </div>

                <div className="review-btn">

                  <button onClick={createReview} >Submit Review</button>
                </div>

              </div>
            </div>
          </div>
        </div>
        {
          reviews && reviews.map((item, index) => (
            <div key={index} className={toggle === 2 ? "comment" : "comment d-none"}>
              <div className="joa-cancelo">
                <div className="rate d-flex align-items-center">{
                  [1, 2, 3, 4, 5].map((i, index) => (
                    getStartAll(i, item.rate, index)
                  ))
                }
                </div>


              </div>

              <div key={index} className="joa-felix">
                <div className="d-flex align-items-center gap-1 mb-2 " >
                  <span className="fullname">{item.appUserUserName}</span>
                  <span className='on'>on</span>
                  <span className='time' >{formatDateTime(item.createdAt)}</span>
                </div>
                <textarea disabled={true} className='comment-text' >{item.text}</textarea>
              </div>

            </div>
          ))
        }
      </div>

    </>
  )
}

export default TabPlugin