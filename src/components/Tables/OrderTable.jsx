import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { getOrders } from '../../control/fetchSlice';

const OrderTable = (props) => {
    let count = 1;
    const dispatch = useDispatch();


    const acceptHandle = async (id) => {
        await axios.put(`https://localhost:7039/api/Orders/accepted/${id}`)
            .then(res => {
                console.log("Order Accepted Succesfully")
                dispatch(getOrders())
            })
            .catch(err => console.log("Error"))
    }

    const rejectHandle = async (id) => {

        await axios.put(`https://localhost:7039/api/Orders/rejected/${id}`)
        .then(res => {
            console.log("Order Rejected Succesfully")
            dispatch(getOrders())
        })
        .catch(err => console.log("Error"))

    }

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
                                <th>FullName</th>
                                <th>PhoneNumber</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Items</th>
                                <th>Amount</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>
                            {
                                props.data && props.data.map((order, index) => (
                                    <tr key={index}>
                                        <td >{count++}</td>
                                        <td>{order.user.fullName}</td>
                                        <td>{order.user.phoneNumber}</td>
                                        <td>{order.user.address}</td>
                                        <td>{order.status === 1 ? "Pending" : order.status === 2 ? "Accepted" : "Rejected"}</td>
                                        <td>{order.totalItem}</td>
                                        <td>{order.totalAmount}</td>
                                        <td className='d-flex flex-column gap-4' >
                                            <button disabled={order.status !==1} className='btn btn-warning accept-btn' onClick={() => acceptHandle(order.id)} >Accepted</button>
                                            <button disabled={order.status !==1} className='btn btn-danger reject-btn ' onClick={() => rejectHandle(order.id)} >Rejected</button>
                                        </td>
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

export default OrderTable