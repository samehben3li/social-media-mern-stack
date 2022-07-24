import axios from "axios"
import { useState,useEffect, useContext } from "react"
import { useHistory, useParams } from "react-router-dom"
import Comment from "../../components/comment/Comment"
import Left from "../../components/left/Left"
import Post from "../../components/post/Post"
import Right from "../../components/right/Right"
import Topbar from "../../components/topbar/Topbar"
import { AuthContext } from "../../context/AuthContext"
import "./single.css"

const Single = () => {

    const [post,setPost] = useState(null)
    const [desc, setDesc] = useState("")
    const {id} = useParams()
    const history = useHistory()
    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const handleComment = async e => {
        e.preventDefault()
        if (!user){
            history.push("/")
        }
        try {
            const res = await axios.put("/posts/comment/"+post._id,{
                userId: user._id,
                desc
            })
            setPost({...post,comments: res.data.comments})
            setDesc("")
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get("/posts/"+id)
                setPost(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getPost()
    }, [id])

  return (
    <>
        <Topbar/>
        <div className="container">
            <Left />
            { post 
            ? <div className="single">
                <Post post={post} />
                <div className="comments" onSubmit={handleComment}>
                    <form className="addComment">
                        <img src={user.image ? PF + user.image : "/assets/default-avatar.jpg" } alt="user img" className="addCommentImg" />
                        <input type="text" placeholder="add comment here !" className="addCommentInput" value={desc} onChange={e=>setDesc(e.target.value)} />
                        <button type="submit" className="addCommentBtn">Comment</button>
                    </form>
                    <div className="commentWrapper">
                        { post?.comments.map((c,i)=>(
                            <Comment key={i} comment={c} />
                        ))
                        }
                    </div>
                </div>
            </div>
            : <div className="undefined">
                Post Not Found
            </div>
            }
            <Right />
        </div>
    </>
  )
}

export default Single