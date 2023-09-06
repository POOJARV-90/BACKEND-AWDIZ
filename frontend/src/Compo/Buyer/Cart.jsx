import React, { useContext, useEffect, useState } from 'react'
import { Authcontext } from '../Context/Authcontext';
import api from '../Api.config';
import '../Style/Cart.css'
import { toast } from 'react-hot-toast';

const Cart = () => {
    const [cartpro, setCartpro] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);
    const { state } = useContext(Authcontext)

    useEffect(() => {
        async function getCartProduct() {
            try {
                const response = await api.post('/your-cart-product', { userId: state?.user?._id })
                if (response.data.success) {
                    setCartpro(response.data.cartProducts)
                }
            } catch (error) {
                console.log(error, "error in cart")
            }
        }
        if (state?.user?._id) {
            getCartProduct()
        }
    }, [state])

    useEffect(() => {
        if (cartpro.length) {
            var totalPrice = 0;
            for (var i = 0; i < cartpro.length; i++) {
                totalPrice += cartpro[i].price
            }
            setFinalPrice(totalPrice)
        }
    }, [cartpro])

    // const handleBuy = () => {
    //     // Clear the cart
    //     setCartpro([]);
    //     setFinalPrice(0)
    //     // Show the alert
    //     toast.success("Your products will be delivered soon!");
    // };


    const handleBuy = async() =>{
        const token = JSON.parse(localStorage.getItem("token"))

        if(token){
            try {
                const response = await api.post("/remove-all-cart-products'",{token})
                if(response.data.success){
                    toast.success("Your products will be delivered soon!")
                    setCartpro([])
                }else{
                    toast.error(response.data.message)
                }
                
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    }
    return (
        <>
            <h1 id='head-1' style={{ textAlign: 'center', color: "#010510" }}>Cart</h1>
            <div id='body-1' style={{ display: 'flex' }}>
                {cartpro?.length ? (
                    <>
                        <div id='container-1'>
                            {cartpro.map((pro) => (
                                <div id='product-1' key={pro._id}>
                                    <img
                                        id='img-1'
                                        src={pro.image}
                                        alt=""
                                    />
                                    <p id='detail-1'>{pro.name} </p>
                                    <h3 style={{ marginLeft: "20px" }}> </h3>
                                    <span>{pro.price}</span>
                                    <p id='category-1'> <b>{pro.category}</b></p>
                                </div>
                            ))}
                        </div>

                        <div id='total-1'>
                            <h1>Total </h1>
                            <p> <span>Total MRP :</span>  <span>{finalPrice}</span> ₹ </p>
                            <p> <span> Discount (50%) : </span>   <span> {(finalPrice * 0.5).toFixed(2)} ₹ </span> </p>
                            <button onClick={handleBuy} >Buy Products</button>
                        </div>
                    </>
                ) : (
                    <p>ADD PRODUCT TO CART</p>
                )}
            </div>
        </>
    )
}

export default Cart;
