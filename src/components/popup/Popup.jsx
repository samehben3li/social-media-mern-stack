import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import "./popup.css"
import { Logout } from "../../context/AuthActions"

const Popup = ({activePopup}) => {

    const { user, dispatch } = useContext(AuthContext)

    const handleLogout = () => {
        dispatch(Logout())
    }

  return (
    <div className={`popupConatainer ${activePopup && "active"}`}>
      <div className="popupWrapper">
        <Link to={`/profile/${user.username}`}className="popupItem">
            <i className="fa-solid fa-user popupItemIcon"></i>
            <span className="popupItemText">{ user.username }</span>
        </Link>
        <div className="popupItem">
            <i className="fa-solid fa-gear popupItemIcon"></i>
            <span className="popupItemText">settings</span>
        </div>
        <div className="popupItem">
            <i className="fa-solid fa-arrow-right-from-bracket popupItemIcon"></i>
            <span className="popupItemText" onClick={handleLogout}>deconnexion</span>
        </div>
      </div>
    </div>
  )
}

export default Popup
