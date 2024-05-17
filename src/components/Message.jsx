import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    // console.log('currentUser:', currentUser);
    console.log('message:', message);
    // console.log('chat data:', data);
  }, [currentUser, message, data]);

  // Ensure that currentUser and data are available
  if (!currentUser || !data) {
    return null;
  }

  // Check if the message was sent by the current user
  const isSender = message.senderId === currentUser.uid;

  return (
    <div
      ref={ref}
      className={`message ${isSender ? "Sender" : ""}`}
    >
      <div className="messageInfo">
        <img
          src={isSender ? currentUser.photoURL : data.user.photoURL}
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
