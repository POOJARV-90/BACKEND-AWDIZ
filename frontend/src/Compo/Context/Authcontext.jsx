import { createContext, useEffect, useReducer } from "react";

export const Authcontext = createContext();
const incialstate = { userdata: null, token: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        usedata: action.payload,
        token: action.token,
      };

    case "logout":
      return { usedata: null, token: null };

      break;

    default:
      return state;
  }
};

export const Authprovider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, incialstate);

  const login = (token, userdata) => {

    localStorage.setItem("Data", JSON.stringify(userdata));
    localStorage.setItem("Token", JSON.stringify(token));
    dispatch({
      type: "login",
      payload: userdata,
      token: token,
    });
  };

  const logout = () => {
    localStorage.removeItem("Data");
    localStorage.removeItem("Token");
    dispatch({
      type: "logout",
    });
  };

  useEffect(()=> {

      const DataUser = JSON.parse(localStorage.getItem("Data"))
      const Token = JSON.parse(localStorage.getItem("Token"));
      dispatch({
          type:"login",
          payload: DataUser,
          token : Token,
      })

  },[])

  return (
    <Authcontext.Provider value={{ state, login, logout }}>
      {children}
    </Authcontext.Provider>
  );
};
