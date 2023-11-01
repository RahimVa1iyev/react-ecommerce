import React, { useState } from 'react'
import img1 from '../assets/image/shop-img.png';
import { TbGridDots } from 'react-icons/tb';
import { HiOutlineBars3 } from 'react-icons/hi2';

import Pagination from '../components/Pagination/Pagination';
import { useEffect } from 'react';
import SecondShopItem from '../components/ShopItem/SecondShopItem';
import { Formik, Form, Field } from 'formik';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import Modals from '../components/Modal/Modals';
import PluginItem from '../components/Plugins/PluginItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Shop = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [products, setProducts] = useState({
        items: [],
        categories: [],
        brands: [],
        sizes: [],
        genders: [],
        prices: []
    })
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cols, setCols] = useState('1');



    const getBrands = async () => {
        await axios.get("http://rahimcode-001-site1.ftempurl.com/api/Brands/all")
            .then(res => { setProducts(previousState => { return { ...previousState, brands: res.data } }) })

    }

    const getCategories = async () => {
        await axios.get("http://rahimcode-001-site1.ftempurl.com/api/Categories/all")
            .then(res => { setProducts(previousState => { return { ...previousState, categories: res.data } }) })

    }

    const getGender = async () => {
        await axios.get("http://rahimcode-001-site1.ftempurl.com/api/Genders/all")
            .then(res => { setProducts(previousState => { return { ...previousState, genders: res.data } }) })
    }

    const getSizes = async () => {
        await axios.get("http://rahimcode-001-site1.ftempurl.com/api/Sizes/all")
            .then(res => { setProducts(previousState => { return { ...previousState, sizes: res.data } }) })

    }

    const getProducts = async () => {
        await axios.get(`http://rahimcode-001-site1.ftempurl.com/api/Products/shop`)
            .then(res => {
                const updatedPrices = res.data.map(pr =>
                    pr.discountedPrice > 0 ? pr.discountedPrice : pr.salePrice
                )
                setProducts(previousState => { return { ...previousState, items: res.data, prices: updatedPrices } })
                setFilteredProducts(res.data)

            })

    }

    

    useEffect(() => {
      
        getBrands();
        getCategories();
        getGender();
        getSizes();
        getProducts();

    }, [])




    const initialValues = {
        gender: '',
        categories: [],
        brands: [],
        sizes: [],
        price: [0, 0],
    };

    const onSubmit = (values) => {
        const { gender, brands, sizes, categories, price } = values;

        let filteredProducts = products.items;



        if (gender) {
            filteredProducts = filteredProducts.filter((product) => product.gender.name === gender);
        }

        if (categories.length > 0) {
            filteredProducts = filteredProducts.filter((product) => categories.includes(product.category.name));
        }

        if (brands.length > 0) {
            filteredProducts = filteredProducts.filter((product) => brands.includes(product.brand.name));
        }

        if (sizes.length > 0) {
            filteredProducts = filteredProducts.filter((product) => {
                return product.sizes.some((ps) => sizes.includes(ps.name));
            })
        }

        if (price) {
            filteredProducts = filteredProducts.filter(
                (product) => product.discountedPrice > 0 ? product.discountedPrice >= price[0] && product.discountedPrice <= price[1] : product.salePrice >= price[0] && product.salePrice <= price[1]
            );
        }

        setFilteredProducts(filteredProducts);

        setCurrentPage(1);
        setItemsPerPage(3);
    };


    const SortedHandler = (e) => {
        const value = e.target.value;
        console.log(value);
        let sortedProducts = []

        if (value === "a-z") {
            sortedProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
            setFilteredProducts(sortedProducts)
        }
        if (value === "z-a") {
            sortedProducts = [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name))
            setFilteredProducts(sortedProducts)

        }

        if (value === "low-high") {
            sortedProducts = [...filteredProducts].sort((a, b) => {
                if (a.discountedPrice === 0 && b.discountedPrice === 0) {
                    return a.salePrice - b.salePrice; 
                } else if (a.discountedPrice === 0) {
                    return a.salePrice - b.discountedPrice;
                } else if (b.discountedPrice === 0) {
                    return a.discountedPrice - b.salePrice; 
                } else {
                    return a.discountedPrice - b.discountedPrice;
                }
            })
            setFilteredProducts(sortedProducts)

        }

        if (value === "high-low") {

            sortedProducts = [...filteredProducts].sort((a, b) => {
                if (a.discountedPrice === 0 && b.discountedPrice === 0) {
                    return b.salePrice - a.salePrice;
                } else if (a.discountedPrice === 0) {
                    return b.discountedPrice - a.salePrice; 
                } else if (b.discountedPrice === 0) {
                    return b.salePrice - a.discountedPrice;
                } else {
                    return b.discountedPrice - a.discountedPrice;
                }
            });
            setFilteredProducts(sortedProducts)

        }

    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts && filteredProducts.slice(indexOfFirstItem, indexOfLastItem);



    const handlePageChange = async (pageNumber) => {
        setCurrentPage(pageNumber);

    };

    const CurrentpageHandle = (e) => {
        const perPage = parseInt(e.target.value)
        setItemsPerPage(perPage)
    }

    const ColHandler2 = (e) => {
        setCols(e.target.id)
    }
    const ColHandler3 = (e) => {
        setCols(e.target.id)
    }
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
                <div className="row">
                    <div className="col-lg-3 col-12 ">

                        <div className="shop-side-bar">
                           


                            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                                {({ values, setFieldValue }) => (
                                    <Form>
                                        <div className="sidebar-form">
                                            <span className='sidebar-title' >Gender</span>
                                            {
                                                products.genders && products.genders.map((gender, index) => (
                                                    <div key={index} className="form-check">
                                                        <label>
                                                            <Field type="radio" name="gender" value={gender.gender} />
                                                            {gender.gender}
                                                        </label>
                                                    </div>
                                                ))
                                            }

                                        </div>

                                        <hr />

                                        <div className="sidebar-form">
                                            <span className='sidebar-title' >Category</span>
                                            {
                                                products.categories && products.categories.map((ct, index) => (
                                                    <div key={index} className="form-check">
                                                        <label>
                                                            <Field type="checkbox" name="categories" value={ct.name} />
                                                            {ct.name}
                                                        </label>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <hr />

                                        <div className="sidebar-form">
                                            <span className='sidebar-title' >Brand</span>
                                            {
                                                products.brands && products.brands.map((brand, index) => (

                                                    <div key={index} className="form-check">
                                                        <label>
                                                            <Field type="checkbox" name="brands" value={brand.name} />
                                                            {
                                                                brand.name
                                                            }
                                                        </label>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <hr />

                                        <div className="sidebar-form">
                                            <span className='sidebar-title' >Size</span>
                                            {
                                                products.sizes && products.sizes.map((size, index) => (
                                                    <div className="form-check">
                                                        <label>
                                                            <Field type="checkbox" name="sizes" value={size.name} />
                                                            {
                                                                size.name
                                                            }
                                                        </label>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <div className="sidebar-form">
                                            <span className="sidebar-title">Price</span>
                                            <Slider
                                                value={values.price}
                                                onChange={(event, newValue) => setFieldValue('price', newValue)}
                                                valueLabelDisplay="auto"
                                                min={Math.min(...products.prices)}
                                                max={Math.max(...products.prices)}
                                                step={1}
                                                getAriaLabel={() => 'Price range'} // Sliderın aksessuarı üçün məlumat
                                                getAriaValueText={(value) => `$${value}`} // Qiyməti oxuyucu üçün məlumat
                                            />
                                            <div>
                                                <span>${values.price[0]}</span> - <span>${values.price[1]}</span>
                                            </div>
                                        </div>

                                        <button className='filter-btn' type="submit">Filter</button>
                                    </Form>
                                )}
                            </Formik>

                        </div>



                    </div>
                    <div className="col-lg-9 col-12">
                        <div className="shop-right-side">
                            <div className="top-side">
                                <img src={img1} alt="my img" />
                            </div>

                            <div className="filter-side row align-items-center ">
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center gap-4">
                                        <div className="three-dot d-flex align-item-center gap-3 ">
                                            <TbGridDots onClick={ColHandler2} id='3' className={cols === '3' ? "three active-dot" : "three"} />
                                            <HiOutlineBars3 onClick={ColHandler3} id='1' className={cols === '1' ? "one active-dot" : "one"} />
                                        </div>
                                        {filteredProducts &&
                                            <span className='result' >Showing {indexOfFirstItem + 1} - {indexOfLastItem >= filteredProducts.length ? filteredProducts.length : indexOfLastItem} of {filteredProducts.length} result</span>
                                        }
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="box d-flex  align-items-center justify-content-center gap-5">
                                        <div className="count-filter">
                                            <span>Show : </span>
                                            <select onChange={CurrentpageHandle} className='select-count-filter'>

                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="8">8</option>
                                                <option value="12">12</option>
                                                <option value="16">16</option>
                                                <option value="20">20</option>

                                            </select>
                                        </div>

                                        <div className="name-filter">

                                            <span>Sort by : </span>
                                            <select onChange={SortedHandler} className="select-name-filter">
                                                <option value="a-z">Alphabeticallly, A-Z</option>
                                                <option value="z-a">Alphabeticallly, Z-A</option>
                                                <option value="low-high">Price, low-to-high</option>
                                                <option value="high-low">Price, high-to-low</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center g-2">
                                {
                                    cols !== '1' ? currentItems && currentItems.map(product => (
                                        <PluginItem size={cols} product={product} />

                                    )) :
                                        currentItems && currentItems.map(product => (
                                            <SecondShopItem product={product} />
                                        ))
                                }
                            </div>
                        </div>

                        {
                            filteredProducts && <div className="pagination-side">
                                <Pagination currentPage={currentPage}
                                    totalPages={parseInt(Math.ceil(filteredProducts.length / itemsPerPage))}
                                    onPageChange={handlePageChange} />

                                <span>Showing {indexOfFirstItem + 1} - {indexOfLastItem >= filteredProducts.length ? filteredProducts.length : indexOfLastItem} of {filteredProducts.length} result</span>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className="modal">
               <Modals />
             </div>

        </>
    )
}

export default Shop