import axios from "axios";
import { useContext } from "react";
import { Follow } from "../../context/AuthActions";
import { AuthContext } from "../../context/AuthContext";
import { Users } from "../../dummyData"
import Online from "../online/Online";
import "./right.css"

export default function Right({ user }) {

    const {user:currentUser,dispatch} = useContext(AuthContext)

    const HomeRight = () => {
        return(
            <>
                <div className="birthContainer">
                    <img className="birthImg" src="/assets/gift.png" alt="" />
                    <span className="birthText"><b>sameh benali</b> and <b>3 other friends</b> have a birthday today</span>
                </div>
                <h4 className="rightTitle">Online Friends</h4>
                <ul className="rightFriendList">
                    { Users.map(u=>{
                        return <Online key={u.id} user={u} />
                    }) }
                </ul>
            </>
        )
    }

    const ProfileRight = () => {

        const handleFollow = async () => {
            if (currentUser.followings.includes(user._id)){
                try {
                    await axios.put("/users/"+user._id+"/unfollow",{userId: currentUser._id})
                    currentUser.followings = currentUser.followings.filter(id=>id!==user._id)
                    dispatch(Follow(currentUser))
                } catch (err) {
                    console.log(err)
                }
            }else{
                try {
                    await axios.put("/users/"+user._id+"/follow",{userId: currentUser._id})
                    currentUser.followings = [...currentUser.followings,user._id]
                    dispatch(Follow(currentUser))
                } catch (err) {
                    console.log(err)
                }
            }
        }

        return(
            <>
                { user._id !== currentUser._id &&
                <button className="btnFollow" onClick={handleFollow}>{ currentUser.followings.includes(user._id) ? "Unfollow -" : "Follow +"  }</button>
                }
                <h4 className="rightTitle">User information</h4>
                <div className="rightInfo">
                    <div className="infoItem">
                        <span className="infoKey">City : </span>
                        <span className="infoValue">{ user.city }</span>
                    </div>
                    <div className="infoItem">
                        <span className="infoKey">From  : </span>
                        <span className="infoValue">{ user.from }</span>
                    </div>
                    <div className="infoItem">
                        <span className="infoKey">Relationship : </span>
                        <span className="infoValue">{ user.relationship===1 ? "single" : user.relationship===3 ? "Married" : "-" }</span>
                    </div>
                </div>
                <h4 className="rightTitle">User friends</h4>
                <div className="followings">
                    <div className="following">
                        <img src="/assets/person/1.jpeg" alt="" className="followingImg" />
                        <span className="followingName">Sameh Benali</span>
                    </div>
                    <div className="following">
                        <img src="/assets/person/2.jpeg" alt="" className="followingImg" />
                        <span className="followingName">Sameh Benali</span>
                    </div>
                    <div className="following">
                        <img src="/assets/person/3.jpeg" alt="" className="followingImg" />
                        <span className="followingName">Sameh Benali</span>
                    </div>
                    <div className="following">
                        <img src="/assets/person/4.jpeg" alt="" className="followingImg" />
                        <span className="followingName">Sameh Benali</span>
                    </div>
                    <div className="following">
                        <img src="/assets/person/5.jpeg" alt="" className="followingImg" />
                        <span className="followingName">Sameh Benali</span>
                    </div>
                    <div className="following">
                        <img src="/assets/person/6.jpeg" alt="" className="followingImg" />
                        <span className="followingName">Sameh Benali</span>
                    </div>
                </div>
            </>
        )
    }
    //2:03:00

    return (
        <div className="right">
            <div className="rightWrapper">
                { user ? <ProfileRight />: <HomeRight /> }
            </div>
        </div>
    );
}