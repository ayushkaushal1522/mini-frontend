import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import {useState , useEffect} from "react"
import axios from "axios"
import {useParams} from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser] = useState({});
  const username = useParams().username;
  useEffect(() => {
    const fetchUser = async()=>{
      const res = await axios.get(`https://blue-pilot-frcad.pwskills.app:8080/api/users?username=${username}`);
      setUser(res.data);
      // console.log(res.data);
    }
    fetchUser();
    
    
  },[username])


  return (
    <>
      <Topbar showlogout={false} showdeleteaccount={true}/>
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture ? PF + user.coverPicture : PF + "person/contact.jpg"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture ? PF + user.profilePicture : PF + "person/contact.jpg"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
             <Feed username={username} showdelete={true}/> 
             <Rightbar users={user}/>
          </div>
        </div>
      </div>
    </>
  );
}
