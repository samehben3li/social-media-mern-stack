import axios from "axios";
import { useContext,useState,useEffect } from "react";
import { UpdateUserSuccess } from "../../context/AuthActions";
import { AuthContext } from "../../context/AuthContext";
import { Users } from "../../dummyData"
import Friend from "../friend/Friend";
import Online from "../online/Online";
import "./right.css"

export default function Right({ user,setUser,editMode,setEditMode,imgCover,image,userName,desc }) {

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

        const [isFollow, setIsFollow] = useState(false)
        const [city, setCity] = useState(user.city)
        const [from, setFrom] = useState(user.from)
        const [email, setEmail] = useState(user.email)
        const [password, setPassword] = useState("")
        const [friends, setFriends] = useState([])

        const getIsFollow = async () => {
            try {
                const res = await axios.get("https://knowersocial.herokuapp.com/api/users/"+currentUser._id+"/isfollow/"+user._id)
                setIsFollow(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        const handleFollow = async () => {
            if (isFollow){
                try {
                    await axios.put("https://knowersocial.herokuapp.com/api/users/"+user._id+"/unfollow",{userId: currentUser._id})
                } catch (err) {
                    console.log(err)
                }
            }else{
                try {
                    await axios.put("https://knowersocial.herokuapp.com/api/users/"+user._id+"/follow",{userId: currentUser._id})
                } catch (err) {
                    console.log(err)
                }
            }
            getIsFollow()
        }

        const handleUpdate = async ()=>{
            const updatedUser = {
                username: userName,
                desc,
                city,
                from,
                email,
                userId: user._id
            }
            if (password){
                updatedUser.password = password
            }
            if (imgCover){
                const data = new FormData()
                const filename = Date.now()+imgCover.name
                data.append("name",filename)
                data.append("file",imgCover)
                updatedUser.imgCover = filename
                try{
                    await axios.post("https://knowersocial.herokuapp.com/api/upload",data)
                }catch(err){
                    console.log(err)
                }
            }
            if (image){
                const data = new FormData()
                const filename = Date.now()+image.name
                data.append("name",filename)
                data.append("file",image)
                updatedUser.image = filename
                try{
                    await axios.post("https://knowersocial.herokuapp.com/api/upload",data)
                }catch(err){
                    console.log(err)
                }
            }
            try {
                const res = await axios.put("https://knowersocial.herokuapp.com/api/users/"+currentUser._id,updatedUser)
                dispatch(UpdateUserSuccess(res.data))
                setUser(res.data)
                setEditMode(false)
            } catch (err) {
                console.log(err)
            }
        }

        const getFriends = async () => {
            try {
                const res = await axios.get("https://knowersocial.herokuapp.com/api/users/friends/"+user?._id)
                setFriends(res.data.slice(0,6))
            } catch (err) {
                console.log(err)
            }
        }

        useEffect(() => {
            getIsFollow()
            if (user){
                getFriends()
            }
        }, [])

        return(
            <>
                { user._id !== currentUser._id 
                ? <button className="btnFollow" onClick={handleFollow}>{ isFollow ? "Unfollow -" : "Follow +"  }</button>
                : editMode
                ? <>
                    <button className="btnEdit" onClick={handleUpdate}>Save</button>
                    <button className="btnEditCancel" onClick={()=>setEditMode(false)}>Cancel</button>
                </>
                : <button className="btnEdit" onClick={()=>setEditMode(true)}>Setting</button>
                }
                <h4 className="rightTitle">User information</h4>
                <div className="rightInfo">
                    <div className="infoItem">
                        { editMode
                        && <>
                            <div className="infoItem">
                                <span className="infoKey">Email: </span>
                                <input type="email" className="infoValueInput" value={email} onChange={e=>setEmail(e.target.value)} />
                            </div>
                            <div className="infoItem">
                                <span className="infoKey">Password:</span>
                                <input type="password" className="infoValueInput" value={password} onChange={e=>setPassword(e.target.value)} />
                            </div>
                        </>
                        }
                        <span className="infoKey">City : </span>
                        { editMode 
                        ? <input type="text" className="infoValueInput" value={city} onChange={e=>setCity(e.target.value)} />
                        :<span className="infoValue">{ user.city }</span> }
                    </div>
                    <div className="infoItem">
                        <span className="infoKey">From  : </span>
                        { editMode 
                        ? <input type="text" className="infoValueInput" value={from} onChange={e=>setFrom(e.target.value)} />
                        :<span className="infoValue">{ user.from }</span> }
                    </div>
                    <div className="infoItem">
                        <span className="infoKey">Relationship : </span>
                        <span className="infoValue">{ user.relationship===1 ? "single" : user.relationship===3 ? "Married" : "-" }</span>
                    </div>
                </div>
                <h4 className="rightTitle">User friends</h4>
                <div className="followings">
                    { friends.map(friendId => (
                        <Friend key={friendId} friendId={friendId} position="right" />
                    ))
                    }
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