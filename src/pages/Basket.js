import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBasketItems, setCount, setProduct } from '../control/basketSlice'
import { BiMinus, BiSolidTrashAlt } from "react-icons/bi"
import { AiFillHeart } from "react-icons/ai"
import { BiPlus } from "react-icons/bi"
import axios from 'axios'
import { Link } from 'react-router-dom'

const Basket = () => {

    const { product } = useSelector(store => store.basket)
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const dispatch = useDispatch();
    const [dataId, setDataId] = useState();
    const [clicked, setClicked] = useState(0)

    const AddBasketHandle = async (values) => {

        if (token) {
            await axios.post(`https://localhost:7039/api/Shops`, values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    setDataId(res.data.count);
                    setClicked(clicked + 1)
                    dispatch(setCount(res.data.count))

                })
                .catch(err => {
                    err.response && console.log(err.response.data);
                })
        }
        else {
            alert("Xeta bas verdi")
        }
    }

    const DeletePrHandle = async (id) => {
        console.log("Id", id);
        await axios.delete(`https://localhost:7039/api/Shops/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log("Product deleted");
                dispatch(getBasketItems())

            })

    }
    const PlusHandle = (itemIndex, id) => {
        const countSpan = document.getElementById(`count-${itemIndex}`);
        if (countSpan) {
            const currentValue = parseInt(countSpan.textContent, 10);
            countSpan.textContent = currentValue + 1;
            const values = { count: countSpan.textContent, id: id }
            AddBasketHandle(values)
        }
    };

    const MinusHandle = (itemIndex, id) => {
        const countSpan = document.getElementById(`count-${itemIndex}`);
        if (countSpan) {
            const currentValue = parseInt(countSpan.textContent, 10);
            countSpan.textContent = currentValue > 1 ? currentValue - 1 : 1;
            const values = { count: countSpan.textContent, id: id }
            AddBasketHandle(values)
        }
    }

    const dispathc = useDispatch()
    useEffect(() => {
        dispathc(getBasketItems())
    }, [clicked])
    return (
        <>

            <div classNameName="container-own">

                {/* <div classNameName="basket">
                    <section id="cart">
                        {
                            product && product.items.map((item, index) => (
                                <article key={index} classNameName="product">
                                    <header>
                                        <a classNameName="remove">
                                            {
                                                item.product.images.map((img, index) => (
                                                    <img key={index} src={`https://localhost:7039/uploads/products/${img.imageName}`} alt="Gamming Mouse" />
                                                ))
                                            }

                                            <h3 onClick={() => DeletePrHandle(item.product.id)} >Remove product</h3>
                                        </a>
                                    </header>

                                    <div classNameName="content">

                                        <h1>{item.product.name}</h1>

                                        {item.product.desc.substring(0, 250)}...

                                        {
                                            item.product.productColors.map((color) => (
                                                <div title="You have selected this product to be shipped in the color yellow." style={{ top: 0 }} classNameName={`color ${color.color.name}`}></div>))}
                                        <div style={{ top: 43 }} classNameName="type small">
                                            {
                                                item.product.productSizes.map((size, index) => (
                                                    <span key={index}>
                                                        {index > 0 && ", "}
                                                        {size.size.name}
                                                    </span>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    <footer classNameName="content">
                                        <span onClick={() => MinusHandle(index, item.product.id)} classNameName="qt-minus">-</span>
                                        <span id={`count-${index}`} classNameName="qt">
                                            {item.count}
                                        </span>
                                        <span onClick={() => PlusHandle(index, item.product.id)} classNameName="qt-plus">+</span>

                                        <h2 classNameName="full-price">
                                            ${(item.count * (item.product.discountedPrice > 0 ? item.product.discountedPrice : item.product.salePrice)).toFixed(2)}
                                        </h2>

                                        <h2 classNameName="price">
                                            ${item.product.discountedPrice > 0 ? item.product.discountedPrice : item.product.salePrice}
                                        </h2>
                                    </footer>
                                </article>

                            ))
                        }


                    </section>
                </div> */}

                <section className="h-100 gradient-custom">
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center my-4">
                            <div className="col-md-8">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="mb-0">Cart - 2 items</h5>
                                    </div>
                                    <div className="card-body">


                                        {
                                            product && product.items.map((item, index) => (

                                                <>
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                            <div className="shoping-cart-img">
                                                                {
                                                                    item.product.images.map((img, index) => (
                                                                        <img key={index} width={100} src={`https://localhost:7039/uploads/products/${img.imageName}`} alt="Gamming Mouse" />
                                                                    ))
                                                                }
                                                                <a href="#!">
                                                                </a>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                                            <p><strong>{item.product.name}</strong></p>
                                                            <p className='mt-2 mb-2' >  {
                                                                item.product.productColors.map((color, index) => (
                                                                    <span key={index}>
                                                                        {index > 0 && ", "}
                                                                        {color.color.name}
                                                                    </span>
                                                                ))
                                                            }</p>
                                                            <p className='mb-2'>  {
                                                                item.product.productSizes.map((size, index) => (
                                                                    <span key={index}>
                                                                        {index > 0 && ", "}
                                                                        {size.size.name}
                                                                    </span>
                                                                ))
                                                            }</p>
                                                            <button type="button" className="shopping-cart-del-btn me-1 mb-2" data-mdb-toggle="tooltip"
                                                                title="Remove item">
                                                                <BiSolidTrashAlt onClick={() => DeletePrHandle(item.product.id)} />
                                                            </button>
                                                            <button type="button" className="shopping-cart-heart-btn mb-2" data-mdb-toggle="tooltip"
                                                                title="Move to the wish list">
                                                                <AiFillHeart />
                                                            </button>
                                                        </div>

                                                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                            <div className="shopping-input mb-4" >
                                                                <button className="input-btn " onClick={() => MinusHandle(index, item.product.id)}>
                                                                    <BiMinus />
                                                                </button>

                                                                <div className="form-outline">
                                                                    <span id={`count-${index}`} className="qt">
                                                                        {item.count}
                                                                    </span>
                                                                </div>

                                                                <button onClick={() => PlusHandle(index, item.product.id)} className="input-btn"
                                                                >
                                                                    <BiPlus />
                                                                </button>
                                                            </div>

                                                            <p className="text-start text-md-center">
                                                                <strong>${item.product.discountedPrice > 0 ? item.product.discountedPrice : item.product.salePrice}</strong>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <hr className='my-4' />
                                                </>


                                            )
                                            )
                                        }






                                    </div>
                                </div>
                              
                               
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="mb-0">Summary</h5>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">

                                            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                Shipping
                                                <span>Gratis</span>
                                            </li>
                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                <div>
                                                    <strong>Total amount</strong>

                                                </div>
                                                <span><strong>

                                                    ${product && product.items.map((item, index) => (

                                            (item.count * (item.product.discountedPrice > 0 ? item.product.discountedPrice : item.product.salePrice)).toFixed(2)
                                                        

                                                    ))}
                                                </strong></span>
                                            </li>
                                        </ul>

                                        <Link to='/checkout' type="button" className="go-to-checkout-btn">
                                            Go to checkout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default Basket