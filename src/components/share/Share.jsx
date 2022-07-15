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
                    <img className="profileImg" src={user.image ? PF+user.image : PF+"person/1.png"} alt="" />
                    <input placeholder={"What's in your mind "+user.username+" ?" }className="shareInput" />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="options">
                        <div className="option">
                            <span className="optionIcon">PV</span>
                            <span className="optionText">Photo or video</span>
                        </div>
                        <div className="option">
                            <span  className="optionIcon">L</span>
                            <span className="optionText">Tag</span>
                        </div>
                        <div className="option">
                            <span  className="optionIcon">R</span>
                            <span className="optionText">Location</span>
                        </div>
                        <div className="option">
                            <span className="optionIcon">E</span>
                            <span className="optionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton">Share</button>
                </div>
            </div>
        </div>
    );
}