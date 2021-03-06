import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import { useContext, useEffect, useState } from "react";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"

export default function Feed({ username }){

    const [posts,setPosts] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(()=>{
        const fetchPosts = async ()=>{
            const res = username ? await axios.get(`https://knowersocial.herokuapp.com/api/posts/profile/${username}`): await axios.get("https://knowersocial.herokuapp.com/api/posts/timeline/"+user._id)
            setPosts(res.data)
        }
        fetchPosts()
    },[username,user._id])

    return(
        <div className="feed">
            <div className="feedWrapper">
                { (user.username === username || !username )&&  <Share /> }
                { posts.map((p)=>{
                    return <Post key={p._id} post={p}/>
                }) }
            </div>
        </div>
    );
}