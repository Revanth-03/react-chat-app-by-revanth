import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { auth } from "../../firebase";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  // console.log("currentUser", currentUser);
  return (
    <div className="navbar">
      <div className="user-info">
        <img
          src={
            currentUser.photoURL ||
            "https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
          }
          alt="user-photo"
        />
        <p>{currentUser.displayName}</p>
      </div>

      <button onClick={() => signOut(auth)}>Log out</button>
    </div>
  );
};

export default Navbar;
