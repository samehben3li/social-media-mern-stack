import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import "./post.css"
import { AuthContext } from "../../context/AuthContext"

export default function Post({post}){

    const [like,setLike]=useState(0)
    const [isLike,setIsLike]=useState(false)
    const [user,setUser] = useState({})
    const {user:currentUser } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const handleLike = async () => {
        try{
            await axios.put("/posts/"+post._id+"/like",{userId: currentUser._id})
        }catch(err){
            console.log(err);
        }
        setLike(isLike ? like -1 : like+1)
        setIsLike(!isLike)
    }

    useEffect(()=>{
        setIsLike(post ? post?.likes.includes(currentUser._id) : false)
        setLike(post ? post?.likes.length : 0)
    },[currentUser._id,post])

    useEffect(()=>{
        const fetchUser = async ()=>{
            const res = await axios.get(`/users?userid=${post.userId}`)
            setUser(res.data)
        }
        fetchUser()
    },[post])

    return(
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="topLeft">
                        <Link to={`/profile/${user?.username}`} style={{textDecoration: "none", color: "inherit",display: "flex", alignItems:"center"}}>
                            <img src={ user?.image?PF+user.image: "/assets/default-avatar.jpg" } alt="" className="profileImg" />
                            <span className="userName">
                                { user.username }
                            </span>
                        </Link>    
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="topRight">
                        <span>...</span>
                    </div>
                </div>
                <Link to={`/posts/${post._id}`} style={{textDecoration: "none", color: "inherit"}}>
                    <div className="postCenter">
                        <span className="postText">{post?.desc}</span>
                        <img src={PF+post?.img} alt="" className="postImg" />
                    </div>
                </Link>
                <div className="postBottom">
                    <div className="bottomLeft">
                        { isLike 
                        ? <i className="fa-solid fa-heart likeIcon" onClick={handleLike}></i>
                        : <i className="fa-regular fa-heart likeIcon" onClick={handleLike}></i>
                        }
                        <span className="likeCount">
                            { isLike 
                            ? `you ${like > 1 ? `${like-1} and people like it` : " like it"}`
                            : `${like} people like it` }
                        </span>
                    </div>
                    <div className="bottomRight">
                        <span className="comment">{ post.comments.length } comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}