import "./notification.css"
import { Link } from "react-router-dom"

const Notification = () => {
  return (
    <Link className="notificationContaine">
        <img src="/assets/default-avatar.jpg" alt="user img" className="nUserImg" />
        <p className="notificationDesc"><strong>sameh benali</strong> like and 3 poeple your post</p>
        <span>...</span>
    </Link>
  )
}

export default Notification