import { Users } from "../../dummyData";
import Friend from "../friend/Friend";
import "./left.css"

export default function Left(){
    return(
        <div className="left">
            <div className="wrapper">
                <ul className="list">
                    <li className="item">
                        <div className="icon">F</div>
                        <span className="text">feed</span>
                    </li>
                    <li className="item">
                        <div className="icon">C</div>
                        <span className="text">chat</span>
                    </li>
                    <li className="item">
                        <div className="icon">V</div>
                        <span className="text">videos</span>
                    </li>
                    <li className="item">
                        <div className="icon">G</div>
                        <span className="text">groups</span>
                    </li>
                    <li className="item">
                        <div className="icon">B</div>
                        <span className="text">bookmarks</span>
                    </li>
                    <li className="item">
                        <div className="icon">Q</div>
                        <span className="text">questions</span>
                    </li>
                    <li className="item">
                        <div className="icon">J</div>
                        <span className="text">jobs</span>
                    </li>
                    <li className="item">
                        <div className="icon">E</div>
                        <span className="text">events</span>
                    </li>
                    <li className="item">
                        <div className="icon">C</div>
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