import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ url }) => {

    const [list, setList] = useState([]);

    const fetchList = async function () {
        const response = await axios.get(`${url}api/v1/food/list`);

        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error at fetching data")
            console.error("Error at fetching data");
        }
    };

    const removeFood = async function (Food_id) {
        const response = await axios.post(`${url}/api/v1/food/remove`, {
            id: Food_id,
        })
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error("Something went wrong...")
        }
    }


    useEffect(() => {
        fetchList();
    }, [])


    return (
        <div className='list add flex-col'>
            <p>Our Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Sl No.</b>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className='list-table-format'>
                            <i><b>{index + 1}.</b></i>
                            <img src={`${url}/images/` + item.image} alt={item.name || "productImg"} />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>₹ {item.price}</p>
                            <p
                                onClick={() => removeFood(item)}
                                title='Remove' className='cursor'>x</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default List