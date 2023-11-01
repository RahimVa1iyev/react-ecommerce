import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getDashOrders, getOrders } from '../../control/fetchSlice';
import Modals from '../Modal/Modals';
import { handleOpen, handleView, setOrderItem } from '../../control/modalSlice';

const OrderTable = (props) => {
    let count = 1;
    const dispatch = useDispatch();
    const [items, setItems] = useState();


    const acceptHandle = async (id) => {
        await axios.put(`http://rahimcode-001-site1.ftempurl.com/api/Orders/accepted/${id}`)
            .then(res => {
                console.log("Order Accepted Succesfully")
                dispatch(getDashOrders())
            })
            .catch(err => console.log("Error"))
    }

    const rejectHandle = async (id) => {

        await axios.put(`http://rahimcode-001-site1.ftempurl.com/api/Orders/rejected/${id}`)
            .then(res => {
                console.log("Order Rejected Succesfully")
                dispatch(getDashOrders())
            })
            .catch(err => console.log("Error"))

    }

    const viewHandle = async (id) => {
        dispatch(handleView())
        dispatch(handleOpen())
        await axios.get(`http://rahimcode-001-site1.ftempurl.com/api/Orders/orderitems/${id}`)
        .then(res => dispatch(setOrderItem(res.data)))
            .catch(err => console.log(err))
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
                                            <button className='btn btn-primary' onClick={() => viewHandle(order.id)} >View</button>
                                            <button disabled={order.status !== 1} className='btn btn-warning accept-btn' onClick={() => acceptHandle(order.id)} >Accepted</button>
                                            <button disabled={order.status !== 1} className='btn btn-danger reject-btn ' onClick={() => rejectHandle(order.id)} >Rejected</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>



            <div className="modal">
                <Modals />
            </div>
        </>
    )
}

export default OrderTable