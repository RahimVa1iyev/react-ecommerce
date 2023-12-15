import React, { useEffect, useState } from 'react'
import logo from '../../assets/image/logo.png';
import { LuShoppingCart } from 'react-icons/lu';
import { AiOutlineBars } from 'react-icons/ai';
import SideBarMenu from './SideBarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { FiX } from 'react-icons/fi';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { getBasketItems, setClicked } from '../../control/basketSlice';
import { AiOutlineHeart } from 'react-icons/ai'
import { setSelectedNav, setSelectedRoute } from '../../control/navSlice';
import { toast } from 'react-toastify';

const BottomHeader = () => {
    const [toggle, setToggle] = useState("side-bar-off");
    const { count, product } = useSelector((store) => store.basket)
    const [dropdown, setDropdown] = useState(false)
    // const [toggleNavlink, setToggleNavlink] = useState(1);
    const [token, setToken] = useState(localStorage.getItem('authToken'));

    const { selectedNav } = useSelector(store => store.nav)



    const dispatch = useDispatch();

    const DeletePrHandle = async (id) => {
        console.log("Id", id);
        await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/api/Shops/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                
                dispatch(getBasketItems())
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

            })

    }

    const DropdownHandle = () => {
        setDropdown(dropdown ? false : true)
    }



    const SidebarHandler = () => {
        setToggle(toggle === "side-bar-off" ? "side-bar-on" : "side-bar-off")
    }

    const toggleNav = (id) => {
        console.log(id);
        if (id === 2) {
            dispatch(setSelectedNav('Shop'))
            dispatch(setSelectedRoute('/shop'))
        }
        else if (id === 3) {
            dispatch(setSelectedNav('Contact-Us'))
            dispatch(setSelectedRoute('/contact'))
        }
        else {
            dispatch(setSelectedNav(''))
            dispatch(setSelectedRoute(''))
        }
        // console.log('if',selectedNav);
        // if (selectedNav === 'Detail') {
        //     setToggleNavlink(0)
        // }
        // else {
        //     setToggleNavlink(id)
        // }
    }





    window.addEventListener("scroll", () => {
        const header = document.querySelector(".bottom-header");
        const bar = document.querySelector("#bar");



        const toggleClass = "isSticky";


        const currentScroll = window.scrollY;
        if (currentScroll > 150) {
           header && header.classList.add(toggleClass);
            bar.classList.add(toggleClass);



        } else {
            header && header.classList.remove(toggleClass);
            bar.classList.remove(toggleClass);
            bar.classList.remove(toggleClass);


        }
    });

    return (
        <>
            <div className="bottom-header">

                <div id='bottom-header-media' className="row align-items-center justify-content-between">

                    <div className="col-lg-2 col-4">
                        <Link to="/" className='logo' > <img src={logo} alt="my image" /> </Link>
                    </div>

                    <div id='navbar-media' className="col-lg-6">
                        <div className="navbar-bottom d-flex align-items-center justify-content-around">
                            <Link className='nav-deactive' onClick={() => toggleNav(1)} to="/">Home</Link>
                            <Link className='nav-deactive' onClick={() => toggleNav(2)} to="/shop" >Shop</Link>
                            <Link className='nav-deactive' onClick={() => toggleNav(3)} to="/contact-us" >Contact</Link>
                        </div>

                    </div>
                    <div className="col-lg-2 col-6">
                        <div className="bottom-icons  ">
                            <div className="wishlist">
                               <Link to='/wishlist'> <AiOutlineHeart onClick={()=>{
                                          dispatch(setSelectedNav('Wishlist'));
                                          dispatch(setSelectedRoute(`/wishlist`))}} className='heart' /></Link>
                            </div>
                            <div id='basket-media' className="basket d-flex align-items-center justify-content-end  gap-1 ">
                                <LuShoppingCart onClick={DropdownHandle} className='basket-icon' /> <span className='count'>{count && count}</span>
                            </div>

                        </div>
                        <div className={dropdown ? "basket-dropdown" : "d-none"}>
                            <div className="dropdown-box  ">

                                {
                                    product && product.items.map((item, index) => (
                                        <div key={index} className="top-side-dropdown d-flex align-items-start gap-2 ">
                                            <div className="basket-img">
                                                {
                                                    item.product.images.map((img, index) => (
                                                        <img key={index} src={`${process.env.REACT_APP_API_ENDPOINT}/uploads/products/${img.imageName}`} alt="my img" />

                                                    ))
                                                }
                                            </div>
                                            <div className="basket-info">
                                                <div className="pr-name d-flex justify-content-between">
                                                    <p>{item.product.name.substring(0, 40)}...</p>
                                                    <FiX onClick={() => DeletePrHandle(item.product.id)} className='delete-basket' />
                                                </div>
                                                <div className="basket-item-price d-flex align-items-center gap-1">
                                                    <span className='drop-x' >{item.count}</span>
                                                    <span className='drop-x'  >x</span>
                                                    <span className='new-price' >{(item.count * (item.product.discountedPrice > 0 ? item.product.discountedPrice : item.product.salePrice)).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }



                                <div className="links">
                                    <div className="total-price d-flex align-items-center justify-content-between">
                                        <p>Total : </p>
                                        <span className='total' >{product && product.totalAmount}</span>
                                    </div>
                                    <div className="link-button">

                                        <Link onClick={() => {setDropdown(false) ;
                                          dispatch(setSelectedNav('Basket'));
                                          dispatch(setSelectedRoute(`/basket`))} } to='/basket' className='go-link' >View Cart</Link>
                                         {token !==null ?   <Link onClick={() => {setDropdown(false) ;
                                          dispatch(setSelectedNav('Checkout'));
                                          dispatch(setSelectedRoute(`/checkout`))}} to='/checkout' className='go-link' >Checkout</Link>:
                                          <Link className='go-link' >Checkout</Link>
                                          }
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div id='bar' className="col-2">
                        <div className="side-bar">
                            <AiOutlineBars onClick={SidebarHandler} className='bar-icon' />
                        </div>
                    </div>
                </div>


            </div>


            <div id={toggle} className=' col-12' >
                <SideBarMenu />
            </div>



        </>
    )
}

export default BottomHeader