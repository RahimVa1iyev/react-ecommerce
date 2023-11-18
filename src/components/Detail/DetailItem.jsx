import React, { useEffect, useState } from 'react'
import { TiStarFullOutline } from 'react-icons/ti';
import { TiStarOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios';
import { getBasketItems, setCount } from '../../control/basketSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DetailItem = (props) => {
   const { id, name, rate, category, discountedPrice, brand, colors, sizes, salePrice, gender, desc } = props.product;
   const [clicked, setClicked] = useState(0)
   const [token, setToken] = useState(localStorage.getItem('authToken'));
   const { product } = useSelector(store => store.basket)
   const navigate = useNavigate();


   const getStart = (i, index) => {
      return rate >= i ? <TiStarFullOutline key={index} className='full' /> : <TiStarOutline key={index} className='outer' />
   }

   const dispatch = useDispatch();

   const AddBasketHandle = async (values) => {

      if (token) {
         await axios.post(`https://api-project-ecommerce.azurewebsites.net/api/Shops/`, values, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
            .then(res => {
               setClicked(clicked + 1)
               dispatch(setCount(res.data.count))


            })
            .catch(err => {
               err.response && console.log(err.response.data);
            })
      }
      else {
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

   const changeInput = (e) => {
      const values = { count: e.target.value, id: id }
      AddBasketHandle(values);

   }

   const addBasket = () => {
      if (token) {
         const value = document.querySelector("#qty").value
         const data = { count: value, id: id }
         AddBasketHandle(data)
         toast.success('Product added successfully', {
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
      else {
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

   const addCheckOut = () => {
      if (token) {
         const value = document.querySelector("#qty").value
         const data = { count: value, id: id }
         AddBasketHandle(data)
         toast.success('Product added successfully', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
         });
         navigate('/checkout')
      }
      else {
         toast.warning('You must register to order a product', {
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
      dispatch(getBasketItems())
   }, [])

   return (
      <>


         <h2 className='pr-name' >{name}</h2>
         {/* <div className="rate d-flex align-items-center">{
            [1, 2, 3, 4, 5].map((i, index) => (

               getStart(i, index)
            ))
         }   <span className='review' >Review</span> </div> */}

         {
            discountedPrice > 0 ?
               <div className="price d-flex align-items-center gap-3">
                  <span className="new-price">${discountedPrice}</span>
                  <del className="old-price">${salePrice}</del>
               </div> :
               <div className="price d-flex align-items-center gap-3">
                  <span className="new-price">${salePrice}</span>
               </div>
         }


         <div className="category">
            <span className='category-title'>Category :</span>  <span className='category-name'>{category.name}</span>
         </div>

         <div className="brand">
            <span className='brand-title'>Brand :</span>  <span className='brand-name'>{brand.name}</span>
         </div>

         <div className="gender">
            <span className='gender-title' >Gender :</span>  <span className='gender-name'>{gender.name}</span>
         </div>

         <div className="size">
            <span className='size-title' >Sizes :</span>  {sizes.map((size, index) => (
               <span className='size-name' key={index}>
                  {index > 0 && ", "}
                  {size.name}
               </span>
            ))}
         </div>
         <div className="color">
            <span className='color-title' >Colors :</span>  {colors.map((color, index) => (
               <span className='color-name' key={index}>
                  {index > 0 && ", "}
                  {color.name}
               </span>
            ))}
         </div>

         <hr />

         <p className="desc">{desc.substring(0, 250)}...</p>

         <hr />

         <div className="basket-side d-flex align-items-baseline gap-3">
            <span>Qty</span>
            <input onChange={changeInput} id='qty' defaultValue={1} type="number" />
            <button onClick={addBasket} className='add-btn'>Add to cart</button>
         </div>

         <div className="check-out">
            <button onClick={addCheckOut} className='check-btn'  >Buy it now</button>
         </div>


      </>
   )
}

export default DetailItem