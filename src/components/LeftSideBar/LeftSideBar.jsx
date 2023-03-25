import React from "react";
import FriendsList from "./FriendsList";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const LeftSideBar = () => {
  return (
    <div className="left-side-bar">
      <Navbar />
      <SearchBar />
      <FriendsList />
    </div>
  );
};

export default LeftSideBar;
