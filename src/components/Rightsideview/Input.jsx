import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import EmojiPicker from "react-emoji-picker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { v4 as uuid } from "uuid";
import { db } from "../../firebase";
import sendImg from "../../assets/send.png";

const Input = () => {
  // Declare necessary state variables and access contexts
  const [text, setText] = useState("");
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Toggle emoji picker visibility
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

  // Handle emoji selection
  const handleSelect = (emoji) => {
    setShowEmojiPicker(false);
    setText((prevText) => prevText + emoji);
  };

  // Handle sending a message
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

      // Update current user's chat document with last message and date
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      // Update other user's chat document with last message and date
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    } catch (err) {
      // Notify user to select a chat if no chat is active
      toast.error("Select the user to chat", { autoClose: 5000 });
    }
    setText("");
  };

  return (
    <div className="input">
      {/* Render emoji picker button */}
      <img
        src="https://cdn-icons-png.flaticon.com/128/569/569501.png"
        alt="emoji-picker"
        onClick={toggleEmojiPicker}
      />

      {/* Render message input field */}
      <input
        type="text"
        placeholder="Send a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      {/* Render send message button */}
      <div
        onClick={() => {
          text.length > 0 && handleSend();
        }}
      >
        <img src={sendImg} alt="send-message" />
      </div>

      {/* Render emoji picker component */}
      {showEmojiPicker && (
        <EmojiPicker
          onSelect={handleSelect}
          style={{
            position: "absolute",
            bottom: "8vh",
            right: "81vh",
            background: "white",
            width: "26vw",
          }}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Input;
