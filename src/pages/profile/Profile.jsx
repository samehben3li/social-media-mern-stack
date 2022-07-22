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
  const [userName, setUserName] = useState("")
  const [desc, setDesc] = useState("")
  const [image, setImage] = useState(null)
  const [imgCover, setImgCover] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const username = useParams().username

  useEffect(()=>{
    const fetchUser = async () =>{
      const res = await axios.get(`/users?username=${username}`)
      setUser(res.data)
      setUserName(res.data.username)
      setDesc(res.data.desc)
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
                  { editMode  
                  ?<div className="profileCover">
                      <label htmlFor="imgCover">
                        <i className="fa-solid fa-wrench imgCoverIcon"></i>
                        <img src={ imgCover ? URL.createObjectURL(imgCover) :user.imgCover ? PF + user.imgCover :"/assets/Default-cover.jpg" } alt="" className="coverImg" />
                      </label>
                      <input type="file" onChange={e=>setImgCover(e.target.files[0])} style={{display: "none"}} id="imgCover" />
                      <label htmlFor="profilePic">
                        <i className="fa-solid fa-wrench profilePicIcon"></i>
                        <img src={ image ? URL.createObjectURL(image) : user.image ? PF + user.image : "/assets/default-avatar.jpg" } alt="" className="profileUserImg" />
                      </label>
                      <input type="file" onChange={e=>setImage(e.target.files[0])} style={{display: "none"}} id="profilePic" />
                  </div>
                  :<div className="profileCover">
                    <img src={user.imgCover ? PF + user.imgCover : "/assets/Default-cover.jpg" } alt="" className="coverImg" />
                    <img src={user.image ? PF + user.image : "/assets/default-avatar.jpg" } alt="" className="profileUserImg" />
                  </div>
                  }
                  <div className="info">
                    { editMode 
                    ? <>
                      <input type="text" className="profileUsernameInput" value={ userName } onChange={e=>setUserName(e.target.value)} />
                      <textarea className="profileDescInput" placeholder="bio" value={desc} onChange={e=>setDesc(e.target.value)} ></textarea>
                    </>
                    : <>
                      <h4 className="profileUsername">{ user.username }</h4> 
                      <span className="profileDesc">{ user.desc }</span>
                    </> }
                  </div>
                </div>
                <div className="profileBottom">
                    <Feed username={username}/>
                    <Right user={user} setUser={setUser} editMode={editMode} setEditMode={setEditMode} imgCover={imgCover} image={image} userName={userName} desc={desc} />
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile;
