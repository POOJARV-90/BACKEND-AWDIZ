import React, { useContext, useEffect } from 'react'
import { Authcontext } from '../Context/Authcontext'
import { useNavigate } from 'react-router-dom'

const SellerProtected = ({children}) => {
    const {state} = useContext(Authcontext)
    const router = useNavigate()

    useEffect(()=>{
        if(state?.user?.role !="Seller"){
            router("/")
        }
    },[state])
  return state?.user?.role =="Seller"? children:null;
}

export default SellerProtected