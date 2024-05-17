import React, { useContext } from "react";
import Cam from "../img/camera.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  console.log(data);

  return (
    <div className="Chat">
      <div className="ChatInfo">
        <span>{data.user?.displayName || "Unknown User"}</span>
        <div className="ChatIcons">
          <img src={Cam} alt=""  />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
