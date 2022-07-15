import "./online.css"

function Online({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <li className="rightFriend">
            <div className="rightProfileImgContainer">
                <img src={ PF+user.profilePicture } alt="" className="rightProfileImg" />
                <span className="rightOnline"></span>
            </div>
            <span className="rightUsername">{ user.username }</span>
        </li>
    )
}

export default Online;
