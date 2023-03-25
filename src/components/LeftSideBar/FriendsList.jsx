import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { db } from "../../firebase";
import "../../styles/home.scss";

const FriendsList = ({ message }) => {
  const [chats, setChats] = useState([]);
  // const messageTime = message.date
  //   ? message.date
  //       .toDate()
  //       .toLocaleString("en-US", { hour: "numeric", minute: "numeric" })
  //   : "";

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (data) => {
    dispatch({ type: "CHANGE_USER", payload: data });
  };
  // console.log("frinend", Object.entries(chats));

  return (
    <div className="searchbar">
      <ul>
        <h2>Friends</h2>

        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((user) => (
            <li key={user[0]} onClick={() => handleSelect(user[1].userInfo)}>
              {/* {console.log("user", user)} */}

              <div className="user-info">
                <div>
                  <img
                    src={
                      user[1].userInfo.photoURL ||
                      "https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
                    }
                    alt="user-photo"
                  />
                </div>
                <div className="user-details">
                  <span className="name">{user[1].userInfo.displayName}</span>
                  <span className="last-message">
                    {user[1].lastMessage?.text}
                  </span>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FriendsList;
