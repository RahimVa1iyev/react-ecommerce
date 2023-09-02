import React, { useEffect, useState } from 'react'
import { TiStarFullOutline } from 'react-icons/ti';
import { TiStarOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'

import axios from 'axios';
import { getBasketItems, setCount } from '../../control/basketSlice';


const DetailItem = (props) => {
   const {id, name, rate, category, discountedPrice, brand, colors, sizes, salePrice, gender, desc } = props.product;
   const [clicked, setClicked] = useState(0)
   const [token, setToken] = useState(localStorage.getItem('authToken'));
   const {product} = useSelector(store => store.basket)
   const navigate = useNavigate();


   const getStart = (i,index) => {
      return rate >= i ? <TiStarFullOutline key={index} className='full' /> : <TiStarOutline key={index} className='outer' />
   }

   const dispatch = useDispatch();

   const AddBasketHandle = async (values) =>{

      if(token){
          await axios.post(`https://localhost:7039/api/Shops/`, values ,{
              headers: {
                  Authorization: `Bearer ${token}`
                }
          })
          .then(res=> {
              setClicked(clicked + 1)
              dispatch(setCount(res.data.count))

          } )
          .catch(err=>{
           err.response &&   console.log(err.response.data);
          })
      }
      else{
          alert("Xeta bas verdi")
      }
  } 

  const changeInput = (e) => {
    const values = {count : e.target.value,id:id}
    AddBasketHandle(values);
  }

  const addBasket = () => {
   const value = document.querySelector("#qty").value
   const data = {count:value , id:id}
   AddBasketHandle(data)
  }

  const addCheckOut = () => {
   const value = document.querySelector("#qty").value
   const data = {count:value , id:id}
   AddBasketHandle(data)
   navigate('/checkout')
  }


 

  useEffect(() => {
   dispatch(getBasketItems())
}, [clicked])

   return (
      <>

         <h2 className='pr-name' >{name}</h2>
         <div className="rate d-flex align-items-center">{
            [1, 2, 3, 4, 5].map((i,index) => (

               getStart(i,index)
            ))
         }   <span className='review' >Review</span> </div>

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

         <p className="desc">{desc.substring(0,250)}...</p>

         <hr />

         <div className="basket-side d-flex align-items-baseline gap-3">
            <span>Qty</span>
            <input onChange={changeInput} id='qty' defaultValue={1} type="number"  />
            <button  onClick={addBasket}  className='add-btn'>Add to cart</button>
         </div>

         <div className="check-out">
            <button onClick ={addCheckOut}  >Buy it now</button>
         </div>


      </>
   )
}

export default DetailItem