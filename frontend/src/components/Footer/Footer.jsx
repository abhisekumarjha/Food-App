import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router'


const Footer = () => {
    const currYear = new Date().getFullYear();

    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <Link to={'/'}><img src={assets.logo} alt="logo" className='logo' /></Link>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel excepturi mollitia veniam temporibus, ex neque tempora optio nesciunt quas a, pariatur eligendi.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="socialIcon" />
                        <img src={assets.twitter_icon} alt="socialIcon" />
                        <img src={assets.linkedin_icon} alt="socialIcon" /></div>
                </div>
                <div className="footer-content-center">
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Get In Touch</h2>
                    <ul>
                        <a href="tel:+033 12345 67890">+033 12345 67890 </a>
                        <br />
                        <a href="mailto:example@app.com">example@app.com</a>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners
                2008-{currYear} © Food APP™ Ltd. All rights reserved.
            </p>
        </div>
    )
}

export default Footer