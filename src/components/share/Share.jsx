import { useContext,useState } from "react";
import { AuthContext } from '../../context/AuthContext';
import axios from "axios"
import { useHistory } from "react-router-dom"
import "./share.css"

export default function Share(){

    const { user } = useContext(AuthContext)
    const [desc,setDesc] = useState("")
    const [img, setImg] = useState(null)
    const navigate = useHistory()
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const handleShare = async e =>{
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc
        }
        if (img) {
            const data = new FormData()
            const filename = Date.now() + img.name
            data.append("name",filename)
            data.append("file",img)
            newPost.img = filename
            try {
                await axios.post("https://knowersocial.herokuapp.com/api/upload",data)
            } catch (err) {
                console.log(err)
            }
        }
        try {
            await axios.post("https://knowersocial.herokuapp.com/api/posts",newPost)
            setDesc("")
            setImg(null)
            navigate.push("/")
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="profileImg" src={user.image ? PF+user.image : "/assets/default-avatar.jpg" } alt="" />
                    <input placeholder={"What's in your mind "+user.username+" ?" } className="shareInput" onChange={e=>setDesc(e.target.value)} />
                </div>
                <hr className="shareHr" />
                { img &&
                <div className="shareImgContainer">
                    <img src={URL.createObjectURL(img)} alt="" className="shareInputImg" />
                    <i className="fa-solid fa-circle-xmark cancelImg" onClick={()=>setImg(null)} ></i>
                </div>}
                <div className="shareBottom">
                    <div className="options">
                        <label htmlFor="img" className="option">
                            <i className="fa-solid fa-photo-film optionIcon"></i>
                            <span className="optionText">Photo or video</span>
                        </label>
                        <input type="file" id="img" style={{display:"none"}} onChange={e=>setImg(e.target.files[0])} />
                    </div>
                    <button className="shareButton" onClick={handleShare}>Share</button>
                </div>
            </div>
        </div>
    );
}