import Notification from "../notification/Notification"
import { useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from 'axios'
import { LoginSuccess } from "../../context/AuthActions"
import "./notifications.css"

const Notifications = ({activeNotification}) => {

  const { user,dispatch } = useContext(AuthContext)

  const getNotifications = async () => {
    try {
      const res = await axios.get(`/users/${user._id}`)
      dispatch(LoginSuccess(res.data))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (activeNotification){
      getNotifications()
    }
  }, [activeNotification])

  return (
    <div className={`notificationsContainer ${activeNotification ? "active" : ""}`}>
      <h3 className="notificationsTitle">Notifications</h3>
      <div className="notificationsWrapper">
        <button className="notificationsBtnVue">mark all as read</button>
        {
          user?.notifications.map((n,i)=>(
            <Notification key={i} notification={n} />
          ))
        }
      </div>
    </div>
  )
}

export default Notifications