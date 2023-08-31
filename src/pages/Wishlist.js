import React, { useEffect, useState } from 'react'
import  {FiX} from "react-icons/fi"

const Wishlist = () => {

    const [wishlistItems, setWishlidtItems] = useState([]);

    const basketHandler = () => {
        let wishlist = localStorage.getItem("wishlist");

        if (wishlist !== undefined) {
            setWishlidtItems(JSON.parse(wishlist));
        } else {
            setWishlidtItems([]);
        }
    }
    const deleteHandler = (id) =>{
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

    console.log(wishlistItems);
    useEffect(() => {
        basketHandler();
    }, [])

    return (
        <>

            <div className="container-own">
                <div className="wishlist">
                    <div className="row align-items-center justify-content-center gap-5 ">
                        {
                            wishlistItems && wishlistItems.map((item, index) => (
                                <div className="col-lg-3">
                                    <div key={index} class="wishlist-item">
                                        {
                                            item.images.map((img, index) => (
                                            
                                                img.imageStatus &&  <img key={index} src={ img.imageName} alt="Product 1" />
                                            ))
                                        }
                                        <FiX onClick={()=>deleteHandler(item.id)} className='wishlist-delete'/>
                                        <h2>{item.name}</h2>
                                        <p class="price">${item.discountedPrice>0?item.discountedPrice: item.salePrice}</p>
                                        <button class="add-to-cart">Add to Cart</button>
                                    </div>
                                </div>
                            ))
                        }


                    </div>
                </div>
            </div>



        </>
    )
}

export default Wishlist