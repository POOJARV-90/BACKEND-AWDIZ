import SellerProtected from '../Common/SellerProtected';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const AddProduct = () => {
    const [productData, setProductData] = useState({ name: "", price: "", image: "", category: "" })

    // const { state } = useContext(Authcontext)
    const router = useNavigate()

    const handleChange = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (productData.name && productData.price && productData.image && productData.category) {
            const token = JSON.parse(localStorage.getItem("token"))
            try {
                const response = await axios.post("http://localhost:8000/add-product", { token, productData });
                if (response?.data?.success) {
                    setProductData({ name: "", price: "", image: "", category: "" })
                    router('/seller-your-products')
                    toast.success(response.data.message)
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        } else {
            toast.error("All fields are mandtory.")
        }
    }
    // console.log(productData, "productData")

    return (
        <SellerProtected>
            <div id='body'>
            <form  onSubmit={handleSubmit}>
              <h4>Add product</h4> <br />
                <label>Name</label><br />
                <input type='text' onChange={handleChange} name='name' value={productData.name} /><br />
                <label>Price</label><br />
                <input type='number' onChange={handleChange} name='price' value={productData.price} /><br />
                <label>Image</label><br />
                <input type='text' onChange={handleChange} name='image' value={productData.image} /><br />
                <label>Category</label><br />
                <input type='text' onChange={handleChange} name='category' value={productData.category} /><br />
                <input id="button" type='submit' value='Add Product' /><br />
            </form>
            </div>
            
           
           
        </SellerProtected>
    )
}


export default AddProduct