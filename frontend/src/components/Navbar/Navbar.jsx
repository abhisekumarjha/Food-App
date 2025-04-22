import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router'
import { StoreContext } from '../../contextAPI/store'

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState('home');

    const { getTotalCartAmt, token, setToken } = useContext(StoreContext);

    const navigate = useNavigate()

    const logout = function () {
        localStorage.removeItem('token');
        setToken("");
        navigate('/');
    }

    return (
        <div className='navbar'>
            <Link to={"/"}>
                <img src={assets.logo} alt="logo" className="logo" />
            </Link>
            <ul className="navbar-menu">
                <Link to={"/"}>
                    <li onClick={() => setMenu("home")} className={menu === 'home' ? "active" : ""}>home</li>
                </Link>
                <a href="#explore-menu"><li onClick={() => setMenu("menu")} className={menu === 'menu' ? "active" : ""}>menu</li></a>
                <a href="#app-download"><li onClick={() => setMenu("app")} className={menu === 'app' ? "active" : ""}>get the app</li></a>
                <a href="#footer"><li onClick={() => setMenu("contact-us")} className={menu === 'contact-us' ? "active" : ""}>contact us</li></a>
            </ul>
            <div className="navbar-right">
                <div className="navbar-searchbar">
                    <input type="text" name="search" id="search" placeholder='Search' autoFocus='true' />
                    <img src={assets.search_icon} alt="search" />
                </div>
                <div className="navbar-search-icon">
                    <Link to={'/cart'}><img src={assets.basket_icon} alt="basketIcon" /></Link>
                    <div className={getTotalCartAmt() === 0 ? "" : "dot"}></div>
                </div>
                {!token
                    ?
                    <button type="button"
                        onClick={() => setShowLogin(true)}
                    >Sign In</button>
                    :
                    <div className='navbar-profile'>
                        <img className='profile-img' src={assets.profile_image} alt="profileImg" />
                        <ul className='nav-profile-dropdown'>
                            <li onClick={() => navigate('/myorder')}>
                                <img src={assets.bag_icon} alt="cartIcon" />
                                <p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="logoutIcon" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar