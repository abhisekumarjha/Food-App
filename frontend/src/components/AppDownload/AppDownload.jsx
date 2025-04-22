import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
    return (
        <div className='app-download' id='app-download'>
            <h2>Download the app now!</h2>
            <p>Experience seamless online ordering only on the Zomato app</p>
            <div className="app-download-platforms">
                <img src={assets.play_store} alt="app-play_store" />
                <img src={assets.app_store} alt="app-app_store" />
            </div>
        </div>
    )
}

export default AppDownload