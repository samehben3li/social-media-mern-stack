import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Follow } from "../../context/AuthActions"
import "./sugs.css"

const Sugs = ({u,user}) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { dispatch } = useContext(AuthContext)

    const handleFollow = async()=>{
        if (user.followings.includes(u._id)){
            try {
                await axios.put("/users/"+u._id+"/unfollow",{userId: user._id})
                user.followings = user.followings.filter(id=>id!==u._id)
                dispatch(Follow(user))
            } catch (err) {
                console.log(err)
            }
        }else{
            try {
                await axios.put("/users/"+u._id+"/follow",{userId: user._id})
                user.followings = [...user.followings,u._id]
                dispatch(Follow(user))
            } catch (err) {
                console.log(err)
            }
        }
    }

  return (
    <li className="item" >
        <div className="itemInfo">
            <img src={ u.image ? PF + u.image : "/assets/default-avatar.jpg" } alt="" className="itemImg" />
            <span className="itemText">{u.username}</span>
        </div>
        <button className="itemBtn" onClick={handleFollow}>{ user.followings.includes(u._id) ? "Unfollow -" : "Follow +"}</button>
    </li>
  )
}

export default Sugs