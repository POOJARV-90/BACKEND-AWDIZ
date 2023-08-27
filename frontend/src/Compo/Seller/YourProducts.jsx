import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../Style/Yourproduct.css'

const YourProducts = () => {
    const [allProducts, setAllProducts] = useState();
    
    useEffect(() => {
        async function getProducts() {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.post("http://localhost:8000/get-your-product", { token })
          
            if (response.data.success) {
                setAllProducts(response.data.Product)
                // console.log(response.data,"productdata");
            }
        }
        getProducts();
    }, [])
    // console.log(allProducts,"allproducs")
    return (
        <div id='main'>
            <h2>Your Products</h2>

            {allProducts?.length ? <div> {allProducts.map((product) => (
                <div key={product._id}>
                    <div id='img-div'> <img src={product.image} /></div>
                   
                    <p> {product.name} </p>
                    <p>Price : {product.price} ₹</p>
                </div>
            ))}
            </div> : <div>No Products found.</div>}
        </div>
    )
}

export default YourProducts