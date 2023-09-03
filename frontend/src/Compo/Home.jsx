import React, { useContext, useEffect, useState } from 'react'
import { Authcontext } from './Context/Authcontext'
// import axios from 'axios';
import api from './Api.config';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {state} = useContext(Authcontext)
  const [allProducts, setAllProducts] = useState();
  const router = useNavigate();
  useEffect(() => {
    async function getProducts() {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await api.get("/all-products", { token })
        // console.log(response.data,"line12")
        if (response.data.success) {
            setAllProducts(response.data.Product)
            // console.log(response.data.Product,"line15")
        }
    }
    getProducts();
}, [])
  
  // console.log(state.user,"userdata here")
  return (
    <div>
      <div>Wellcome:  {state?.user?.name} 
    </div>
    <div id='main'>
            <h2>  All products </h2>

            {allProducts?.length ? <div > {allProducts.map((product) => (
                <div onClick={() => router(`/single-products/${product._id}`)} key={product._id}>
                  <div id='img-div'> <img src={product.image} /></div>
                   
                    <p> {product.name}</p>
                    <p> {product.price} ₹</p>
                </div>
            ))}
            </div> : <div>No Products found!</div>}
        </div>
    </div>
    
  )
}

export default Home