import "./updateprofile.css";
import { useRef , useContext ,useState} from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import axios from "axios"
import {PermMedia, Label,Room, EmojiEmotions , Cancel} from "@material-ui/icons"


export default function UpdateProfile() {
    const { user  } = useContext(AuthContext);
    
    const profilepicture = useRef();
    const coverpicture = useRef();
    const desc = useRef();
    const city = useRef();
    const from = useRef();
    const relation = useRef();
    const navigate = useNavigate();
    const [fileone,setFileone] = useState(null);
    const [filetwo,setFiletwo] = useState(null);

    
    const clickhandler = async(e)=>{
        e.preventDefault();
        // console.log(user);
        const newinfo = {
            userId: user._id,
            desc:desc.current.value,
            city:city.current.value,
            from:from.current.value,
            relationship:relation.current.value
          };
          if (fileone) {
            const data = new FormData();
            const fileName = Date.now() + fileone.name;
            data.append("name", fileName);
            data.append("file", fileone);
            newinfo.profilePicture = fileName;
            console.log(newinfo);
            try {
                await axios.post("https://blue-pilot-frcad.pwskills.app:8080/api/upload", data);
              } catch (err) {console.log(err)}
          }
          if (filetwo) {
            const data = new FormData();
            const fileName = Date.now() + filetwo.name;
            data.append("name", fileName);
            data.append("file", filetwo);
            newinfo.coverPicture = fileName;
            console.log(newinfo);
            try {
                await axios.post("https://blue-pilot-frcad.pwskills.app:8080/api/upload", data);
              } catch (err) {console.log(err)}
    
          }


          try {
            await axios.put("https://blue-pilot-frcad.pwskills.app:8080/api/users/" + user._id, newinfo);
            // window.location.reload();
          } catch (err) {console.log(err)}

        
        navigate("/profile/"+user.username);
    }

    return(
        <>
        
        <form className="loginBox" onSubmit={clickhandler}>
            <h2>Update Your Profile</h2>
            <label htmlFor="fileone" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Profile Picture</span>
            <input
                        placeholder="Profile Picture" className="inputbox"
                        style={{ display: "none" }}
                        ref={profilepicture}
                        type="file"
                        id="fileone"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => setFileone(e.target.files[0])}
                    />
            </label>
            {fileone && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(fileone)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFileone(null)} />
          </div>
        )}
            <label htmlFor="filetwo" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Cover Picture</span>
            <input
                        className="inputbox"
                        style={{ display: "none" }}
                        ref={coverpicture}
                        type="file"
                        id="filetwo"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => setFiletwo(e.target.files[0])}
                    />
            </label>
            {filetwo && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(filetwo)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFiletwo(null)} />
          </div>
        )}
            <div className="info">Description</div>
            <input placeholder="Your Short Description" className="inputbox" type="string" ref={desc} />
            <div className="info">City</div>
            <input placeholder="City" className="inputbox" type="string"ref={city} />
            <div className="info">From</div>
            <input placeholder="From" className="inputbox" type="string" ref={from} />
            <div className="info">Relationship Status</div>
            <input placeholder="RelationShip Status" className="inputbox" type="string" ref={relation} />
            <button className="submitbutton">
              Update
            </button>
        </form>
        </>
    )

}