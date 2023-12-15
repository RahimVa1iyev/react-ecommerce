import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import { toast } from 'react-toastify';



const PrPutForm = (props) => {
    const [error, setError] = useState();
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);

    const [reaminingIds, setRemainingIds] = useState([])
    const [hoverImgFile, setHoverImgFile] = useState();
    const [posterImgFile, setPosterImgFile] = useState();
    const [imageFile, setImageFile] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState({});
    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedGender, setSelectedGender] = useState({});
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);



    const [watch, setWatch] = useState({
        brands: [],
        categories: [],
        colors: [],
        sizes: [],
        genderStatus: []
    })



    const [initialValues, setInitialValues] = useState({
        brandId: 0,
        categoryId: 0,
        name: '',
        gender: 0,
        desc: '',
        salePrice: 0,
        costPrice: 0,
        discountedPrice: 0,
        isNew: true,
        isFeatured: false,
        stockStatus:true,
        posterFile: null,
        hoverFile: null,
        imageFiles: [],
        sizeIds: [],
        colorIds: [],
        imageIds: []
    })


    const onSubmit = (values) => {

        console.log("Values",values);

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

       values.imageFiles && values.imageFiles.forEach((file, index) => {
            formData.append(`imageFiles`, file);
        });

        
        values.sizeIds.forEach(sizeId=>{
            if (typeof sizeId === 'object') {
                formData.append("sizeIds", sizeId.sizeId);
            } else {
                formData.append("sizeIds", sizeId);
            }
        })

        values.colorIds.forEach(colorId => {
            if (typeof colorId === 'object') {
                formData.append("colorIds", colorId.colorId);
            } else {
                formData.append("colorIds", colorId);
            }
        });

        values.imageIds.forEach(imgId => {
            formData.append("imageIds", imgId);
        });
       

        const putProduct = async () => {
            await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/${props.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(res => {
                   
                    navigate("/dashboard/products")
                    toast.success('Product updated successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                })
                .catch(error => {
                    console.log(error.response.data);
                    if (error.response.status === 400) {
                        error.response.data.errors.forEach(err => setError(err.errorMessage));
                        console.log(error.response.data);
                    }
                    else if (error.response.status === 404)
                        console.log(error.response);

                    else {
                        console.log("An unexpected error occurred ");
                    }
                })

        }
        putProduct();
    }



    const navigate = useNavigate();



    useEffect(() => {

        const getProducts = async () => {
            var response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/Products/${props.id}`)


            const productData = response.data;

            var data = productData.images.filter((img) => (
                img.imageStatus === null && img.imageName
            ))

            const imageIds = data.map((img) => (
                img.id
            ))

            
            setRemainingIds(imageIds)

            const newInitialValues = {
                brandId: productData.brand.id,
                categoryId: productData.category.id,
                name: productData.name,
                gender: productData.gender.id,
                desc: productData.desc,
                salePrice: productData.salePrice,
                costPrice: productData.costPrice,
                discountedPrice: productData.discountedPrice,
                isNew: productData.isNew,
                stockStatus : productData.stockStatus,
                isFeatured: productData.isFeatured,
                sizeIds: productData.sizes,
                colorIds: productData.colors,
                imageIds: imageIds
            }

            setInitialValues(newInitialValues);

            setSelectedBrand({ value: productData.brand.id, label: productData.brand.name })
            setSelectedCategory({ value: productData.category.id, label: productData.category.name })
            setSelectedGender({ value: productData.gender.id, label: productData.gender.name })

            const newColors = productData.colors.map((prc) => ({
                value: prc.colorId,
                label: prc.name
            }))

            setSelectedColors(newColors)

            const newSizes = productData.sizes.map((prc) => ({
                value: prc.sizeId,
                label: prc.name,
            }));


            setSelectedSizes(newSizes);



            const filteredPImages = productData.images.filter((posterF) => (posterF.imageStatus === true));
            filteredPImages.map((posterF) => setPosterImgFile(posterF.imageName))

            const filteredHImages = productData.images.filter((hoverF) => (hoverF.imageStatus === false));
            filteredHImages.map((hoverF) => setHoverImgFile(hoverF.imageName))

            const imageName = data.map((img) => (
                {
                    id: img.id,
                    value: img.imageName
                }
            ))

            setImageFile(imageName)



        }
        getProducts();

        const getBrands = async () => {
            var response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/Brands/all`)
            const data = response.data.map(item => ({ value: item.id, label: item.name }))
            setWatch(previousState => { return { ...previousState, brands: data } })
        }
        getBrands();

        const getCategories = async () => {
            var response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/Categories/all`)
            const data = response.data.map(item => ({ value: item.id, label: item.name }))
            setWatch(previousState => { return { ...previousState, categories: data } })
        }
        getCategories();

        const getColors = async () => {
            var response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/Colors/all`)
            const data = response.data.map(item => ({ value: item.id, label: item.name }))
            setWatch(previousState => { return { ...previousState, colors: data } })

        }
        getColors();

        const getSizes = async () => {
            var response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/Sizes/all`)
            const data = response.data.map(item => ({ value: item.id, label: item.name }))
            setWatch(previousState => { return { ...previousState, sizes: data } })
        }
        getSizes();

        const getGenders = async () => {
            var response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/Genders/all`)
            const data = response.data.map(item => ({ value: item.id, label: item.gender }))
            setWatch(previousState => { return { ...previousState, genderStatus: data } })
        }
        getGenders();
    }, [props.id])



    return (
        <>
            <div className="product-form">
                <div className="form-head">
                    <h6>{props.tableName}</h6>
                </div>

                <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit} >
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
                                        <Select className="select-input" classNamePrefix="select" value={selectedBrand} isClearable={isClearable} isSearchable={isSearchable} name="brandId" options={watch.brands}
                                            onChange={(selectedOptions) => {
                                                if (selectedOptions) {
                                                    setSelectedBrand(selectedOptions);
                                                    setFieldValue("brandId", selectedOptions.value);
                                                } else {
                                                    setSelectedBrand(null);
                                                    setFieldValue("brandId", null);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="brandId" component="div" className="error-message" />
                                        {error && <div className="error-message">{error}</div>}


                                    </div></div>
                                    <div className="col-lg-4"> <div className="form-body">
                                        <label >Product Category <span>*</span></label>
                                        <Select className="select-input" classNamePrefix="select" value={selectedCategory} isClearable={isClearable} isSearchable={isSearchable} name="categoryId" options={watch.categories}
                                            onChange={(selectedOptions) => {
                                                if (selectedOptions) {
                                                    setSelectedCategory(selectedOptions);
                                                    setFieldValue("categoryId", selectedOptions.value);
                                                } else {
                                                    setSelectedCategory(null);
                                                    setFieldValue("categoryId", null);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="categoryId" component="div" className="error-message" />
                                        {error && <div className="error-message">{error}</div>}

                                    </div></div>
                                    <div className="col-lg-4"> <div className="form-body">
                                        <label >Product Gender <span>*</span></label>
                                        <Select className="select-input" classNamePrefix="select" value={selectedGender} isClearable={isClearable} isSearchable={isSearchable} name="gender" options={watch.genderStatus}
                                            onChange={(selectedOptions) => {
                                                if (selectedOptions) {
                                                    setSelectedGender(selectedOptions);
                                                    setFieldValue("gender", selectedOptions.value);
                                                } else {
                                                    setSelectedGender(null);
                                                    setFieldValue("gender", null);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="gender" component="div" className="error-message" />
                                        {error && <div className="error-message">{error}</div>}
                                    </div></div>

                                </div>


                                <div className="form-body">
                                    <label >Product Colors <span>*</span></label>
                                    <Select isMulti className="select-input" classNamePrefix="select" value={selectedColors} isClearable={isClearable} isSearchable={isSearchable} name="colorIds" options={watch.colors}
                                        onChange={(selectedOptions) => {
                                            if (selectedOptions) {
                                                setSelectedColors(selectedOptions);
                                                setFieldValue("colorIds", selectedOptions.map(option => option.value));
                                            } else {
                                               
                                                setFieldValue("colorIds", selectedColors);
                                            }

                                        }}
                                    />
                                    <ErrorMessage name="colorIds" component="div" className="error-message" />
                                    {error && <div className="error-message">{error}</div>}

                                </div>

                                <div className="form-body">
                                    <label >Product Sizes <span>*</span></label>
                                    <Select isMulti className="select-input" classNamePrefix="select" value={selectedSizes} isClearable={isClearable} isSearchable={isSearchable} name="sizeIds" options={watch.sizes}
                                        onChange={(selectedOptions) => {

                                            if (selectedOptions) {
                                                setSelectedSizes(selectedOptions);
                                                setFieldValue("sizeIds", selectedOptions.map(option => option.value));
                                            } else {
                                               
                                                setFieldValue("size Ids", selectedSizes);
                                            }
                                        }}
                                    />
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
                                    <input type="file" className="dash-input" id="posterFile" name="posterFile" onChange={(event) => {
                                        if (event != null) {
                                            setFieldValue("posterFile", event.target.files[0])
                                            setPosterImgFile(URL.createObjectURL(event.target.files[0]))
                                        }
                                        else {
                                            setFieldValue("posterFile", null)
                                        }
                                    }} />

                                </div>
                                <ErrorMessage name="posterFile" component="div" className="error-message" />
                                {error && <div className="error-message">{error}</div>}

                                <div className="preview-img ">
                                    {posterImgFile && <img width={150} src={posterImgFile} alt="" />}
                                </div>

                                <div className="form-body">
                                    <label>Product Hover Image <span>*</span></label>

                                    <input type="file" className="dash-input" id="hoverFile" name="hoverFile" onChange={(event) => {
                                        if (event != null) {
                                            setFieldValue("hoverFile", event.target.files[0])
                                            setHoverImgFile(URL.createObjectURL(event.target.files[0]))
                                        }
                                        else {
                                            setFieldValue("hoverFile", null)
                                        }
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
                                        if (event != null) {
                                            const selectedFiles = event.target.files;
                                            setFieldValue("imageFiles", [...selectedFiles])

                                        }
                                        else {
                                            setFieldValue("imageFiles", [])
                                        }



                                    }} />
                                    <ErrorMessage name="imageFiles" component="div" className="error-message" />
                                    {error && <div className="error-message">{error}</div>}


                                </div>
                                <div className="preview-img">
                                    <div className="row align-items-center justify-content-center g-1">
                                        {imageFile && imageFile.map((file) => (
                                            <div className="col-lg-4">
                                                <span className='x-btn-r' id={file.id} onClick={(e) => {
                                                    e.target.closest('.col-lg-4').remove();
                                                    const clickidId = parseInt(e.target.id);

                                                    var newIds = reaminingIds.filter((imgId) => imgId !== clickidId)
                                                      setRemainingIds(newIds)
                                                      setFieldValue("imageIds", newIds)
                                                   


                                                }} >x</span>
                                                <img width={150} src={file.value} alt='my image' />
                                                <input type="hidden" name="imageIds" value={file.id} />
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

                                <button type="submit">Edit</button>
                            </div>


                        </Form>
                    )}
                </Formik>
            </div >
        </>
    )
}

export default PrPutForm