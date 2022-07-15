import "./home.css"
import Topbar from "../../components/topbar/Topbar";
import Left from "../../components/left/Left";
import Feed from "../../components/feed/Feed";
import Right from "../../components/right/Right";

export default function Home(){
    return(
        <>
            <Topbar />
            <div className="container">
                <Left />
                <Feed />
                <Right />
            </div>
        </>
    );
}