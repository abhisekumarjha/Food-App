import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../contextAPI/store'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async function () {
        const response = await axios.post(`${url}/api/v1/order/userorders`, {}, { headers: { token } });
        setData(response.data.data);
        // console.log(response.data.data); // delete this
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        < div className='my-orders' >
            <h2>My Orders</h2>
            <i><p>{data[0] ? data[0].address.firstName : ""} {data[0] ? data[0].address.lastName : ""}</p></i>
            <i><p>{data[0] ? data[0].address.email : ""}</p></i>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="parcelIcon" />
                            <p>
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return `${item.name} x ${item.quantity} `;
                                    } else {
                                        return `${item.name} x ${item.quantity}, `;
                                    }
                                })}
                            </p>
                            <p>₹ {Number(order.amount).toLocaleString('en-IN', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}</p>
                            <p>Total item: {order.items.length}</p>
                            <p>
                                {order.status === "Delivered" ? (
                                    <>
                                        <span style={{ color: 'green' }}>●</span>{" "}
                                        <i style={{ textDecoration: 'underline', color: 'green' }}>
                                            {order.status}
                                        </i>
                                    </>
                                ) : (order.status === "Food Processing" || order.status === "Out for delivery") ? (
                                    <>
                                        <span style={{ color: 'red' }}>●</span>{" "}
                                        <i style={{ textDecoration: 'underline', color: 'red' }}>
                                            {order.status}
                                        </i>
                                    </>
                                ) : null}
                            </p>
                            <button type="button" onClick={fetchOrders}>Track order</button>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default MyOrders