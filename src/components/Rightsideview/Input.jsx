import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { v4 as uuid } from "uuid";
import { db } from "../../firebase";
import sendImg from "../../assets/send.png";

const Input = () => {
  const [text, setText] = useState("");
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleSend = async () => {
    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        message: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    } catch (err) {
      toast.error("Select the user to chat", { autoClose: 5000 });
    }
    setText("");
  };

  return (
    <div className="input">
      <img
        src="https://cdn-icons-png.flaticon.com/128/569/569501.png"
        alt="emoji-picker"
      />

      <input
        type="text"
        placeholder="Send a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div onClick={handleSend}>
        <img src={sendImg} alt="send-message" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Input;
