import axios from 'axios';
import React, { useState } from 'react'
import { TiStarFullOutline } from 'react-icons/ti';
import { TiStarOutline } from 'react-icons/ti';

const TabPlugin = (props) => {
  const [toggle, setToggle] = useState(1);
  const [reviewRate, setReviewRate] = useState()
  const [text , setText] = useState();
  const [token,setToken] = useState(localStorage.getItem("authToken"))
  console.log(props);

  const ToggleHandle = (num) => {
    setToggle(num)
  }
  const rate = 4;

  const getStart = (i, index) => {
    return rate >= i ? <TiStarFullOutline key={index} className='full' /> : <TiStarOutline key={index} className='outer' />
  }

  const selectRate = (count) => {
    console.log(count);
    setReviewRate(count)
  }
  const areaHandle = (e) =>{
    console.log(e.target.value);
    setText(e.target.value)
  }

  const createReview = async () =>{
    console.log(props.product.id);
    const data ={productId :props.product.id,rate:rate,text:text}
      await axios.post(`https://localhost:7039/api/Products/review`,data , {
        headers: {
          Authorization: `Bearer ${token}`
      }
      })
      .then(res=>console.log("Revire created"))
      .catch(err=>console.log(err.response.data))
  }

  return (
    <>

      <div className="tab-header">
        <div className="row align-items-center justify-content-center ">
          <div className="col-lg-2 text-center">
            <span className={toggle === 1 ? "active-tab" : "deactive"} onClick={() => ToggleHandle(1)} >Description</span>
          </div>
          <div className="col-lg-2  text-center">
            <span className={toggle === 2 ? "active-tab" : "deactive"} onClick={() => ToggleHandle(2)} >Review</span>
          </div>
          <div className="col-lg-2 text-center">
            <span className={toggle === 3 ? "active-tab" : "deactive"} onClick={() => ToggleHandle(3)} > Comment</span>
          </div>
        </div>
      </div>

      <div className="tab-menu">
        <div className={toggle === 1 ? "desc" : "desc  d-none"}>
          {props.desc}
        </div>
        <div className={toggle === 2 ? "review" : "review d-none"}>

          <div className="review-side">
            <div className="top-review-side d-flex align-items-end justify-content-between">
              <div className="left-side-review">
                <h2>Customer Reviews</h2>
                <div className="rate d-flex align-items-center">{
                  [1, 2, 3, 4, 5].map((i, index) => (

                    getStart(i, index)
                  ))
                }   <span className='review' >Review(1)</span> </div>
              </div>
              <p>Write a review</p>

            </div>

            <div className="bottom-review-side">
              <div className="user-review d-none ">
                <div className="joa-cancelo">
                  <div className="rate d-flex align-items-center">{
                    [1, 2, 3, 4, 5].map((i, index) => (

                      getStart(i, index)
                    ))
                  }
                  </div>

                  <div className="d-flex align-items-center gap-1">
                    <span className="fullname">Rahim</span>
                    <span className='on'>on</span>
                    <span className='time' >Sep 12, 2021</span>
                  </div>
                </div>
                <div className="joa-felix">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus fugiat dolore, eum soluta similique unde vitae officiis culpa dolor illo nobis, commodi corporis velit cumque libero, laboriosam consequuntur eligendi repudiandae?
                    Eveniet, nulla, placeat quibusdam ut, maxime optio minus rerum sint odio officia deserunt praesentium. Rerum ad enim aliquam assumenda sint perferendis iste atque, quasi, nemo veritatis nesciunt nihil? Ratione, mollitia.
                    Doloribus culpa accusantium rerum! Est fugit corrupti autem nemo inventore asperiores hic voluptate, neque quia alias, possimus voluptas ducimus iure in rerum enim aut dicta, aspernatur unde. Quidem, consectetur velit!
                    Praesentium quo quasi voluptatum incidunt veritatis repudiandae sed quibusdam necessitatibus, tenetur voluptatem autem dolores facilis. Maxime, perspiciatis fugit nesciunt, necessitatibus enim debitis veritatis voluptate cupiditate totam vel explicabo laudantium libero?
                    Recusandae, totam repudiandae laborum odit aliquam eveniet provident ullam quisquam maxime perspiciatis ratione mollitia! Quo voluptatibus dolore cum eaque odio est qui aperiam nam, omnis totam! Unde quis quidem atque!
                    Dolorem reiciendis saepe alias esse omnis pariatur. Beatae, laudantium? Incidunt ratione repellat aperiam provident unde laborum quia voluptatem nihil perferendis cum. Tenetur saepe in facere optio perferendis iure quibusdam quia.
                    Error pariatur cumque esse deserunt perferendis obcaecati fugiat dicta in reprehenderit tenetur vel quidem, explicabo placeat dolorum velit numquam recusandae, eum a unde modi ipsum veritatis! Vel saepe odit soluta.
                    Ducimus porro nisi in, animi quis perspiciatis. Sequi hic cumque nulla, pariatur rerum aut quaerat ut fuga quo repellat laudantium cupiditate, voluptas adipisci error assumenda sapiente unde consectetur similique atque.
                    Ad maxime, dolor animi blanditiis cum harum aperiam reiciendis error quidem amet quas, provident nostrum nesciunt accusamus, ipsum doloribus placeat voluptate. Asperiores quas sit sequi dolores perferendis nisi quam quo?
                    Aut, numquam, pariatur fugiat exercitationem fugit tempore magni saepe id, dolor molestiae ad laudantium eum obcaecati sunt cupiditate dicta. Dicta aperiam similique sunt deserunt inventore officiis optio repellendus necessitatibus quam?</p>
                </div>
              </div>

              <div className="user-review-form">
                <p>Write a review</p>

                <div class="star-box">

                  <p className='rating' >Rating</p>

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

                <textarea onChange={areaHandle} rows="10" cols="165">
                  Bu bir textarea örneğidir. Buraya metin girebilirsiniz.
                </textarea>

              </div>

              <div className="review-btn">

                <button onClick={createReview} >Submit Review</button>
              </div>
            </div>

          </div>

        </div>
        <div className={toggle === 3 ? "comment" : "comment d-none"}>
          dd
        </div>
      </div>

    </>
  )
}

export default TabPlugin