import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LuEdit } from 'react-icons/lu';
import { MdDeleteForever } from 'react-icons/md';

const PrTable = (props) => {
    let count = 1;

    return (
        <>

            <div className="prtable">

                <div className="table-head">
                    <h6>Product table</h6>
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
                                        <td>{pr.name.substring(0, 35    )}...</td>
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

                                            <Link id='dlt-btn' className='w-100 btn btn-danger d-flex align-items-center justify-content-center gap-1  ' > <MdDeleteForever className='table-icon' /> Delete</Link> </td>

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