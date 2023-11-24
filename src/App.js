import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import UpdateProfile from "./pages/updateprofile/UpdateProfile"
import { AuthContext } from "./context/AuthContext";
import ChatPage from "./pages/chatpage/Chat";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from "react";

function App() {
  const {user} = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
          
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/updateprofile" element={<UpdateProfile />}/>
          <Route path="/" element={user ? <Home /> : <Register />}>
          {/* <Route path="/chatpage" element={<ChatPage/>} /> */}
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
    
  
}

export default App;

 