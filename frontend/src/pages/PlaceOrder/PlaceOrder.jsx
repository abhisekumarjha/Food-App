import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../contextAPI/store';
import { Link, useNavigate } from 'react-router'
import axios from 'axios';


const PlaceOrder = () => {
    const standardDeliveryFee = Number(40);

    const { getTotalCartAmt, token, food_list, cartItems, url } = useContext(StoreContext);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        phone: "",
    });

    const onChangeHandler = function (event) {
        const name = event.target.name;
        const value = event.target.value;
        setData((prev_data) => ({ ...prev_data, [name]: value }))
    };

    const placeOrder = async function (event) {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            };
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmt() + standardDeliveryFee,
        };

        let response = await axios.post(`${url}/api/v1/order/place`, orderData, { headers: { token } });

        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        } else {
            alert("Something went wrong 🤔")
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/cart');
            alert("Please login!");
        } else if (getTotalCartAmt() === 0) {
            navigate('/cart');
        }
    }, [token])


    return (
        <form
            onSubmit={placeOrder}
            action="placeOrder" className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Informatio</p>
                <div className="multi-fields">
                    <input type="text"
                        onChange={onChangeHandler}
                        value={data.firstName}
                        name="firstName" id="firstName" placeholder='First Name' required />
                    <input type="text"
                        onChange={onChangeHandler}
                        value={data.lastName}
                        name="lastName" id="lastName" placeholder='Last Name (optional)' />
                </div>
                <input type="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    name="email" id="email" placeholder='email' autoComplete='on' required />
                <input type="text"
                    onChange={onChangeHandler}
                    value={data.street}
                    name="street" id="street" placeholder='street' required />
                <div className="multi-fields">
                    <input type="text"
                        onChange={onChangeHandler}
                        value={data.city}
                        name="city" id="city" placeholder='city' required />
                    <input type="text"
                        onChange={onChangeHandler}
                        value={data.state}
                        name="state" id="state" placeholder='state' required />
                </div>
                <div className="multi-fields">
                    <input
                        type="text"
                        name="pincode"
                        id="pincode"
                        placeholder="pincode"
                        required
                        inputMode="numeric"
                        pattern="\d{4,6}"
                        maxLength="6"
                        onChange={onChangeHandler}
                        value={data.pincode}
                    />
                    <input type="text"
                        onChange={onChangeHandler}
                        value={data.country}
                        name="country" id="country" placeholder='country' autoComplete='on' />
                </div>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="phone"
                    required
                    pattern="[0-9]{10}"
                    title="Enter exactly 10 digits"
                    maxLength="10"
                    inputMode="numeric"
                    onChange={onChangeHandler}
                    value={data.phone}
                    autoComplete='on'
                />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Sub Total</p>
                            <p>₹ {getTotalCartAmt().toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>₹ {getTotalCartAmt() === 0 ? Number(0).toFixed(2) : (standardDeliveryFee).toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>₹ {getTotalCartAmt() === 0 ? Number(0).toFixed(2) : (getTotalCartAmt() + standardDeliveryFee).toFixed(2)}</b>
                        </div>
                    </div>
                    <button type='submit'>Proceed to payment</button>
                    <Link to={'/cart'}>
                        <button type='button' style={{ backgroundColor: '#009000' }}>Back to Cart</button>
                    </Link>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder