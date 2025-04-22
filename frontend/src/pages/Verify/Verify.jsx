import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from "react-router";
import { StoreContext } from '../../contextAPI/store';
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const { url } = useContext(StoreContext);

    const navigate = useNavigate();

    const verifyPayment = async function () {
        const responese = await axios.post(`${url}/api/v1/order/verify`, { success, orderId });

        if (responese.data.success) {
            navigate('/myorder')
        } else {
            navigate('/')
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [])


    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    )
}

export default Verify