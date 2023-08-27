import React, { useContext } from 'react'
import { Authcontext } from '../Context/Authcontext'
import { useNavigate } from 'react-router-dom'
import "../Style/Navbar.css"

const Navbar = () => {
    const {state , dispatch} = useContext(Authcontext)
    const router = useNavigate();
  return (
    <div id='Navbar'>
        <div>
            <span onClick={() => router("/")} >LOGO</span>
            {/* if user is not seller it will show ll this option to buyer only */}     
                {state?.user?.role != "Seller" && <h4>Mens</h4>}
                {state?.user?.role != "Seller" && <h4>Women</h4>}
                {state?.user?.role != "Seller" && <h4>Kids</h4>}
            {/* if user is seller it will show ll this option to seller only */}     

                {state?.user?.role == "Seller" && <h4 onClick={() => router("/add-product")}>Add Product</h4>}
                {state?.user?.role == "Seller" && <h4 onClick={() => router("/seller-your-products")}>Your Products</h4>}
        </div>
        <div>
        {state?.user?.name ? <>
                    {state?.user?.role == "Buyer" && <h4>Cart</h4>}
                    <h4>Profile</h4>
                    <h4 onClick={() => dispatch({ type: "LOGOUT" })}>Logout</h4>
                </> : <h4 onClick={() => router('/login')}>Login/Register</h4>}
        </div>

    </div>
  )
}

export default Navbar