import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { BiSolidBasket, BiSolidTrashAlt } from 'react-icons/bi';
import { SlBasket } from 'react-icons/sl'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getBasketItems, setCount } from '../control/basketSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wishlist = () => {

    const [wishlistItems, setWishlidtItems] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [dataId, setDataId] = useState();
    const [clicked, setClicked] = useState(0)
    const disPatch = useDispatch();

    const basketHandler = () => {
        let wishlist = localStorage.getItem("wishlist");

        if (wishlist !== undefined) {
            setWishlidtItems(JSON.parse(wishlist));
        } else {
            setWishlidtItems([]);
        }
    }
    const deleteHandler = (id) => {
        let wishlists = JSON.parse(localStorage.getItem("wishlist"));
        const index = wishlists.indexOf(wishlists.find(c => c.id === id));
        wishlists.splice(index, 1);
        if (JSON.stringify(wishlists) === "[]") {
            localStorage.removeItem("wishlist");
        } else {
            localStorage.setItem("wishlist", JSON.stringify(wishlists));
        }

        basketHandler();
    }



  const AddBasketHandle = async (id) => {
  const values = {id}

        if (token) {
            await axios.post(`https://api-project-ecommerce.azurewebsites.net/api/Shops/`, values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    toast.success('Product add succesfully', {
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

    console.log(wishlistItems);
    useEffect(() => {
        basketHandler();
    }, [])

    useEffect(() => {
        disPatch(getBasketItems())
    }, [clicked])

    useEffect(()=>{
        localStorage.getItem('adminToken') !==null && localStorage.removeItem('adminToken')
     },[])

    return (
        <>
<ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
            <div className="container-own">
                <div className="wishlist">
                  <div className="wishlist-top">
                  <h2 className='wishlist-title'>My Wishlist</h2>
                    <h2><AiOutlineHeart className='wishlist-i' /></h2>
                  </div>

                    <div className="row align-items-center justify-content-center gap-5 ">



                       {
                        wishlistItems ===null ?
                        <div className='empty'>Wishlist is empty</div>:
                        <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col" class="border-0 bg-light">
                                        <div class="p-2 px-3 text-uppercase">Product</div>
                                    </th>
                                    <th scope="col" class="border-0 bg-light">
                                        <div class="py-2 text-uppercase">Price</div>
                                    </th>

                                    <th scope="col" class="border-0 bg-light">
                                        <div class="py-2 text-uppercase">Stock</div>
                                    </th>
                                    <th scope="col" class="border-0 bg-light">
                                        <div class="py-2 text-uppercase">Action</div>
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    wishlistItems && wishlistItems.map((item, index) => (
                                        <tr>
                                            <th scope="row" class="border-0">
                                                <div class="p-2">
                                                    {
                                                        item && item.images.map((img, index) => (

                                                            img.imageStatus && <img key={index} src={img.imageName} alt="Product 1" width="70" class="img-fluid rounded shadow-sm p-1" />
                                                        ))
                                                    }
                                                    <div class="ml-3 d-inline-block align-middle">
                                                        <h5 class="mb-0 ms-3 "> <a href="#" class="text-dark  d-inline-block align-middle">{item.name}</a></h5>
                                                    </div>
                                                </div>
                                            </th>
                                            <td class="border-0 align-middle"><strong>${item.discountedPrice > 0 ? item.discountedPrice : item.salePrice}</strong></td>
                                            <td class="border-0 align-middle"><strong>{item.stockStatus === true ? <span className='text-success'>In Stock</span> : <span className='text-danger'>Out Stock</span>}</strong></td>
                                            <td class="border-0 align-middle">
                                                <button type="button" onClick={()=>AddBasketHandle(item.id)} className="shopping-cart-heart-btn me-1 mb-2 " data-mdb-toggle="tooltip"
                                                    title="Remove item">
                                                    <BiSolidBasket />
                                                </button>
                                                <button type="button" onClick={()=>deleteHandler(item.id)} className="shopping-cart-del-btn me-1 mb-2 " data-mdb-toggle="tooltip"
                                                    title="Remove item">
                                                    <BiSolidTrashAlt />
                                                </button>


                                            </td>
                                        </tr>
                                    ))
                                }



                            </tbody>
                        </table>
                    </div>
                       }
                    </div>
                </div>
            </div>







        </>
    )
}

export default Wishlist