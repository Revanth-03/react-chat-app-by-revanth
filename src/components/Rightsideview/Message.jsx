import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";

const Message = ({ message }) => {
  // Retrieving current user from AuthContext and chat data from ChatContext
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // Converting message date to readable forma
  const messageTime = message.date
    ? message.date
        .toDate()
        .toLocaleString("en-US", { hour: "numeric", minute: "numeric" })
    : "";

  // Creating reference for the message component and checking if it's currently focused
  const ref = useRef();

  // Automatically scrolling to the bottom of the message list when a new message is received
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="message-by">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL ||
                "https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
              : data.user.photoURL ||
                "https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
          }
          alt=""
        />
      </div>
      <div className="message-info">
        <span>{message.text}</span>
        <span>{messageTime}</span>
      </div>
      <div ref={ref}></div>
    </div>
  );
};

export default Message;
