import "./notification.css"
import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import axios from "axios"

const Notification = ({notification}) => {

  const [notifcationUser, setNotifcationUser] = useState({})
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const getNotificationUser = async () => {
      try {
        const res = await axios.get(`/users/${notification.userId}`)
        setNotifcationUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getNotificationUser()
  }, [notification])

  return (
    <Link to={`/posts/${notification.postId}`} className="notificationContaine">
        <img src={notifcationUser?.image ? PF+notifcationUser?.image :"/assets/default-avatar.jpg"} alt="user img" className="nUserImg" />
        <p className="notificationDesc"><strong>{notifcationUser?.username}</strong> {notification?.type} your post</p>
        <span>...</span>
    </Link>
  )
}

export default Notification