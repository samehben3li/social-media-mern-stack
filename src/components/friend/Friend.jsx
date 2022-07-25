import axios from "axios"
import { useEffect,useState } from "react"
import { Link } from "react-router-dom"
import "./friend.css"

function Friend({ friendId,position }) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [friend, setFriend] = useState({})

  const getFriend = async () => {
    try {
      const res = await axios.get(`/users/${friendId}`)
      setFriend(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getFriend()
  }, [])

  return (
    <>
      { position === "left"
      ?<li className="friend">
          <Link to={`/profile/${friend.username}`} className="friendLink">
            <img src={ friend?.img ? PF+friend?.img : "/assets/default-avatar.jpg" } alt="friend img" className="friendImg" />
            <span className="friendName">{ friend?.username }</span>
          </Link>
      </li>
      : <Link to={`/profile/${friend.username}`} className="following">
          <img src={ friend?.img ? PF+friend?.img : "/assets/default-avatar.jpg" } alt="" className="followingImg" />
          <span className="followingName">{friend?.username}</span>
        </Link>
      }
    </>
  )
}

export default Friend;
