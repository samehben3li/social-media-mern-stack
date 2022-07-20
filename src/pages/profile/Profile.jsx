import Topbar from "../../components/topbar/Topbar";
import Left from "../../components/left/Left";
import Feed from "../../components/feed/Feed";
import Right from "../../components/right/Right";
import "./profile.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user,setUser] = useState({})
  const username = useParams().username
  useEffect(()=>{
    const fetchUser = async () =>{
      const res = await axios.get(`/users?username=${username}`)
      setUser(res.data)
    }
    fetchUser()
  },[username])
  return (
    <>
        <Topbar />
        <div className="profile">
            <Left />
            <div className="profileRight">
                <div className="profileTop">
                  <div className="profileCover">
                    <img src={user.imgCover || "/assets/Default-cover.jpg" } alt="" className="coverImg" />
                    <img src={user.image || "/assets/default-avatar.jpg" } alt="" className="profileUserImg" />
                  </div>
                  <div className="info">
                    <h4 className="profileUsername">{ user.username }</h4>
                    <span className="profileDesc">{ user.desc }</span>
                  </div>
                </div>
                <div className="profileBottom">
                    <Feed username={username}/>
                    <Right user={user}/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile;
