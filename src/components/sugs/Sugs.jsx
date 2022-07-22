import axios from "axios"
import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import "./sugs.css"

const Sugs = ({u,user}) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [isFollow, setIsFollow] = useState(false)

    const handleFollow = async()=>{
        if (isFollow){
            try {
                await axios.put("/users/"+u._id+"/unfollow",{userId: user._id})
            } catch (err) {
                console.log(err)
            }
        }else{
            try {
                await axios.put("/users/"+u._id+"/follow",{userId: user._id})
            } catch (err) {
                console.log(err)
            }
        }
        getIsFollow()
    }

    const getIsFollow = async () => {
        try {
            const res = await axios.get("/users/"+user._id+"/isfollow/"+u._id)
            setIsFollow(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getIsFollow()
    },[user,u])

  return (
    <li className="item" >
        <Link to={`/profile/${u.username}`} style={{textDecoration: "none", color: "inherit"}} className="itemInfo">
            <img src={ u.image ? PF + u.image : "/assets/default-avatar.jpg" } alt="" className="itemImg" />
            <span className="itemText">{u.username}</span>
        </Link>
        <button className="itemBtn" onClick={handleFollow}>{ isFollow ? "Unfollow -" : "Follow +"}</button>
    </li>
  )
}

export default Sugs