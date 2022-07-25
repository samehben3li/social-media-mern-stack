import { useContext,useState } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
import Popup from "../popup/Popup";
import Notifications from "../notifications/Notifications"
import "./topbar.css"

export default function Topbar(){

    const [activePopup, setActivePopup] = useState(false)
    const [activeNotification, setActiveNotification] = useState(false)
    const { user } =useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="logo">KnowerSocial</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <i className="fa-solid fa-magnifying-glass searchIcon"></i>
                    <input placeholder="Search" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="links">
                    <Link to="/" className="link">Home</Link>
                </div>
                <div className="icons">
                    <div className="iconeItem">
                        <i className="fa-solid fa-user-plus iconImg"></i>
                        <span className="iconBadge">1</span>
                    </div>
                    <div className="iconeItem">
                        <i className="fa-solid fa-message iconImg"></i>
                        <span className="iconBadge">1</span>
                    </div>
                    <div className="iconeItem" onClick={()=>setActiveNotification(!activeNotification)}>
                        <i className="fa-solid fa-bell iconImg"></i>
                        <span className="iconBadge">1</span>
                    </div>
                </div>
                <img src={user.image ? PF+user.image : "/assets/default-avatar.jpg" } alt="" className="imgProfile" onClick={()=>setActivePopup(!activePopup)} />
            </div>
            <Popup activePopup={activePopup} />
            <Notifications activeNotification={activeNotification} />
        </div>
    );
}