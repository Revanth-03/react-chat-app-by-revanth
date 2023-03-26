import React from "react";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import RightSideView from "../components/Rightsideview/RightSideView";
// import "../styles/home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <LeftSideBar />
        <RightSideView />
      </div>
    </div>
  );
};

export default Home;
