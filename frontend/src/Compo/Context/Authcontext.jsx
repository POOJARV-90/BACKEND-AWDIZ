import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const Authcontext = createContext();

const initialState = { user: null };

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        default:
            return state
    }
}

// Its a higher order function hof 
const HandleAuthContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        async function getCurrentUserData() {
            var token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.post("http://localhost:8000/get-current-user", { token });
            if (response.data.success) {
                dispatch({
                    type: "LOGIN",
                    payload: response.data.user
                })
            } else {
                dispatch({
                    type: "LOGOUT"
                });
            }
        }
        getCurrentUserData();
    }, [])

    return (
        <Authcontext.Provider value={{ state, dispatch }}>
            {children}
        </Authcontext.Provider>
    )

}

export default HandleAuthContext;