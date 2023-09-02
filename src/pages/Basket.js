import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBasketItems, setCount, setProduct } from '../control/basketSlice'
import axios from 'axios'

const Basket = () => {

    const { product } = useSelector(store => store.basket)
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const dispatch = useDispatch();
    const [dataId, setDataId] = useState();
    const [clicked, setClicked] = useState(0)
    
    const AddBasketHandle = async (values) =>{

        if(token){
            await axios.post(`https://localhost:7039/api/Shops`, values ,{
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            })
            .then(res=> {
                setDataId(res.data.count);
                setClicked(clicked + 1)
                dispatch(setCount(res.data.count))

            } )
            .catch(err=>{
             err.response &&    console.log(err.response.data);
            })
        }
        else{
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

    const MinusHandle = (itemIndex,id) => {
        const countSpan = document.getElementById(`count-${itemIndex}`);
        if (countSpan) {
            const currentValue = parseInt(countSpan.textContent, 10);
            countSpan.textContent = currentValue>1? currentValue -1 : 1 ;
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

            <div className="container-own">

                <div className="basket">
                    <section id="cart">
                        {
                            product && product.items.map((item, index) => (
                                <article key={index} className="product">
                                    <header>
                                        <a className="remove">
                                            {
                                                item.product.images.map((img, index) => (
                                                    <img key={index} src={`https://localhost:7039/uploads/products/${img.imageName}`} alt="Gamming Mouse" />
                                                ))
                                            }

                                            <h3 onClick={() => DeletePrHandle(item.product.id)} >Remove product</h3>
                                        </a>
                                    </header>

                                    <div className="content">

                                        <h1>{item.product.name}</h1>

                                        {item.product.desc.substring(0, 250)}...

                                        {
                                            item.product.productColors.map((color) => (
                                                <div title="You have selected this product to be shipped in the color yellow." style={{ top: 0 }} className={`color ${color.color.name}`}></div>))}
                                        <div style={{ top: 43 }} className="type small">
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

                                    <footer className="content">
                                        <span onClick={() => MinusHandle(index, item.product.id)} className="qt-minus">-</span>
                                        <span id={`count-${index}`} className="qt">
                                            {item.count}
                                        </span>
                                        <span onClick={() => PlusHandle(index, item.product.id)} className="qt-plus">+</span>

                                        <h2 className="full-price">
                                            ${(item.count * (item.product.discountedPrice > 0 ? item.product.discountedPrice : item.product.salePrice)).toFixed(2)}
                                        </h2>

                                        <h2 className="price">
                                            ${item.product.discountedPrice > 0 ? item.product.discountedPrice : item.product.salePrice}
                                        </h2>
                                    </footer>
                                </article>

                            ))
                        }


                    </section>
                </div>

            </div>

        </>
    )
}

export default Basket