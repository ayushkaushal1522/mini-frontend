import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import {useEffect , useState , useContext} from "react"
import { Link , useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
export default function Rightbar({ users }) {
  
  const [friends, setFriends] = useState([]);
  const [allusers, setAllusers] = useState([]);
  const { user: currentuser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("https://blue-pilot-frcad.pwskills.app:8080/api/users/friends/" + users._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    setFollowed( currentuser.followings.includes(users?._id));
  }, [users]);

  useEffect(() => {
    const getallusers = async () => {
      try {
        const userslist = await axios.get("https://blue-pilot-frcad.pwskills.app:8080/api/users/allusers");
        console.log("Bhakk bsdk");
        console.log(userslist);
        setAllusers(userslist.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    getallusers();
  }, []);

  

  const handleclick = async () => {
    try {
      if (followed) {
        await axios.put(`https://blue-pilot-frcad.pwskills.app:8080/api/users/${users._id}/unfollow`, {
          usersId: currentuser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: users._id });
      } else {
        await axios.put(`https://blue-pilot-frcad.pwskills.app:8080/api/users/${users._id}/follow`, {
          usersId: currentuser._id,
        });
        dispatch({ type: "FOLLOW", payload: users._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const updateprofile = async() =>{
      navigate("/updateprofile");
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
        <div className="rightbarFollowings">
        
          {console.log("sun bhaii")}
          {console.log(allusers)}
        
        
        {allusers.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/contact.jpg"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
          
          
          
        </div>
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
         {users.username !== currentuser.username && (
          <button className="rightbarFollowButton" onClick={handleclick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        

        )}
        {console.log(users)}
        {console.log(currentuser)}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{users.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{users.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{users.relationship===1 ?"single" : users.relationship===2 ? "Married" : "Do not Want's To Share"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        
        <div className="rightbarFollowings">
        {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/contact.jpg"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
          
          
          
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {users ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
