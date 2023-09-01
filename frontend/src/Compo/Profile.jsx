import React, { useEffect, useState } from 'react'
import AuthProtected from '../Compo/Common/AuthProtected'
import { useContext } from 'react';
import { Authcontext } from './Context/Authcontext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import '../Compo/Style/Profile.css'

const Profile = () => {
    const [number, setNumber] = useState();
    const [otp, setOtp] = useState();
    const [isNumberVerified, setIsNumberVerified] = useState(true);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const { state } = useContext(Authcontext)

const sendOtp = async() =>{
    const response = await axios.post('http://localhost:8000/send-otp', { userId: state?.user?._id });
    if(response.data.success){
        setIsOtpSent(true);
        toast.success("otp hasbeen sent to your number")
    }

}

const verifyOtp = async (event) => {
    event.preventDefault();
    const response = await axios.post('http://localhost:8000/verify-otp', { userId: state?.user?._id, otp });
    if (response.data.success) {
        setIsOtpSent(false);
        setIsNumberVerified(response.data.isNumberVerified)
        toast.success("Otp is Verified. :)")
    }

}


useEffect(() => {
    async function getNumber() {
        // alert("called fuction")
        try {
            const response = await axios.post("http://localhost:8000/get-number", { userId: state?.user?._id })
            if (response.data.success) {
                console.log(response.data, "response.data")
                setNumber(response.data.number)
                setIsNumberVerified(response.data.isNumberVerified)
            }
        } catch (error) {
            console.log(error)
        }
    }
    if (state?.user?._id) {
        getNumber()
    }
}, [state])
  return (
 <AuthProtected>
    <div id='body-pro'>
        <h2 id='head'> Hello  {state?.user?.name} !</h2>
    <h2>Complete Your phone verification</h2>
    <h3>Contact-Number :+91-{number}</h3>
    {isNumberVerified ? <h2>Your has been verified Successfully</h2> : <button onClick={sendOtp}>Verify your number</button>}
    {isOtpSent && <div>
        <form action="">
        <input onChange={(event)=>setOtp(event.target.value)} placeholder='Enter Otp here'/>
        <button onClick={verifyOtp}>Submit</button>
        </form>
       
        </div>}
    </div>
    



 </AuthProtected>
  )
}

export default Profile