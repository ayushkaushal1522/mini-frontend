import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

import { useEffect , useState } from "react";
import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";



export default function Feed({username ,showdelete}) {
  const [posts,setPosts] = useState([]);
  const {user} = useContext(AuthContext)
  
  useEffect(() => {
    const fetchPosts = async()=>{
      const res = username
      ?await axios.get("https://blue-pilot-frcad.pwskills.app:8080/api/posts/profile/" + username) 
      :await axios.get("https://blue-pilot-frcad.pwskills.app:8080/api/posts/timeline/"+ user._id)
      console.log("Hii" + username);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    }
    fetchPosts();
    console.log(posts);
    
    
  },[username,user._id])
  
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} showdelete={showdelete}/>
        ))}
      </div>
    </div>
  );
}
