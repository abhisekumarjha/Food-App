import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../contextAPI/store'
import { NavLink } from "react-router";

const Cart = () => {
    const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmt, url, token } = useContext(StoreContext);
    const standardDeliveryFee = Number(40);
    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Item</p>
                    <p>Title</p>
                    <p>Price (₹)</p>
                    <p>Quantity</p>
                    <p>Total (₹)</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={index}>
                                <div className="cart-items-title cart-items-item">
                                    <img src={`${url}/images/${item.image}`} alt="itemImage" />
                                    <p>{item.name}</p>
                                    <p>₹ {item.price}.00</p>
                                    <p>{cartItems[item._id]}
                                        <span className='cart-add-remove-item-btn'>
                                            <span className='cart-add-remove-item-btn-remove'
                                                onClick={() => removeFromCart(item._id)}>-</span>
                                            <span
                                                className='cart-add-remove-item-btn-add'
                                                onClick={() => addToCart(item._id)}>+</span>
                                        </span>
                                    </p>
                                    <p>₹ {item.price * cartItems[item._id]}.00</p>
                                    <p className='close'
                                        onClick={() => removeFromCart(item._id)}
                                    >x</p>
                                </div>
                                <hr />
                            </div>
                        )
                    }
                })}
            </div>
            <div className="cart-bottom">
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
                    <NavLink to={token ? '/order' : '/cart'}>
                        <button disabled={getTotalCartAmt() === 0} className={getTotalCartAmt() === 0 ? 'btn--disabled' : ''}
                        >Proceed to checkout</button>
                    </NavLink>
                </div>
                <div className="cart-promo-code">
                    <div>
                        <p>If you have promo code please enter here</p>
                        <div className="cart-promo-code-input">
                            <input type="text" name="promoCode" id="promoCode" placeholder='Enter promo code' />
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart