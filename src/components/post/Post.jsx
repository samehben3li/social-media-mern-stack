import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import "./post.css"
import { AuthContext } from "../../context/AuthContext"

export default function Post({post}){

    const [like,setLike]=useState(post.likes.length)
    const [isLike,setIsLike]=useState(false)
    const [user,setUser] = useState({})
    const {user:currentUser } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const likeHandler = async () => {
        try{
            await axios.put("/posts/"+post._id+"/like",{userId: currentUser._id})
        }catch(err){
            console.log(err);
        }
        setLike(isLike ? like -1 : like+1)
        setIsLike(!isLike)
    }

    useEffect(()=>{
        setIsLike(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])

    useEffect(()=>{
        const fetchUser = async ()=>{
            const res = await axios.get(`/users?userid=${post.userId}`)
            setUser(res.data)
        }
        fetchUser()
    },[post.userId])

    return(
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="topLeft">
                        <Link to={`profile/${user.username}`}>
                            <img src={ user.image?PF+user.image: "/assets/default-avatar.jpg" } alt="" className="profileImg" />
                        </Link>    
                        <span className="userName">
                            { user.username }
                        </span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="topRight">
                        <span>...</span>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={PF+post?.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="bottomLeft">
                        <img className="like" src="/assets/like.png" onClick={likeHandler} alt="" />
                        <img className="like" src="/assets/heart.png" onClick={likeHandler}  alt="" />
                        <span className="likeCount">{ like } people like it</span>
                    </div>
                    <div className="bottomRight">
                        <span className="comment">{ post.comment } comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}