import { Users } from "../../dummyData";
import { useState,useEffect,useContext } from "react"
import axios from "axios"
import Friend from "../friend/Friend";
import "./left.css"
import { AuthContext } from "../../context/AuthContext";
import Sugs from "../sugs/Sugs";

export default function Left(){

    const [sugs, setSugs] = useState([])
    const { user } = useContext(AuthContext)

    const getSugs = async () => {
        try {
            const res = await axios.get("/users/sugs/"+user._id)
            setSugs(res.data.filter(u=>u._id!==user._id))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getSugs()
    }, [])

    return(
        <div className="left">
            <div className="wrapper">
                <ul className="list">
                    {/* <li className="item">
                        <i class="fa-solid fa-rss icon"></i>
                        <span className="text">feed</span>
                    </li>
                    <li className="item">
                        <i class="fa-solid fa-message icon"></i>
                        <span className="text">chat</span>
                    </li>
                    <li className="item">
                        <div className="icon">V</div>
                        <span className="text">videos</span>
                    </li> 
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
                    </li> */}
                    { sugs?.map((u)=>(<Sugs key={u._id} u={u} user={user} />)) }
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

//_id:"62d7363238cadffa1cab7909"