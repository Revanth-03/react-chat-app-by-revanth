import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { db } from "../../firebase";
import Message from "./Message";

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().message);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  // console.log("messages", messages);

  return (
    <div className="conversation">
      {messages.map((mess) => (
        <Message message={mess} key={mess.id} />
      ))}
    </div>
  );
};

export default Conversation;
