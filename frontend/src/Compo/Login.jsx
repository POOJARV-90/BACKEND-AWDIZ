import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const router = useNavigate();

  const [ userdata , setUserdata] = useState({name:"",email:"",password:"",confirmpassword:"" , role:"Buyer"})
  const handleChange = (event) => {
    setUserdata({...userdata,[event.target.name]:event.target.value})
  }

  

  // console.log(userdata,"all data here");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if ( userdata.email && userdata.password) {
      
            const response = await axios.post("http://localhost:8000/login", { userdata });
            if (response.data.success) {
                setUserdata({ email: "", password: "" })
                router('/')
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }

       
    } else {
        toast.error("All fields are mandtory.")
    }
}
  return (
    <div>

      <form onSubmit={handleSubmit} >
        

        <label >EMAIL</label> <br />
        <input  onChange={handleChange} value={userdata.email}  type="email"  name='email'/> <br />

       

        <label >PASSWPORD</label> <br />
        <input  onChange={handleChange} value={userdata.password} type="password" name='password' /> <br />

       

        <input type="submit" value="LOGIN" /> <br />

        


      </form>
      <button>Don't an have account ? <b onClick={()=>router("/Register")}> Click here</b> </button>

    </div>
  )
}

export default Login