import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className="header-contents">
                <h2>Order your <span><a href="#explore-menu">favourite</a></span> food here</h2>
                <p>For over a decade, we’ve enabled our customers to discover new tastes, delivered right to their doorstep</p>
                <a href="#explore-menu">
                    <button type="button">View Menu</button>
                </a>
            </div>
        </div>
    )
}

export default Header