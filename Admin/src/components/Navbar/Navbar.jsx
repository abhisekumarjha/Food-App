import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router'

const Navbar = () => {

    const userInfo = [{
        name: "Abhi Jha",
        image: assets.profile_image,
        designation: "Product Manager",
        useType: "Admin"
    }];
    return (
        <div className='navbar'>
            <Link to={'/add'}>
                <img src={assets.logo} alt="logo" className="logo" />
                <code>Admin</code>

            </Link>

            <div className='userInfo'>
                <img src={userInfo[0].image} alt="profileImage" className='profile-img' />

                {userInfo.map((info, index) => {
                    return (
                        <div key={index} className='userInfo-contents'>
                            <b>{info.name}</b>
                            <p>{info.designation}</p>
                            <p>{info.useType}</p>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Navbar