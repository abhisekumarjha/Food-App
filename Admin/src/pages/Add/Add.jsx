import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ url }) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const onChangeHandler = function (e) {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    };

    const onSubmitHandler = async function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", data.price)
        formData.append("category", data.category)
        formData.append("image", image)

        const response = await axios.post(`${url}/api/v1/food/add`, formData);

        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad",
            });
            setImage(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
            console.error("Getting error at product add.");
        };
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="Image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="ImageUpload" />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file" name="Image" id="Image" required style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text" name="name" id="product-name" placeholder='Type here' required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description" id="product-desc" rows={6} placeholder='Product description' required></textarea>
                </div>
                <div className="add-product-category-price">
                    <div className="add-product-category flex-col">
                        <p>Product Category</p>
                        <select
                            onChange={onChangeHandler}
                            name="category" id="category">
                            <option value="Salad">Salad</option>
                            <option value="Rools">Rools</option>
                            <option value="Desrts">Desrts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-product-price flex-col">
                        <p>Product Price (₹)</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number" name='price' id='price' placeholder='₹ 200' />
                    </div>
                </div>
                <button type="submit" className='add-product-btn'>Add Product</button>
            </form>
        </div>
    )
}

export default Add