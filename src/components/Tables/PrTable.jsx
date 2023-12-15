import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LuEdit } from 'react-icons/lu';
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setId } from '../../control/dashboardSlice';

const PrTable = (props) => {
    let count = 1;
    const navigate = useNavigate();
    const disPatch = useDispatch();

  

    const exportHandle = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/Products/export-excel`, {
                responseType: 'arraybuffer', 
            });
    
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
            const url = window.URL.createObjectURL(blob);
    
            const link = document.createElement('a');
            link.href = url;
            link.download = 'product.xlsx';
            document.body.appendChild(link);
            link.click();
    
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
    };
    

    const deleteHandle = async (id) => {
        await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/api/Products/${id}`)
                .then(response =>
                  toast.error(`Products deleted successfully`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })
        
                  )
                .catch(error => console.log(error))
          navigate(`/dashboard/products`)
          disPatch(setId(id))
    }


 


    return (
        <>

            <div className="prtable">

                <div className="table-head d-flex align-items-center justify-content-between">
                    <h6>Product table  </h6>
                    <div className="action-side d-flex align-items-center gap-1">
                        <Link to='/dashboard/products/create' id='cr-btn' className='btn btn-success'  >Create</Link>
                        <button onClick={exportHandle} id='export-btn' className='btn btn-primary'>Export</button>
                    </div>
                </div>

                <div className="table-body">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Category</th>
                                <th>Gender</th>
                                <th>Colors</th>
                                <th>Sizes</th>
                                <th>Cost Price</th>
                                <th>Sale Price</th>
                                <th>Discounted Price</th>
                                <th>Image</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>
                            {
                                props.products && props.products.map((pr, index) => (
                                    <tr key={index}>
                                        <td >{count++}</td>
                                        <td>{pr.name.substring(0, 35)}...</td>
                                        <td>
                                            {pr.sizes.map((size, index) => (
                                                <span key={index}>
                                                    {index > 0 && ", "}
                                                    {size.name}
                                                </span>
                                            ))}
                                        </td>
                                        <td>{pr.brand.name}</td>
                                        <td>{pr.category.name}</td>
                                        <td>{pr.gender.name}</td>
                                        <td>{pr.colors.map((color, index) => (
                                            <span key={index}>{color.name}</span>
                                        ))}</td>

                                        <td>{pr.costPrice}</td>
                                        <td>{pr.salePrice}</td>
                                        <td>{pr.discountedPrice}</td>
                                        <td> {pr.images.map((img, index) => (
                                            img.imageStatus && <img key={index} width={60} src={img.imageName} alt='my img' />
                                        ))} </td>
                                        <td className='d-flex flex-column gap-4  ' >
                                            <Link to={`/dashboard/products/${pr.id}`} id='up-btn' className='w-100 btn btn-warning d-flex align-items-center justify-content-center gap-1 '>
                                                <LuEdit className='table-icon ' /> Edit
                                            </Link>

                                            <Link  onClick={() => deleteHandle(pr.id)} id='dlt-btn' className='w-100 btn btn-danger d-flex align-items-center justify-content-center gap-1  ' > <MdDeleteForever className='table-icon' /> Delete</Link> </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default PrTable