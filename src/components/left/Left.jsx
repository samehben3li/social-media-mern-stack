import { Users } from "../../dummyData";
import Friend from "../friend/Friend";
import "./left.css"

export default function Left(){
    return(
        <div className="left">
            <div className="wrapper">
                <ul className="list">
                    <li className="item">
                        <i class="fa-solid fa-rss icon"></i>
                        <span className="text">feed</span>
                    </li>
                    <li className="item">
                        <i class="fa-solid fa-message icon"></i>
                        <span className="text">chat</span>
                    </li>
                    {/* <li className="item">
                        <div className="icon">V</div>
                        <span className="text">videos</span>
                    </li> */}
                    <li className="item">
                        <i class="fa-solid fa-people-group icon"></i>
                        <span className="text">groups</span>
                    </li>
                    <li className="item">
                        <i class="fa-solid fa-bookmark icon"></i>
                        <span className="text">bookmarks</span>
                    </li>
                    <li className="item">
                        <i class="fa-solid fa-circle-info icon"></i>
                        <span className="text">questions</span>
                    </li>
                    <li className="item">
                        <i class="fa-solid fa-cart-shopping icon"></i>
                        <span className="text">Shopping</span>
                    </li>
                    <li className="item">
                        <i class="fa-solid fa-calendar-check icon"></i>
                        <span className="text">events</span>
                    </li>
                    <li className="item">
                        <i class="fa-solid fa-graduation-cap icon"></i>
                        <span className="text">courses</span>
                    </li>
                </ul>
                <button className="button">Show More</button>
                <hr className="hr"/>
                <ul className="friendList">
                    { Users.map(u=>{
                        return <Friend key={u.id} user={u} />
                    }) }
                </ul>
            </div>
        </div>
    );
}