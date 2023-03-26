import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { db } from "../../firebase";
// import "../../styles/home.scss";

const FriendsList = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);

  // get dispatch function from ChatContext
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      // return cleanup function to avoid the data leakage
      return () => {
        unsub();
      };
    };

    // call getChats function only if currentUser.uid exists
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  // handle selecting a user from the friends list
  const handleSelect = (data) => {
    dispatch({ type: "CHANGE_USER", payload: data });
  };
  // console.log("chat", Object.entries(chats));

  return (
    <div className="searchbar">
      <ul>
        <h2>Friends</h2>
        {/* Object.entries() is a built-in JavaScript method that returns an array of a given object's own enumerable property [key, value] pairs.  
        For example:
        const obj = { a: 1, b: 2, c: 3 };
        console.log(Object.entries(obj)); // output: [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]*/}
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date) // Sort by date in descending order
          //map over chats object and sort by date, then display each user in a list item
          .map((user) => (
            <li key={user[0]} onClick={() => handleSelect(user[1].userInfo)}>
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
                    {/* display last message from user, if it exists */}
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
