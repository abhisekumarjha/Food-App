import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar-options">
                <NavLink to={'/add'}
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? "#fff0ed" : "initial",
                        borderColor: isActive ? "tomato" : "initial"
                    })}
                    className="sidebar-option">
                    <img src={assets.add_icon} alt="ItemImg" />
                    <p>Add Items</p>
                </NavLink>
                <NavLink to={'/list'}
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? "#fff0ed" : "initial",
                        borderColor: isActive ? "tomato" : "initial"
                    })}
                    className="sidebar-option">
                    <img src={assets.order_icon} alt="orderIcon" />
                    <p>List Items</p>
                </NavLink>
                <NavLink to={'/orders'}
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? "#fff0ed" : "initial",
                        borderColor: isActive ? "tomato" : "initial"
                    })}
                    className="sidebar-option">
                    <img src={assets.order_icon} alt="ItemImg" />
                    <p>Orders</p>
                </NavLink >
            </div>
        </div>
    )
}

export default Sidebar