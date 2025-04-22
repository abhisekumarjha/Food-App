import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../contextAPI/store';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = function (e) {
        const name = e.target.name;
        const value = e.target.value;
        setData(prevData => ({ ...prevData, [name]: value }))
    };

    // login
    const onLogin = async function (event) {
        event.preventDefault();
        let newurl = url;
        if (currState === "Login") {
            newurl += `/api/v1/user/login`
        } else {
            newurl += `/api/v1/user/register`
        }
        const response = await axios.post(newurl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        } else {
            alert(response.data.message);
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="closeBtn" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : < input
                        type="text" name="name"
                        onChange={onChangeHandler}
                        value={data.name}
                        id="name" placeholder='Name' required autoComplete='on' />}
                    <input type="email" name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        id="email" placeholder='Email' required autoComplete='on' autoFocus />
                    <input type="password" name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        id="password" placeholder='Password' minLength={8} maxLength={8} required />
                </div>
                <button type="submit" >{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="condition" id="condition" required />
                    <label htmlFor='condition'>By continuing, I accept the Terms & Conditions & Privacy Policy.</label>
                </div>
                {currState === "Login" ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p> : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup