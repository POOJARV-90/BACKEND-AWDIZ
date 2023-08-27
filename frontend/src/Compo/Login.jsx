import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Authcontext } from './Context/Authcontext'

const Login = () => {
  const router = useNavigate();
  const {state , dispatch} = useContext(Authcontext)

  const [ userdata , setUserdata] = useState({email:"",password:""})
  const handleChange = (event) => {
    setUserdata({...userdata,[event.target.name]:event.target.value})
  }

  useEffect(() => {
    if (state?.user?.name) {
        router('/')
    }
}, [state])
  const handleSubmit = async (event) => {
    event.preventDefault();
    if ( userdata.email && userdata.password) {
      
            const response = await axios.post("http://localhost:8000/login", { userdata });
            if (response.data.success) {
            dispatch({
              type: 'LOGIN',
              payload: response.data.user
          })
          localStorage.setItem("token", JSON.stringify(response.data.token))
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
    <div id="body">

      <form onSubmit={handleSubmit} >
        

        <label >EMAIL</label> <br />
        <input  onChange={handleChange} value={userdata.email}  type="email"  name='email'/> <br />

       

        <label >PASSWPORD</label> <br />
        <input  onChange={handleChange} value={userdata.password} type="password" name='password' /> <br />

       

        <input id='button' type="submit" value="LOGIN" /> <br />

        <p>Don't an have account ? <b onClick={()=>router("/Register")}> Click here</b> </p>


      </form>
     

    </div>
  )
}

export default Login