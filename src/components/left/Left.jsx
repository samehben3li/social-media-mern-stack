import { useState,useEffect,useContext } from "react"
import axios from "axios"
import Friend from "../friend/Friend";
import "./left.css"
import { AuthContext } from "../../context/AuthContext";
import Sugs from "../sugs/Sugs";

export default function Left(){

    const [sugs, setSugs] = useState([])
    const { user } = useContext(AuthContext)
    const [friends, setFriends] = useState([])

    useEffect(() => {
        const getSugs = async () => {
            try {
                const res = await axios.get("https://knowersocial.herokuapp.com/api/users/sugs/"+user._id)
                setSugs(res.data.filter(u=>u._id!==user._id))
            } catch (err) {
                console.log(err)
            }
        }
    
        const getFriend = async() => {
            try {
                const res = await axios.get(`https://knowersocial.herokuapp.com/api/users/friends/${user?._id}`)
                setFriends(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getSugs()
        if (user){
            getFriend()
        }
    }, [user])

    return(
        <div className="left">
            <div className="wrapper">
                <ul className="list">
                    { sugs?.map((u)=>(<Sugs key={u._id} u={u} user={user} />)) }
                </ul>
                <button className="button">Show More</button>
                <hr className="hr"/>
                <ul className="friendList">
                    { friends.map(friendId=>{
                        return <Friend key={friendId} friendId={friendId} position="left" />
                    }) }
                </ul>
            </div>
        </div>
    );
}