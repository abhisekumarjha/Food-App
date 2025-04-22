import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'


const Orders = ({ url }) => {
    const [Orders, setOrders] = useState([]);

    const fetchOrders = async function () {
        const response = await axios.get(`${url}/api/v1/order/list`);

        if (response.data.success) {
            setOrders(response.data.data)
            // console.log(response.data.data);  
        } else {
            toast.error("Error at fetching orders list from backend! 😞")
        }
    };

    const orderStatusHandler = async function (event, orderId) {
        const response = await axios.post(`${url}/api/v1/order/status`, {
            orderId,
            status: event.target.value,
        });

        if (response.data.success) {
            await fetchOrders();
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [])


    return (
        <div className='order add'>
            <h3>All Orders</h3>
            <div className="order-list">
                {Orders.map((order, index) => {
                    return (
                        <div key={index} className="order-item">
                            <img src={assets.parcel_icon} alt="pracelIcon" />
                            <div>
                                <p className="order-item-food">
                                    {order.items.map((item, index) => {
                                        if (index === order.items.length - 1) {
                                            return `${item.name} x ${item.quantity}`
                                        } else {
                                            return `${item.name} x ${item.quantity}, `
                                        }
                                    })}
                                </p>
                                <p className='order-item-name'>
                                    {`${order.address.firstName} ${order.address.lastName ? order.address.lastName : ""}`}
                                </p>
                                <div>
                                    <div className='order-item-contact'>
                                        <a href={`mailto:${order.address.email}`}>{order.address.email}</a>
                                        <br />
                                        <a href={`tel:+${order.address.phone}`}>{order.address.phone}</a>
                                    </div>
                                    <div className='order-item-address'>
                                        <address>{`${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`}</address>
                                    </div>
                                </div>
                            </div>
                            <p>Items: {order.items.length}</p>
                            <p>
                                ₹ {Number(order.amount).toLocaleString('en-IN', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>
                            <div>
                                <select
                                    onChange={(event) => orderStatusHandler(event, order._id)}
                                    value={order.status}
                                    name="orderStatus">
                                    <option value="Food Processing">Food Processing</option>
                                    <option value="Out for delivery">Out for delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default Orders