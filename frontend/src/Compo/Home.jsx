import React, { useContext } from 'react'
import { Authcontext } from './Context/Authcontext'

const Home = () => {
  const {state} = useContext(Authcontext)
  // console.log(state.user,"userdata here")
  return (
    <div>Home   :  USER NAME - {state?.user?.name}
    </div>
  )
}

export default Home