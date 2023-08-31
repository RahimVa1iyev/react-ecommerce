import React from 'react'
import { TiStarFullOutline } from 'react-icons/ti';
import { TiStarOutline } from 'react-icons/ti';
import {BiHeart} from 'react-icons/bi';
import { AiOutlineEye} from 'react-icons/ai';
import axios from 'axios';
import {  handleEye, handleOpen, setSelectedProduct } from '../../control/modalSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const SecondShopItem = (props) => {
    const {id, name, rate,desc, discountedPrice, salePrice, imageName,stockStatus } = props.product
    
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
         <div className="col-12">
           <div className="pr-box">
           <div className="row align-items-center">
            <div className="col-lg-4">
              <Link to={`/detail/${id}`} >  <div className="box-img">
                    <img src={imageName} alt="my clock" />
                </div></Link>
            </div>
            <div className="col-lg-4">
                <div className="left-side-box">
                    <h4 className='pr-name'>
                        {name}
                    </h4>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((i) => (
                            getStarIcon(i)
                        ))}
                    </div>

                    <span className='desc'>{desc.substring(0,150)}...</span>

                </div>
            </div>
            <div className="col-lg-4">
                <div className="box-action">
                     <span className='stock-title'>Available :</span> <span className='stock-status'>{stockStatus ? "In Stock" : "Out Stock"}</span>

                    {
                        discountedPrice>0 ?
                         <div className="box-action-price">
                        <span className='new-price'>${discountedPrice}</span>
                        <del className='old-price'>${salePrice}</del>
                         </div> :
                     <div className="box-action-price">
                     <span className='new-price'>${salePrice}</span>
                  </div> 
                    }

                     <a href="#" className='cart-btn'>Add to cart</a>

                     <div className="box-action-icons d-flex align-items-center justify-content-center">
                        <BiHeart className='card-icon' />
                        <AiOutlineEye className='card-icon' onClick={EyeIconHandle} />
                     </div>

                </div>
            </div>
            </div>
           </div>
         </div>
        </>
    )
}

export default SecondShopItem