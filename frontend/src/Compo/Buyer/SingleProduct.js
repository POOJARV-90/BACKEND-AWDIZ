import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Authcontext } from '../Context/Authcontext';
import api from '../Api.config';
import { toast } from 'react-hot-toast';
import "../Style/Singlepro.css"

const SingleProduct = () => {
    const [singlepro , setSinglepro] = useState({})
    const {id} = useParams();
    const {state} = useContext(Authcontext) 
    const router = useNavigate()

    useEffect(()=> {
        if(id){
            async function getSingleproduct(){
                try {
                    const responce = await api.post("/get-single-product-data",{productId: id})
                    if(responce.data.success){
                        setSinglepro(responce.data.product)    
                    }
                    
                } catch (error) {
                    console.log("oops something went wrong :( ");
                }
            }
            getSingleproduct()
        }
        
    },[id])

    async function addToCart(productId){
        try {
            const response = await api.post('/cart',{productId , userId:state?.user?._id});
            if (response.data.success) {
                toast.success("Product added successfully to cart.")
            }

        } catch (error) {
            toast.error("oops something went wrong :( / login before add to cart");
            router("/login")
        }
//onClick={() => addToCart(singlepro._id)}
    }
  return (
    <div id='the-pro-body' >
    <div>
        <img src={singlepro.image} />
    </div>    
    <div >

        <h2>    Product-id {singlepro.id} | {singlepro.name}</h2>
        <p> <b>Description:</b> {singlepro.category}</p>
        <h2>Price : {singlepro.price} ₹</h2>
        {/* <p> <b>Category</b> : {singleProduct.category} </p> */}
        <p></p>
        <button onClick={() => addToCart(singlepro._id)}> Add to bag </button>
    </div>


</div >
  )
}

export default SingleProduct