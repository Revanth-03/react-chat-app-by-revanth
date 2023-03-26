import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { db } from "../../firebase";
import Message from "./Message";

const Conversation = () => {
  // Initializing state for messages and retrieving data from ChatContext
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  // Fetching messages from Firebase Firestore and updating state on change
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().message);
    });

    // Unsubscribing from the listener to avoid data leakage
    return () => {
      unSub();
    };
  }, [data.chatId]);

  // Rendering each message as a Message component
  return (
    <div className="conversation">
      {messages.map((mess) => (
        <Message message={mess} key={mess.id} />
      ))}
    </div>
  );
};

// Exporting Conversation component
export default Conversation;
