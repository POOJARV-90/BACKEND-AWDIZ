import React, { useContext, useEffect } from 'react'
import { Authcontext } from '../Context/Authcontext'
import { useNavigate } from 'react-router-dom'

const AuthProtected = ({children}) => {
    const {state} = useContext(Authcontext)
    const router = useNavigate();

    useEffect(()=>{
        if(!state?.user?.name){
            router("/Login")
        }

    },[state])
  return state?.user?.name ? children:null;
}

export default AuthProtected