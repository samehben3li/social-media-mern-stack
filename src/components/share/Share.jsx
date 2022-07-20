import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import "./share.css"

export default function Share(){

    const { user } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return(
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="profileImg" src={user.image ? PF+user.image : "/assets/default-avatar.jpg" } alt="" />
                    <input placeholder={"What's in your mind "+user.username+" ?" }className="shareInput" />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="options">
                        <div className="option">
                            <i class="fa-solid fa-photo-film optionIcon"></i>
                            <span className="optionText">Photo or video</span>
                        </div>
                    </div>
                    <button className="shareButton">Share</button>
                </div>
            </div>
        </div>
    );
}