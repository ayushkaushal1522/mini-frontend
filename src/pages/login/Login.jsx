import "./login.css";
import { useRef , useContext} from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import {useNavigate} from "react-router-dom"



export default function Login() {
const email = useRef();
const password = useRef();
const { user , isFetching, error ,dispatch } = useContext(AuthContext);
const handleclick = (e)=>{
  e.preventDefault();
  loginCall(
    { email: email.current.value, password: password.current.value},
    dispatch
  );

};
console.log(user);

const navigate = useNavigate();

  const redirectingfunc = ()=>{
    navigate("/register");
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Chat Fusion</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on ChatFusion.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleclick}>
            <input placeholder="Email" className="loginInput" type="email" required ref={email}/>
            <input placeholder="Password" className="loginInput" type="password" required ref={password} minLength="6"/>
            <button className="loginButton" disabled={isFetching}>
              {
                isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Log In"
                )
              }
              </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" onClick={redirectingfunc}>
            {
              isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Create a New Account"
                )
            }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
