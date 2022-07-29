import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import "./comment.css"
import axios from "axios"

const Comment = ({comment}) => {

  const [commentUser, setCommentUser] = useState(null)

  useEffect(() => {
    const getUserComment = async () => {
      try {
        const res = await axios.get("https://knowersocial.herokuapp.com/api/users/"+comment.userId)
        setCommentUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUserComment()
  }, [comment])

  return (
    <div className="singleComment">
        <Link to={`/`} style={{textDecoration: "none", color: "inherit"}}>
          <img src="/assets/default-avatar.jpg" alt="user img" className="commentImg" />
        </Link>
        <div className="commentInfo">
            <Link to={`/`} style={{textDecoration: "none", color: "inherit"}}>
              <span className="commentUsername">{commentUser?.username}</span>
            </Link>
            <p className="commentDesc">{comment.desc}</p>
        </div>
    </div>
  )
}

export default Comment