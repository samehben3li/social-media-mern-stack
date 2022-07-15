import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id
      : "61f29b3bbe33badfe926af97",
    username
      : "sameh",
    email
      : "samehbenali415@gmail.com",
    password
      : "$2b$13$EKyRbER.ziSv9a6u9COM0ufYPql/DCEyZPJxQTMcpDKESPkZYxZqK",
    image
      : "",
    imgCover
      : "",
    isAdmin
      : false,
    desc
      : "hey my friend",
    city
      : "",
    from
      : ""},
isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};