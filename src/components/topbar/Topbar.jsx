import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link , useNavigate} from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext"
export default function Topbar() {

  const navigate = useNavigate();

  const logoutfunction  = ()=>{
    localStorage.clear();
    window.location.reload();
    navigate("/");
  }


  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo">Chat Fusion</span>
        </Link>
       
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{textDecoration:"none"}}>
            <span className="topbarLink">Homepage</span>
          </Link>
          {/* <span className="topbarLink">Timeline</span> */}
          <span className="logoutbutton" onClick={logoutfunction}>Log Out</span>
        </div>
        {/* <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div> */}
        <Link to={`/profile/${user.username}`}>
        <img src={user.profilePicture
        ? PF + user.profilePicture
        : PF + "person/contact.jpg"
        } 
        alt="" className="topbarImg"/>
        </Link>
        
      </div>
    </div>
  );
}
