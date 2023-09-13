import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useState, useEffect } from 'react'
import { productSchema } from '../../schemas/index';
import SingleSelect from '../Select/SingleSelect';
import MultiSelect from '../Select/MultiSelect';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const PrPostForm = (props) => {

    const [error, setError] = useState();
    const [hoverImgFile, setHoverImgFile] = useState();
    const [posterImgFile, setPosterImgFile] = useState();
    const [imageFile, setImageFile] = useState([]);
    const [watch, setWatch] = useState({
        brands: [],
        categories: [],
        colors: [],
        sizes: [],
        genderStatus: []
    })

    const navigate = useNavigate();

    useEffect(() => {

        const getBrands = async () => {
            var response = await axios.get("https://localhost:7039/api/Brands/all")
            const data = response.data.map(item => ({ value: item.id, label: item.name }))
            setWatch(previousState => { return { ...previousState, brands: data } })
        }
        getBrands();

        const getCategories = async () => {
            var response = await axios.get("https://localhost:7039/api/Categories/all")
            const data = response.data.map(item => ({ value: item.id, label: item.name }))
            setWatch(previousState => { return { ...previousState, categories: data } })
        }
        getCategories();

        const getColors = async () => {
            var response = await axios.get("https://localhost:7039/api/Colors/all")
            const data = response.data.map(item => ({ value: item.id, label: item.name }))
            setWatch(previousState => { return { ...previousState, colors: data } })
        }
        getColors();

        const getSizes = async () => {
            var response = await axios.get("https://localhost:7039/api/Sizes/all")
            const data = response.data.map(item => ({ value: item.id, label: item.name }))
            setWatch(previousState => { return { ...previousState, sizes: data } })
        }
        getSizes();

        const getGenders = async () => {
            var response = await axios.get("https://localhost:7039/api/Genders/all")
            const data = response.data.map(item => ({ value: item.id, label: item.gender }))
            setWatch(previousState => { return { ...previousState, genderStatus: data } })
        }
        getGenders();
    }, [])




    const initialValues = {
        brandId: 0,
        categoryId: 0,
        name: '',
        gender: 0,
        desc: '',
        salePrice: 0,
        costPrice: 0,
        discountedPrice: 0,
        stockStatus:true,
        isNew: true,
        isFeatured: false,
        posterFile: null,
        hoverFile: null,
        imageFiles: [],
        sizeIds: [],
        colorIds: []
    }

    const onSubmit = (values) => {


        const postProduct = async () => {
            const formData = new FormData();

            formData.append("brandId", values.brandId);
            formData.append("categoryId", values.categoryId);
            formData.append("name", values.name);
            formData.append("gender", values.gender);
            formData.append("desc", values.desc);
            formData.append("salePrice", values.salePrice);
            formData.append("costPrice", values.costPrice);
            formData.append("discountedPrice", values.discountedPrice);
            formData.append("isNew", values.isNew);
            formData.append("isFeatured", values.isFeatured);
            formData.append("stockStatus", values.stockStatus);

            formData.append("posterFile", values.posterFile);
            formData.append("hoverFile", values.hoverFile);

            values.imageFiles.forEach((file, index) => {
                formData.append(`imageFiles`, file);
            });

            values.sizeIds.forEach(sizeId => {
                formData.append("sizeIds", sizeId);
            });

            values.colorIds.forEach(colorId => {
                formData.append("colorIds", colorId);
            });

            try {
                 await axios.post("https://localhost:7039/api/Products", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                toast.success('Product added successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                navigate("/dashboard/products")
            } catch (error) {
                if (error.response.status === 400) {
                    error.response.data.errors.forEach(err => setError(err.errorMessage));
                } else if (error.response.status === 404) {
                    navigate("*");
                } else {
                    setError("An unexpected error occurred");
                }
            }
        };

        postProduct();

    }



    return (
        <>
            <div className="product-form">
                <div className="form-head">
                    <h6>{props.tableName}</h6>
                </div>

                <Formik initialValues={initialValues}  onSubmit={onSubmit} >
                    {({ values, setFieldValue }) => (
                        <Form>

                            <div className="form-content">

                                <div className="form-body">
                                    <label >Product Name <span>*</span></label>
                                    <Field className="dash-input" type="text" id="name" name="name" placeholder=" Name" />
                                    <ErrorMessage name="name" component="div" className="error-message" />
                                    {error && <div className="error-message">{error}</div>}
                                </div>
                                <div className="row">
                                    <div className="col-lg-4"> <div className="form-body">
                                        <label >Product Brand <span>*</span></label>
                                        <SingleSelect className="select-input" id="brandId" name="brandId" options={watch.brands} />
                                        <ErrorMessage name="brandId" component="div" className="error-message" />
                                        {error && <div className="error-message">{error}</div>}


                                    </div></div>
                                    <div className="col-lg-4"> <div className="form-body">
                                        <label >Product Category <span>*</span></label>
                                        <SingleSelect className='select-input' name="categoryId" options={watch.categories} />
                                        <ErrorMessage name="categoryId" component="div" className="error-message" />
                                        {error && <div className="error-message">{error}</div>}

                                    </div></div>
                                    <div className="col-lg-4"> <div className="form-body">
                                        <label >Product Gender <span>*</span></label>
                                        <SingleSelect className="select-input" name="gender" options={watch.genderStatus} />
                                        <ErrorMessage name="gender" component="div" className="error-message" />
                                        {error && <div className="error-message">{error}</div>}


                                    </div></div>

                                </div>


                                <div className="form-body">
                                    <label >Product Colors <span>*</span></label>
                                    <MultiSelect className="select-input" name="colorIds" options={watch.colors} />
                                    <ErrorMessage name="colorIds" component="div" className="error-message" />
                                    {error && <div className="error-message">{error}</div>}

                                </div>

                                <div className="form-body">
                                    <label >Product Sizes <span>*</span></label>
                                    <MultiSelect className="select-input" name="sizeIds" options={watch.sizes} />
                                    <ErrorMessage name="sizeIds" component="div" className="error-message" />
                                    {error && <div className="error-message">{error}</div>}

                                </div>




                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="form-body">
                                            <label >Sale Price <span>*</span></label>
                                            <Field className="dash-input" type="text" id="salePrice" name="salePrice" placeholder=" Sale Price" />
                                            <ErrorMessage name="salePrice" component="div" className="error-message" />
                                            {error && <div className="error-message">{error}</div>}

                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-body">
                                            <label >Cost Price <span>*</span></label>
                                            <Field className="dash-input" type="text" id="costPrice" name="costPrice" placeholder=" Cost Price" />
                                            <ErrorMessage name="costPrice" component="div" className="error-message" />
                                            {error && <div className="error-message">{error}</div>}

                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-body">
                                            <label >Discounted Price <span>*</span></label>
                                            <Field className="dash-input" type="text" id="discountedPrice" name="discountedPrice" placeholder="Discounted Price" />
                                            <ErrorMessage name="discountedPrice" component="div" className="error-message" />
                                            {error && <div className="error-message">{error}</div>}

                                        </div>
                                    </div>
                                </div>

                                <div className="form-body">
                                    <label >Product Description <span>*</span></label>
                                    <Field className="dash-input" as="textarea" id="desc" name="desc" placeholder=" Text" />
                                    <ErrorMessage name="desc" component="div" className="error-message" />
                                    {error && <div className="error-message">{error}</div>}

                                </div>

                                <div className="form-body">
                                    <label >Product Poster Image <span>*</span></label>
                                    <input type="file" className="dash-input" id="PosterFile" name="PosterFile" onChange={(event) => {
                                        setFieldValue("posterFile", event.target.files[0])
                                        setPosterImgFile(URL.createObjectURL(event.target.files[0]))
                                    }} />
                                </div>
                                <ErrorMessage name="posterFile" component="div" className="error-message" />
                                {error && <div className="error-message">{error}</div>}

                                <div className="preview-img ">
                                    {posterImgFile && <img width={150} src={posterImgFile} alt="" />}
                                </div>

                                <div className="form-body">
                                    <label >Product Hover Image <span>*</span></label>

                                    <input type="file" className="dash-input" id="hoverFile" name="hoverFile" onChange={(event) => {
                                        setFieldValue("hoverFile", event.target.files[0])
                                        setHoverImgFile(URL.createObjectURL(event.target.files[0]))
                                    }} />
                                    <ErrorMessage name="hoverFile" component="div" className="error-message" />
                                    {error && <div className="error-message">{error}</div>}

                                </div>
                                <div className="preview-img ">
                                    {hoverImgFile && <img width={150} src={hoverImgFile} alt="" />}
                                </div>

                                <div className="form-body">
                                    <label >Product Images <span>*</span></label>

                                    <input type="file" multiple className="dash-input" id="imageFiles" name="imageFiles" onChange={(event) => {
                                        const selectedFiles = event.target.files;
                                        setImageFile([...imageFile, ...selectedFiles]);
                                        setFieldValue("imageFiles", [...selectedFiles]);
                                    }} />
                                    <ErrorMessage name="imageFiles" component="div" className="error-message" />
                                    {error && <div className="error-message">{error}</div>}


                                </div>
                                <div className="mt-4">
                                    <div className="row align-items-center justify-content-center  g-1">
                                        {imageFile && imageFile.map((imgFile, index) => (
                                            <div className="col-lg-3">
                                                <img key={index} width={100} height={100}  className='images' src={URL.createObjectURL(imgFile)} alt={`Image ${index}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>


                             


                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="form-body d-flex flex-column align-items-center gap-2 ">
                                            <Field className="check-input" type="checkbox" name='isNew' />
                                            <label >Is New</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-body d-flex flex-column align-items-center gap-2">
                                            <Field type="checkbox" className="check-input" name='isFeatured' />   <label >Is Feautred</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-body d-flex flex-column align-items-center gap-2">
                                            <Field type="checkbox" className="check-input" name='stockStatus' />   <label >Is Stock</label>
                                        </div>
                                    </div>

                                </div>



                                {error && <div className="error-message">{error}</div>}

                                <button type="submit">Create</button>
                            </div>


                        </Form>
                    )}
                </Formik>
            </div >

        </>
    )
}

export default PrPostForm