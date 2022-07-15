import { useContext } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
import "./topbar.css"

export default function Topbar(){

    const { user } =useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="logo">samehSocial</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <span className="searchIcon">s</span>
                    <input placeholder="Search" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="links">
                    <span className="link">Home</span>
                    <span className="link">TimeLine</span>
                </div>
                <div className="icons">
                    <div className="iconeItem">
                        <span>Per</span>
                        <span className="iconBadge">1</span>
                    </div>
                    <div className="iconeItem">
                        <span>chat</span>
                        <span className="iconBadge">1</span>
                    </div>
                    <div className="iconeItem">
                        <span>notifica</span>
                        <span className="iconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.image ? PF+user.image : PF+"person/1.png"} alt="" className="imgProfile" />
                </Link>
            </div>
        </div>
    );
}