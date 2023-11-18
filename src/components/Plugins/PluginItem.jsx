import React, { useEffect, useState } from 'react'
import { TiStarFullOutline } from 'react-icons/ti';
import { TiStarOutline } from 'react-icons/ti';
import { LuShoppingCart } from 'react-icons/lu';
import { BiHeart } from 'react-icons/bi';
import { PiScales } from 'react-icons/pi';
import { AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { handleOpen, setSelectedProduct, setCompareProduct, handleEye, handleScale, setCompareCount, setIds } from '../../control/modalSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getBasketItems } from '../../control/basketSlice';
import { setSelectedNav, setSelectedRoute } from '../../control/navSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const PluginItem = (props) => {
    const [hover, setHover] = useState("hover-img-off");
    const [poster, setPoster] = useState("hover-img-on");
    const [icon, setIcon] = useState("box-icons-off");
   
    const [count, setCount] = useState(0);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [dataId, setDataId] = useState();
    const [clicked, setClicked] = useState(0)
    const [heart, setHeart] = useState(false)

    const navigate = useNavigate();
    const disPatch = useDispatch();
    const { compareProduct, compareCount,ids } = useSelector((store) => store.modal)
    // if (props.size === '0') {
    //     const { id, name, rate, discountedPrice, salePrice, images } = props.product;
    //   } else {
    //     const { id, name, rate, discountedPrice, salePrice, imageName } = props.product;
    //   }
      const {id} = props.product

    


    const HoverHandle = () => {

        setHover("hover-img-on")
        setPoster("poster-img-off")
        setIcon("box-icons-on")

    }

    const PosterHandle = () => {

        setHover("hover-img-off")
        setPoster("poster-img-on")
        setIcon("box-icons-off")


    }

    const EyeIconHandle = async () => {
        await axios.get(`https://api-project-ecommerce.azurewebsites.net/api/Products/modal/${props.product.id}`)
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
            

            await axios.get(`https://api-project-ecommerce.azurewebsites.net/api/Products/compare/${props.product.id}`)
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


    const AddBasketHandle = async () => {


        if (token) {
            await axios.post(`https://api-project-ecommerce.azurewebsites.net/api/Shops/`, values, {
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


    const AddWhishlistHandle = async () => {
        setHeart(true)
        let wishlistLocal = JSON.parse(localStorage.getItem('wishlist'))
        if (wishlistLocal !== null) {
            if (wishlistLocal.find(pr => pr.id === props.product.id) === undefined) {
                wishlistLocal.push(props.product)
                localStorage.setItem("wishlist", JSON.stringify([...wishlistLocal]));
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
        }
        else {
            localStorage.setItem("wishlist", JSON.stringify([props.product]));
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
    }

    const DeleteHandler = (id) => {
        setHeart(false)
        let wishlists = JSON.parse(localStorage.getItem("wishlist"));
        const index = wishlists.indexOf(wishlists.find(c => c.id === id));
        wishlists.splice(index, 1);
        if (JSON.stringify(wishlists) === "[]") {
            localStorage.removeItem("wishlist");
        } else {
            localStorage.setItem("wishlist", JSON.stringify(wishlists));
        }

        toast.error('Product deleted successfully', {
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




    useEffect(() => {
        disPatch(getBasketItems())
    }, [clicked])

    useEffect(() => {
        const wishlistLocal = JSON.parse(localStorage.getItem('wishlist'));
        if (wishlistLocal && wishlistLocal.some(item => item.id === props.product.id)) {
            setHeart(true);
        }
    }, [props.product.id]);

    const navRouteHandle = () => {
      
        console.log("salam");
        disPatch(setSelectedNav('Detail'))
        disPatch(setSelectedRoute(`/detail/${props.product.id}`))
    }



    const getStarIcon = (i) => {
        return i <= props.product.rate ? <TiStarFullOutline key={i} className='full' /> : <TiStarOutline key={i} className='outer' />;
    };
    return (
        <>



            {
                props.size==='0'?
                <div key={props.key} className="dis-pr-box ">
                <div onMouseEnter={HoverHandle} onMouseLeave={PosterHandle} onClick={navRouteHandle} className="box-top text-center">
                    <Link to={`/detail/${props.product.id}`} >
                        {
                            props.product.images && props.product.images.map((img, index) => (

                                <>
                                    {img.imageStatus === true && <img key={index} className={poster} src={img.imageName} alt='my clock' />}
                                    {img.imageStatus === false && <img key={index} className={hover} src={img.imageName} alt='my clock' />}
                                </>

                            ))
                        }
                    </Link>

                </div>


                <div onMouseEnter={HoverHandle} onMouseLeave={PosterHandle} className={icon}>

                    <AiOutlineEye className='card-icon' onClick={EyeIconHandle} />
                    <BiHeart className={heart === false ? 'card-icon' : "wishlist-icon"} onClick={heart === false ? AddWhishlistHandle : () => DeleteHandler(props.product.id)} />
                    <PiScales onClick={CompareHandle} className='card-icon' />

                </div>
                <div className="box-bottom d-flex align-items-center gap-6 ">
                    <div className="left-side-box">
                        <h4>
                            {props.product.name.substring(0, 30)}...
                        </h4>
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((i) => (
                                getStarIcon(i)
                            ))}
                        </div>
                    {
                        props.product.discountedPrice>0?
                        <div className="price d-flex align-items-center gap-3">

                        <span className='new-price'>${props.product.discountedPrice}</span>
                        <del className='old-price'>${props.product.salePrice}</del>
                    </div>:
                        <div className="price d-flex align-items-center gap-3">

                        <span className='new-price'>${props.product.salePrice}</span>
                    </div>
                    }
                    </div>

                    <div className="box-basket-icon">
                        <LuShoppingCart onClick={AddBasketHandle} className='box-basket-i' />
                    </div>

                </div>
            </div>:
              
              <div className={props.size==='2'? "col-lg-6 mb6" : "col-lg-4"}>
              <div className="shop-items">
                <div onMouseEnter={HoverHandle} onMouseLeave={PosterHandle} className="box-top text-center">
                 
                 <Link to={`/detail/${props.product.id}`}> <img className="poster-img-on" src={props.product.imageName} alt="" /></Link>
             
                </div>
                <div onMouseEnter={HoverHandle} onMouseLeave={PosterHandle} className={icon}>
      
                  <AiOutlineEye className='card-icon' onClick={EyeIconHandle} />
                  <BiHeart className={heart === false ? 'card-icon' : "wishlist-icon"} onClick={heart === false ? AddWhishlistHandle : () => DeleteHandler(props.product.id)} />
                  <PiScales onClick={CompareHandle} className='card-icon' />

      
                </div>
                <div className="box-bottom d-flex align-items-center gap-6 ">
                  <div className="left-side-box">
                    <h4>
                      {props.product.name.substring(0,30)}...
                    </h4>
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((i) => (
                        getStarIcon(i)
                      ))}
                    </div>
                   {
                    props.product.discountedPrice>0 ?
                    <div className="price d-flex align-items-center gap-3">
      
                    <span className='new-price'>${props.product.discountedPrice}</span>
                    <del className='old-price'>${props.product.salePrice}</del>
                  </div>:
                   <div className="price d-flex align-items-center gap-3">
      
                   <span className='new-price'>${props.product.salePrice}</span>
                 </div>
                   }
                  </div>
      
                  <div className="box-basket-icon">
                   <LuShoppingCart onClick={AddBasketHandle} className='box-basket-i' />

                  </div>
      
                </div>
              </div>
            </div>

            }

        </>
    )
}

export default PluginItem