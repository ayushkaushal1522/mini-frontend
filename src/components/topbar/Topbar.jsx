import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link , useNavigate} from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext"
import axios from "axios";
export default function Topbar({showlogout , showdeleteaccount}) {

  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  const logoutfunction  = ()=>{
    localStorage.clear();
    window.location.reload();
    navigate("/");
  }

  const deleteaccountfunction = ()=>{

    try{
        axios.put("https://blue-pilot-frcad.pwskills.app:8080/api/users/"+user._id +"/delete" , {
        userId:user._id
      })
      localStorage.clear();
      // window.location.reload();
      navigate("/login");
      window.location.reload();
    }
    catch(err){
      console.log(err);
    }

  }


  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
        <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo">Chat Fusion</span>
        </Link>
      <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friends"
            className="searchInput"
          />
  
      </div>
        <div className="topbarLinks">
          <Link to="/updateprofile" style={{textDecoration:"none"}}>
            <span className="topbarLink">Update Profile</span>
          </Link>
          <Link to="/" style={{textDecoration:"none"}}>
            <span className="topbarLink">Homepage</span>
          </Link>
          {/* <span className="topbarLink">Timeline</span> */}
          {showdeleteaccount && <span className="topbarLink" onClick={deleteaccountfunction}>Delete Account</span>}
          {showlogout && <span className="topbarLink" onClick={logoutfunction}>Log Out</span>}
       
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
