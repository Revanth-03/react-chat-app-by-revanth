import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";

import { db } from "../../firebase";

const SearchBar = () => {
  const [username, setUserName] = useState("");
  const [userList, setUserList] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // Search for users whose display name matches the given username prefix
  const handleSearch = async () => {
    const users = collection(db, "users");
    const q = query(
      users,
      where("displayName", ">=", username),
      where("displayName", "<=", username + "\uf8ff")
    ); // Search for names starting with or before the given prefix, by using the special Unicode character "\uf8ff" which acts as a wildcard that matches any character after the prefix. This allows the query to retrieve all possible matches for the given prefix, even if there are additional characters after it.
    try {
      const querySnapshot = await getDocs(q);
      const userList = querySnapshot.docs.map((doc) => doc.data());
      setUserList(userList);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle the click event when a user is selected
  const handleClick = async (user) => {
    console.log("click");
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combineId));

      // Check if a chat with the selected user already exists
      // If the chat does not exist, create it and add it to the user's chat list
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combineId), { message: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
    // Dispatch an action to change the current chat user in the ChatContext
    dispatch({ type: "CHANGE_USER", payload: user });

    // Reset the search bar and the user list
    setUserName("");
    setUserList([]);
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Serach a new chat"
        onChange={(e) => {
          setUserName(e.target.value);
          if (e.target.value.length > 2) {
            handleSearch();
          }
        }}
        value={username}
      />
      {/* Display the user list if there are search results */}
      {userList.length > 0 && username.length > 2 && (
        <ul className="chat-list">
          <h2>CHATS</h2>

          {userList.map((user) => (
            <li key={user.uid} onClick={() => handleClick(user)}>
              {/* {console.log("user", user)} */}

              <div className="user-info">
                <div>
                  <img
                    src={
                      user.photoURL ||
                      "https://cdn-icons-png.flaticon.com/128/4140/4140048.png" //if the user don't have photo
                    }
                    alt="user-photo"
                  />
                </div>
                <div className="user-details">
                  <span className="name">{user.displayName}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
