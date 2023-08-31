import React, { useState } from 'react'
import { TiStarFullOutline } from 'react-icons/ti';
import { TiStarOutline } from 'react-icons/ti';
import { LuShoppingCart } from 'react-icons/lu';
import { BiHeart } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { handleEye, handleOpen, setSelectedProduct } from '../../control/modalSlice';

const ShopItem = (props) => {

  const [icon, setIcon] = useState("box-icons-off")


  const HoverHandler = () => {
    setIcon("box-icons-on")
  }

  const PosterHandler = () => {
    setIcon("box-icons-off")

  }

  const {id, name, rate, discountedPrice, salePrice, imageName } = props.product

  const disPatch = useDispatch();
  const navigate = useNavigate();


  const EyeIconHandle = async () => {
      await axios.get(`https://localhost:7039/api/Products/modal/${props.product.id}`)
          .then(res => {
              disPatch(setSelectedProduct(res.data));

          })
          .catch(err => {
              if (err.response.status === 404)
                  navigate("*")
              else {
                  console.log("An unexpected error occured");
              }
          })

      disPatch(handleOpen());
      disPatch(handleEye());

  };
  const getStarIcon = (i) => {
    return i <= rate ? <TiStarFullOutline key={i} className='full' /> : <TiStarOutline key={i} className='outer' />;
  };
  return (
    <>

      <div className={props.size==='2'? "col-lg-6 mb6" : "col-lg-4"}>
        <div className="shop-items">
          <div onMouseEnter={HoverHandler} onMouseLeave={PosterHandler} className="box-top text-center">
           
           <Link to={`/detail/${id}`}> <img className="poster-img-on" src={imageName} alt="" /></Link>
       
          </div>
          <div onMouseEnter={HoverHandler} onMouseLeave={PosterHandler} className={icon}>

            <AiOutlineEye className='card-icon' onClick={EyeIconHandle} />
            <BiHeart className='card-icon' />
            <LuShoppingCart className='card-icon' />

          </div>
          <div className="box-bottom d-flex align-items-center gap-6 ">
            <div className="left-side-box">
              <h4>
                {name}
              </h4>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  getStarIcon(i)
                ))}
              </div>
             {
              discountedPrice>0 ?
              <div className="price d-flex align-items-center gap-3">

              <span className='new-price'>${discountedPrice}</span>
              <del className='old-price'>${salePrice}</del>
            </div>:
             <div className="price d-flex align-items-center gap-3">

             <span className='new-price'>${salePrice}</span>
           </div>
             }
            </div>

            <div className="box-basket-icon">
              <LuShoppingCart className='box-basket-i' />
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default ShopItem