import React, { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import Conversation from "./Conversation";
import Input from "./Input";

const RighSideView = () => {
  const { data } = useContext(ChatContext);
  // console.log("data", data);
  return (
    <div className="right-side-view">
      <div className="chat-header">
        {data.user && data.user.photoURL && (
          <img
            src={
              data.user.photoURL ||
              "https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
            }
            alt="friend-pic"
          />
        )}

        <span>{data.user?.displayName}</span>
      </div>
      <Conversation />
      <Input />
    </div>
  );
};

export default RighSideView;
