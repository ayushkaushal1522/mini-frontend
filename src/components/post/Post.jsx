import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";
import axios from "axios"
import {format} from "timeago.js";
import {Link} from "react-router-dom"
import {useContext} from "react"
import { AuthContext } from "../../context/AuthContext";
export default function Post({ post , showdelete}) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user,setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:currentuser} = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(() => {
    setIsLiked(post.likes.includes(currentuser._id));
  }, [currentuser._id, post.likes]);

  const likeHandler =()=>{
    try {
      axios.put("https://blue-pilot-frcad.pwskills.app:8080/api/posts/" + post._id + "/like", { userId: currentuser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }
  const deletehandler = async () =>{
    try{
      console.log(currentuser._id);
      await axios.put("https://blue-pilot-frcad.pwskills.app:8080/api/posts/" + post._id +"/delete", { userspost: currentuser._id });
      navigate("/");
      
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchUser = async()=>{
      // console.log("Hello bkl");
      const res = await axios.get(`https://blue-pilot-frcad.pwskills.app:8080/api/users?userId=${post.userId}`);
      setUser(res.data);
      // console.log(res.data);
    }
    fetchUser();
    
    
  },[post.userId])
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
            <img
              className="postProfileImg"
              src={user.profilePicture ? PF + user.profilePicture : PF+"person/contact.jpg"}
              alt=""
            />
            </Link>
            
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {/* here i have to use post.img */}
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}/like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}/heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          
            {/* <span className="postCommentText">{post.comment} comments</span> */}
            {/* <span className="postCommentText" >Update</span> */}
            {showdelete && <span className="postCommentText" onClick={deletehandler}>Delete</span>}
          
        </div>
      </div>
    </div>
  );
}
