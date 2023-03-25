import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const messageTime = message.date
    ? message.date
        .toDate()
        .toLocaleString("en-US", { hour: "numeric", minute: "numeric" })
    : "";

  const ref = useRef();
  console.log(ref.current === document.activeElement);
  // console.log(message);
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
    </div>
  );
};

export default Message;
