import React, { useEffect, useState } from 'react'
import { TiStarFullOutline } from 'react-icons/ti';
import { TiStarOutline } from 'react-icons/ti';
import { LuShoppingCart } from 'react-icons/lu';
import { BiHeart } from 'react-icons/bi';
import { PiScales } from 'react-icons/pi';
import { AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { handleOpen, setSelectedProduct, setCompareProduct, handleEye, handleScale, setCompareCount } from '../../control/modalSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getBasketItems } from '../../control/basketSlice';





const PluginItem = (props) => {
    const [hover, setHover] = useState("hover-img-off");
    const [poster, setPoster] = useState("hover-img-on");
    const [icon, setIcon] = useState("box-icons-off");
    const [ids, setIds] = useState([]);
    const [count, setCount] = useState(0);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [dataId, setDataId] = useState();
    const [clicked, setClicked] = useState(0)
    const [heart ,setHeart] = useState(false)

    const navigate = useNavigate();
    const disPatch = useDispatch();
    const { compareProduct,compareCount } = useSelector((store) => store.modal)
    const { id, name, rate, discountedPrice, salePrice, images } = props.product
    

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

        if (!ids.includes(props.product.id) && compareCount < 5 ) {

            await axios.get(`https://localhost:7039/api/Products/compare/${props.product.id}`)
                .then(res => {
                    disPatch(setCompareProduct([...compareProduct, res.data]))
                    console.log("salam");
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
        else if (compareCount >= 5) {
            alert("Maximum 5 product elave ede bilersiz")
        }
        else {
            alert("Artix datani elave etmisiz")
        }

         setIds([...ids, props.product.id])

        disPatch(handleOpen());
        disPatch(handleScale())
    }
    const values = { id }


    const AddBasketHandle = async () => {


        if (token) {
            await axios.post(`https://localhost:7039/api/Shops/`, values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
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


    const AddWhishlistHandle = async () => {
        setHeart(true)
        let wishlistLocal = JSON.parse(localStorage.getItem('wishlist'))
        if (wishlistLocal !== null) {
            if (wishlistLocal.find(pr => pr.id === id) === undefined) {
                wishlistLocal.push(props.product)
                localStorage.setItem("wishlist", JSON.stringify([...wishlistLocal]));
            }
        }
        else {
            localStorage.setItem("wishlist", JSON.stringify([props.product]));
        }
    }

    const DeleteHandler = (id) =>{
        setHeart(false)
        let wishlists = JSON.parse(localStorage.getItem("wishlist"));
        const index = wishlists.indexOf(wishlists.find(c => c.id === id));
        wishlists.splice(index, 1);
        if (JSON.stringify(wishlists) === "[]") {
            localStorage.removeItem("wishlist");
        } else {
            localStorage.setItem("wishlist", JSON.stringify(wishlists));
        }

    }




    useEffect(() => {
        disPatch(getBasketItems())
    },[clicked])

    useEffect(() => {
        const wishlistLocal = JSON.parse(localStorage.getItem('wishlist'));
        if (wishlistLocal && wishlistLocal.some(item => item.id === id)) {
            setHeart(true);
        }
    }, [id]);
  



    const getStarIcon = (i) => {
        return i <= rate ? <TiStarFullOutline key={i} className='full' /> : <TiStarOutline key={i} className='outer' />;
    };
    return (
        <>



            <div key={props.key} className="dis-pr-box ">
                <div onMouseEnter={HoverHandle} onMouseLeave={PosterHandle} className="box-top">
                    <Link to={`/detail/${id}`} >
                        {
                            images && images.map((img, index) => (

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
                    <BiHeart className={heart ===false ? 'card-icon' : "wishlist-icon"} onClick={heart ===false ? AddWhishlistHandle : ()=> DeleteHandler(id)} />
                    <PiScales onClick={CompareHandle} className='card-icon' />

                </div>
                <div className="box-bottom d-flex align-items-center gap-6 ">
                    <div className="left-side-box">
                        <h4>
                            {name.substring(0, 30)}...
                        </h4>
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((i) => (
                                getStarIcon(i)
                            ))}
                        </div>
                        <div className="price d-flex align-items-center gap-3">

                            <span className='new-price'>${discountedPrice}</span>
                            <del className='old-price'>${salePrice}</del>
                        </div>
                    </div>

                    <div className="box-basket-icon">
                        <LuShoppingCart onClick={AddBasketHandle} className='box-basket-i' />
                    </div>

                </div>
            </div>

        </>
    )
}

export default PluginItem