import React, { useEffect, useState } from 'react'
import { TiStarFullOutline } from 'react-icons/ti';
import { TiStarOutline } from 'react-icons/ti';
import {BiHeart} from 'react-icons/bi';
import { AiOutlineEye} from 'react-icons/ai';
import axios from 'axios';
import {  handleEye, handleOpen, handleScale, setCompareCount, setCompareProduct, setIds, setSelectedProduct } from '../../control/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PiScales } from 'react-icons/pi';
import { toast } from 'react-toastify';
import { getBasketItems, setCount } from '../../control/basketSlice';

const SecondShopItem = (props) => {
    const {id, name, rate,desc, discountedPrice, salePrice, imageName,stockStatus } = props.product
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [dataId, setDataId] = useState();
    const [clicked, setClicked] = useState(0)
    const disPatch = useDispatch();
    const navigate = useNavigate();

    const {compareCount,compareProduct,ids} = useSelector( store => store.modal )


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

    const CompareHandle = async () => {

        if (!ids.includes(props.product.id) && compareCount < 3) {
            

            await axios.get(`https://localhost:7039/api/Products/compare/${props.product.id}`)
                .then(res => {
                    disPatch(setCompareProduct([...compareProduct, res.data]))
                    disPatch(setCompareCount(1))
                   

                })
                .catch(err => {
                    if (err.response.status === 404)
                        navigate("*")
                    else {
                        console.log("An unexpected error occured");
                    }
                })

        }
        else if (compareCount >=  3) {
            toast.warning('You can add a maximum of 3 products', {
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
            toast.warning('You have already added the product', {
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

        disPatch(setIds([...ids, props.product.id]))
        disPatch(handleOpen());
        disPatch(handleScale())

    }
    
    const values = {id}

    const AddBasketHandle = async (e) => {
    e.preventDefault()

        if (token) {
            await axios.post(`https://localhost:7039/api/Shops/`, values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
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
                    setDataId(res.data.count);
                    setClicked(clicked + 1)
                    disPatch(setCount(res.data.count))
                  

                })
                .catch(err => {
                    err.response && console.log(err.response.data);
                })
        }
        else {
            alert("Xeta bas verdi")
        }
    }

    useEffect(() => {
        disPatch(getBasketItems())
    }, [clicked])

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

                     <a href="#" onClick={AddBasketHandle} className='cart-btn'>Add to cart</a>

                     <div className="box-action-icons d-flex align-items-center justify-content-center">
                     <PiScales onClick={CompareHandle} className='card-icon' />

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