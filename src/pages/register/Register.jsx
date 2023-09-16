import "./register.css";
import axios from "axios";
import { useRef } from "react";
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const redirectingfunc = ()=>{
    navigate("/login");
  }
 

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        console.log("hii");
        const res = await axios.post("https://socialmediaappbackend-uir0.onrender.com/api/auth/register", user );
        console.log(res);
        redirectingfunc();
      } catch (err) {
        console.log(err);
      }
    }
  };



  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" className="loginInput" required ref={username} />
            <input placeholder="Email" className="loginInput" required ref={email} type="email"/>
            <input placeholder="Password" className="loginInput" required ref={password} type="password" minLength="6"/>
            <input placeholder="Password Again" className="loginInput" required ref={passwordAgain} type="password"/>
            <button className="loginButton" type="submit">Sign Up</button>
            
              <button className="loginRegisterButton" onClick={redirectingfunc}>
                Log into Account
              </button>
            
            
          </form>
        </div>
      </div>
    </div>
  );
}
