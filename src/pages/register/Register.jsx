import { useRef } from "react";
import axios from "axios"
import "./register.css"
import { useHistory } from 'react-router';
import { Link } from "react-router-dom"



function Register() {

    const email = useRef()
    const password = useRef()
    const username = useRef()
    const passwordAgain = useRef()
    const history = useHistory()

    const handleClick = async (e)=>{
        e.preventDefault()
        if(passwordAgain.current.value!==password.current.value){
            passwordAgain.current.setCustomValidity("password dont match")
        }else{
            const user = {
                username: username.current.value,
                password: password.current.value,
                email: email.current.value
            }
            try{
                const res = await axios.post("/auth/register",user)
                history.push("/login")
            }catch(err){
                console.log(err);
            }
        }
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">KnowerSocial</h3>
                    <span className="loginDesc">Connect With friends and the world around you on KnowerSocial</span>
                </div>
                <div className="loginRight">
                    <form className="box" onSubmit={ handleClick }>
                        <input placeholder="Username" className="loginInput" ref={username} />
                        <input placeholder="Email" className="loginInput" ref={email} />
                        <input type="password" placeholder="password" className="loginInput" ref={password} />
                        <input type="password" placeholder="Password Again" className="loginInput" ref={passwordAgain} />
                        <button className="loginBtn" type="submit">Sign Up</button>
                        <button className="loginRegisterBtn">
                            <Link to="/login" style={{textDecoration: "none",color: "inherit"}}>Log into Account</Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
        );
}

export default Register;
