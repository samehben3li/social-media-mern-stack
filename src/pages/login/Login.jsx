import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from '@material-ui/core';
import "./login.css"

function Login() {

    const email = useRef()
    const password = useRef()
    const {user,isFetching,dispatch} = useContext(AuthContext)
    const handleClick = async (e) => {
        e.preventDefault()
        loginCall({email: email.current.value,password: password.current.value},dispatch)
    }
    
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">KnowerSocial</h3>
                    <span className="loginDesc">Connect With friends and the world around you on KnowerSocial</span>
                </div>
                <div className="loginRight">
                    <form className="box" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" className="loginInput" ref={email} required />
                        <input placeholder="Password" type="password" className="loginInput" ref={password} required />
                        <button className="loginBtn" type="submit">{ isFetching ? <CircularProgress color="primary" disabled={isFetching} /> :"Log In"}</button>
                        <span className="forgot">Forgot Password ?</span>
                        <button className="loginRegisterBtn">Create a New Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
