import Notification from "../notification/Notification"
import "./notifications.css"

const Notifications = ({activeNotification}) => {
  return (
    <div className={`notificationsContainer ${activeNotification ? "active" : ""}`}>
      <h3 className="notificationsTitle">Notifications</h3>
      <div className="notificationsWrapper">
        <button className="notificationsBtnVue">mark all as read</button>
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </div>
    </div>
  )
}

export default Notifications