import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState({});
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

 

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log("Hii")
    console.log(userInfo)
    
    setUser(userInfo);
    console.log(user)

   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

// export default ChatProvider;